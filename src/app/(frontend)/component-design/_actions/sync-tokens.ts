'use server'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { parse, formatHex, formatRgb } from 'culori'
import { auth } from '@clerk/nextjs/server'
import { writeClient } from '@/sanity/lib/writeClient'

interface TokenData {
  _key: string
  name: string
  cssVariable: string
  oklch: string
  hex: string
  rgb: string
}

interface PaletteData {
  _key: string
  paletteName: string
  tokens: TokenData[]
}

function generateKey(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '_')
}

export async function syncTokens(): Promise<{
  success: boolean
  message: string
  paletteCount?: number
}> {
  const { userId } = await auth()
  if (!userId) {
    return { success: false, message: 'Authentication failed' }
  }

  try {
    const cssPath = path.join(process.cwd(), 'src', 'app', 'globals.css')
    const css = await fs.readFile(cssPath, 'utf-8')

    const themeMatch = css.match(/@theme\s*\{([\s\S]*?)\n\}/)
    if (!themeMatch) {
      return { success: false, message: 'Could not find @theme block in globals.css' }
    }

    const themeBlock = themeMatch[1]
    const colorRegex = /--color-(fcu-[\w-]+):\s*(oklch\([^)]+\));/g
    const tokens: { name: string; oklch: string }[] = []

    let match
    while ((match = colorRegex.exec(themeBlock)) !== null) {
      tokens.push({ name: match[1], oklch: match[2] })
    }

    if (tokens.length === 0) {
      return { success: false, message: 'No FCU color tokens found' }
    }

    const paletteMap = new Map<string, TokenData[]>()

    for (const token of tokens) {
      const parts = token.name.split('-')
      const shade = parts.pop()!
      const paletteName = parts.join('-')

      if (!paletteMap.has(paletteName)) {
        paletteMap.set(paletteName, [])
      }

      const parsed = parse(token.oklch)
      const hex = parsed ? formatHex(parsed) : '#000000'
      const rgb = parsed ? formatRgb(parsed) : 'rgb(0, 0, 0)'

      paletteMap.get(paletteName)!.push({
        _key: generateKey(token.name),
        name: token.name,
        cssVariable: `--color-${token.name}`,
        oklch: token.oklch,
        hex,
        rgb,
      })
    }

    const palettes: PaletteData[] = Array.from(paletteMap.entries()).map(
      ([name, paletteTokens]) => ({
        _key: generateKey(name),
        paletteName: name,
        tokens: paletteTokens,
      }),
    )

    await writeClient.createOrReplace({
      _type: 'designTokens',
      _id: 'designTokens',
      lastSyncedAt: new Date().toISOString(),
      palettes,
    })

    return {
      success: true,
      message: `Synced ${tokens.length} tokens across ${palettes.length} palettes`,
      paletteCount: palettes.length,
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, message: `Sync failed: ${msg}` }
  }
}
