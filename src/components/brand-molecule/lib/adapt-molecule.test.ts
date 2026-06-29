// src/components/brand-molecule/lib/adapt-molecule.test.ts
import { describe, it, expect } from 'vitest'
import { adaptMolecule } from './adapt-molecule'

const raw = {
  title: 'T', intro: 'I', defaultVariant: 'expand', centerKicker: 'CORE', centerLabel: 'You first',
  groups: [{ key: 'hh', label: 'Head & Hearts', colorToken: 'fcu-primary-700' }],
  segments: [{ key: 'vision', label: 'Our Vision', groupKey: 'hh', annotationTitle: 'Our Vision', attributes: 'x', detail: null, colorToken: 'fcu-secondary-500', icon: null }],
}

describe('adaptMolecule', () => {
  it('resolves colour tokens to CSS vars', () => {
    const m = adaptMolecule(raw as never)
    expect(m).not.toBeNull()
    expect(m!.groups[0].colorVar).toBe('var(--color-fcu-primary-700)')
    expect(m!.segments[0].colorVar).toBe('var(--color-fcu-secondary-500)')
  })
  it('passes the default variant through, falling back to focus', () => {
    expect(adaptMolecule(raw as never)!.defaultVariant).toBe('expand')
    expect(adaptMolecule({ ...raw, defaultVariant: 'bogus' } as never)!.defaultVariant).toBe('focus')
  })
  it('returns null when given null', () => {
    expect(adaptMolecule(null)).toBeNull()
  })
})
