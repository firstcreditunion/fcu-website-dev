/**
 * Maps Sanity footer headline size presets to responsive Tailwind font-size classes.
 * Keep values as literal strings so Tailwind can detect them at build time.
 */
export const FOOTER_HEADLINE_FONT_SIZE_PRESETS = {
  default: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  'scale-2xl': 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  'scale-4xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  'scale-5xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
  'scale-6xl': 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
} as const

export type FooterHeadlineFontSizePreset =
  keyof typeof FOOTER_HEADLINE_FONT_SIZE_PRESETS

export function getFooterHeadlineFontSizeClasses(
  preset: string | null | undefined,
): string {
  if (
    preset != null &&
    preset in FOOTER_HEADLINE_FONT_SIZE_PRESETS
  ) {
    return FOOTER_HEADLINE_FONT_SIZE_PRESETS[
      preset as FooterHeadlineFontSizePreset
    ]
  }
  return FOOTER_HEADLINE_FONT_SIZE_PRESETS.default
}
