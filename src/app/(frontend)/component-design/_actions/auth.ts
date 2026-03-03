'use server'

import { createHash } from 'node:crypto'
import { writeClient } from '@/sanity/lib/writeClient'

function hashPin(pin: string): string {
  return createHash('sha256').update(pin).digest('hex')
}

function emailToDocId(email: string): string {
  return `designSystemUser-${email.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
}

export async function loginUser(
  email: string,
  pin: string,
): Promise<{ success: boolean; message: string; displayName?: string }> {
  if (!email || !pin) {
    return { success: false, message: 'Email and PIN are required' }
  }

  try {
    const user = await writeClient.fetch(
      `*[_type == "designSystemUser" && email == $email][0]{ hashedPin, displayName }`,
      { email: email.toLowerCase() },
    )

    if (!user) {
      return { success: false, message: 'No account found for this email' }
    }

    if (user.hashedPin !== hashPin(pin)) {
      return { success: false, message: 'Incorrect PIN' }
    }

    await writeClient
      .patch(emailToDocId(email))
      .set({ lastLoginAt: new Date().toISOString() })
      .commit()

    return {
      success: true,
      message: 'Signed in',
      displayName: user.displayName,
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, message: `Login failed: ${msg}` }
  }
}

export async function registerUser(
  email: string,
  pin: string,
  displayName: string,
): Promise<{ success: boolean; message: string }> {
  if (!email || !pin) {
    return { success: false, message: 'Email and PIN are required' }
  }

  if (pin.length < 4) {
    return { success: false, message: 'PIN must be at least 4 characters' }
  }

  try {
    const existing = await writeClient.fetch(
      `*[_type == "designSystemUser" && email == $email][0]{ _id }`,
      { email: email.toLowerCase() },
    )

    if (existing) {
      return {
        success: false,
        message: 'An account with this email already exists',
      }
    }

    await writeClient.createOrReplace({
      _type: 'designSystemUser',
      _id: emailToDocId(email),
      email: email.toLowerCase(),
      hashedPin: hashPin(pin),
      displayName: displayName || email.split('@')[0],
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    })

    return { success: true, message: 'Account created' }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, message: `Registration failed: ${msg}` }
  }
}

export async function validateUser(
  email: string,
  pin: string,
): Promise<boolean> {
  if (!email || !pin) return false

  try {
    const user = await writeClient.fetch(
      `*[_type == "designSystemUser" && email == $email][0]{ hashedPin }`,
      { email: email.toLowerCase() },
    )

    return !!user && user.hashedPin === hashPin(pin)
  } catch {
    return false
  }
}
