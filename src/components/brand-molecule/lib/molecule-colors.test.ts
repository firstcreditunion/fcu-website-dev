// src/components/brand-molecule/lib/molecule-colors.test.ts
import { describe, it, expect } from 'vitest'
import { COLOR_TOKENS, resolveColorToken } from './molecule-colors'

describe('resolveColorToken', () => {
  it('maps a known token to its CSS var', () => {
    expect(resolveColorToken('fcu-secondary-500')).toBe('var(--color-fcu-secondary-500)')
  })
  it('falls back to foreground-muted for an unknown token', () => {
    expect(resolveColorToken('not-a-token')).toBe('var(--color-foreground-muted)')
  })
  it('exposes a non-empty allowlist of tokens for the Studio dropdown', () => {
    expect(COLOR_TOKENS.length).toBeGreaterThan(8)
    expect(COLOR_TOKENS).toContain('fcu-primary-700')
  })
})
