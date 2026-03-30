/**
 * Maps Sanity footer headline size presets to responsive Tailwind font-size classes.
 * Keep values as literal strings so Tailwind can detect them at build time.
 */
export const FOOTER_HEADLINE_FONT_SIZE_PRESETS = {
  'scale-xs': 'text-xs sm:text-sm md:text-base lg:text-lg',
  'scale-sm': 'text-sm sm:text-base md:text-lg lg:text-xl',
  'scale-md': 'text-base sm:text-lg md:text-xl lg:text-2xl',
  'scale-lg': 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  'scale-xl': 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  'scale-2xl': 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  default: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  'scale-4xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  'scale-5xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
  'scale-6xl': 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
} as const

export type FooterHeadlineFontSizePreset =
  keyof typeof FOOTER_HEADLINE_FONT_SIZE_PRESETS

export function getFooterHeadlineFontSizeClasses(
  preset: string | null | undefined,
): string {
  if (preset != null && preset in FOOTER_HEADLINE_FONT_SIZE_PRESETS) {
    return FOOTER_HEADLINE_FONT_SIZE_PRESETS[
      preset as FooterHeadlineFontSizePreset
    ]
  }
  return FOOTER_HEADLINE_FONT_SIZE_PRESETS.default
}
