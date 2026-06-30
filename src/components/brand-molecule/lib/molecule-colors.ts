// src/components/brand-molecule/lib/molecule-colors.ts
// Allowlist of FCU design-system colour tokens usable in the molecule.
// Keep in sync with the Studio dropdown in schemaTypes/brandMolecule.ts.
export const COLOR_TOKENS = [
  'fcu-primary-400', 'fcu-primary-600', 'fcu-primary-700', 'fcu-primary-800', 'fcu-primary-900',
  'fcu-secondary-400', 'fcu-secondary-500', 'fcu-secondary-600',
  'fcu-mint-400', 'fcu-mint-500', 'fcu-mint-600',
  'fcu-green-faded-500',
  'status-warning-500', 'status-warning-700',
  'neutral-700',
  // Brand Molecule artifact colours (printed brand-standards diagram)
  'molecule-hh-band', 'molecule-hh-vision', 'molecule-hh-values', 'molecule-hh-belief',
  'molecule-wt-band', 'molecule-wt-behave', 'molecule-wt-talk', 'molecule-wt-look',
  'molecule-pp-band', 'molecule-pp-proof', 'molecule-pp-products', 'molecule-pp-position',
] as const

export type ColorTokenName = (typeof COLOR_TOKENS)[number]

const ALLOWED = new Set<string>(COLOR_TOKENS)

export function resolveColorToken(token: string | null | undefined): string {
  if (token && ALLOWED.has(token)) return `var(--color-${token})`
  return 'var(--color-foreground-muted)'
}
