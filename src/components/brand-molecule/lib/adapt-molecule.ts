// src/components/brand-molecule/lib/adapt-molecule.ts
import { resolveColorToken } from './molecule-colors'
import type { MoleculeData, MoleculeVariant } from './types'

const VARIANTS: MoleculeVariant[] = ['focus', 'expand', 'tour']

type RawMolecule = {
  title?: string | null
  intro?: string | null
  defaultVariant?: string | null
  centerKicker?: string | null
  centerLabel?: string | null
  groups?: Array<{ key?: string | null; label?: string | null; colorToken?: string | null }> | null
  segments?: Array<{
    key?: string | null; label?: string | null; groupKey?: string | null
    annotationTitle?: string | null; attributes?: string | null
    detail?: unknown; colorToken?: string | null; icon?: string | null
  }> | null
} | null

export function adaptMolecule(raw: RawMolecule): MoleculeData | null {
  if (!raw) return null
  const defaultVariant = VARIANTS.includes(raw.defaultVariant as MoleculeVariant)
    ? (raw.defaultVariant as MoleculeVariant)
    : 'focus'
  return {
    title: raw.title ?? '',
    intro: raw.intro ?? '',
    centerKicker: raw.centerKicker ?? '',
    centerLabel: raw.centerLabel ?? '',
    defaultVariant,
    groups: (raw.groups ?? []).map((g) => ({
      key: g.key ?? '',
      label: g.label ?? '',
      colorVar: resolveColorToken(g.colorToken),
    })),
    segments: (raw.segments ?? []).map((s) => ({
      key: s.key ?? '',
      label: s.label ?? '',
      groupKey: s.groupKey ?? '',
      annotationTitle: s.annotationTitle ?? '',
      attributes: s.attributes ?? '',
      detail: Array.isArray(s.detail) ? (s.detail as MoleculeData['segments'][number]['detail']) : null,
      colorVar: resolveColorToken(s.colorToken),
      icon: s.icon ?? null,
    })),
  }
}
