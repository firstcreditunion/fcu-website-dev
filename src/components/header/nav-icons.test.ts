// src/components/header/nav-icons.test.ts
import { describe, it, expect } from 'vitest'
import { Circle } from 'lucide-react'
import { NAV_ICONS, resolveNavIcon, getHref, isExternalLink } from './nav-icons'

// The 13 values offered by the `link.icon` schema field (link.ts options list)
const SCHEMA_ICON_NAMES = [
  'credit-card',
  'globe',
  'send',
  'wallet',
  'file-text',
  'home',
  'calculator',
  'percent',
  'shield',
  'help-circle',
  'phone',
  'map-pin',
  'trending-up',
] as const

describe('NAV_ICONS registry', () => {
  it('maps every schema icon name to a component', () => {
    for (const name of SCHEMA_ICON_NAMES) {
      expect(NAV_ICONS[name], `missing icon mapping: ${name}`).toBeTruthy()
    }
  })

  it('has no extra mappings beyond the schema set', () => {
    expect(Object.keys(NAV_ICONS).sort()).toEqual([...SCHEMA_ICON_NAMES].sort())
  })
})

describe('resolveNavIcon', () => {
  it('resolves a known name', () => {
    expect(resolveNavIcon('credit-card')).toBe(NAV_ICONS['credit-card'])
  })
  it('falls back to Circle for unknown names', () => {
    expect(resolveNavIcon('not-an-icon')).toBe(Circle)
  })
  it('falls back to Circle for null/undefined', () => {
    expect(resolveNavIcon(null)).toBe(Circle)
    expect(resolveNavIcon(undefined)).toBe(Circle)
  })
})

describe('getHref', () => {
  it('uses url for internal links', () => {
    expect(getHref({ linkType: 'internal', url: '/loans', externalUrl: null })).toBe('/loans')
  })
  it('uses externalUrl for external links', () => {
    expect(
      getHref({ linkType: 'external', url: null, externalUrl: 'https://example.com' }),
    ).toBe('https://example.com')
  })
  it('falls back to # when the target is missing', () => {
    expect(getHref({ linkType: 'internal', url: null, externalUrl: null })).toBe('#')
    expect(getHref({ linkType: 'external', url: null, externalUrl: null })).toBe('#')
  })
})

describe('isExternalLink', () => {
  it('true for external linkType', () => {
    expect(isExternalLink({ linkType: 'external', openInNewTab: false })).toBe(true)
  })
  it('true for openInNewTab regardless of type', () => {
    expect(isExternalLink({ linkType: 'internal', openInNewTab: true })).toBe(true)
  })
  it('false for plain internal links', () => {
    expect(isExternalLink({ linkType: 'internal', openInNewTab: false })).toBe(false)
    expect(isExternalLink({ linkType: 'internal', openInNewTab: null })).toBe(false)
  })
})
