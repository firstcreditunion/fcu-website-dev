'use server'

import { writeClient } from '@/sanity/lib/writeClient'
import { validateUser } from './auth'

export interface ComponentConfigPayload {
  componentName: string
  displayName: string
  category: string
  approvedVariants?: string[]
  disabledVariants?: string[]
  approvedSizes?: string[]
  defaultVariant?: string
  defaultSize?: string
  variantGuidelines?: {
    _key: string
    variant: string
    colorToken?: string
    usageNote?: string
  }[]
  componentSpecificConfig?: Record<string, unknown>
  previewConfig?: {
    selectedVariant?: string
    selectedSize?: string
    previewLabel?: string
    previewDisabled?: boolean
  }
}

export async function saveComponentConfig(
  email: string,
  pin: string,
  config: ComponentConfigPayload,
): Promise<{ success: boolean; message: string }> {
  const valid = await validateUser(email, pin)
  if (!valid) {
    return { success: false, message: 'Authentication failed' }
  }

  if (!config.componentName) {
    return { success: false, message: 'componentName is required' }
  }

  try {
    const documentId = `componentConfig-${config.componentName}`

    await writeClient.createOrReplace({
      _type: 'componentConfig',
      _id: documentId,
      ...config,
    })

    return {
      success: true,
      message: `Saved config for ${config.displayName}`,
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, message: `Save failed: ${msg}` }
  }
}
