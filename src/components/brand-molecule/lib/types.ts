// src/components/brand-molecule/lib/types.ts
import type { PortableTextBlock } from '@portabletext/types'

export type MoleculeVariant = 'focus' | 'expand' | 'tour'

export interface MoleculeGroup {
  key: string
  label: string
  colorVar: string // resolved CSS var, e.g. "var(--color-fcu-secondary-500)"
}

export interface MoleculeSegment {
  key: string
  label: string
  groupKey: string
  annotationTitle: string
  attributes: string
  detail: PortableTextBlock[] | null
  colorVar: string
  icon: string | null
}

export interface MoleculeData {
  title: string
  intro: string
  centerKicker: string
  centerLabel: string
  defaultVariant: MoleculeVariant
  groups: MoleculeGroup[]
  segments: MoleculeSegment[]
}

export interface Span {
  a0: number // degrees, clockwise from 12 o'clock
  a1: number
  center: number
}

export interface SegmentGeometry {
  key: string
  /** annular-sector path 'd', centered on the wheel center */
  path: string
  /** invisible arc path 'd' for the curved <textPath> label */
  labelPath: string
  centerAngle: number
  leader: { x1: number; y1: number; x2: number; y2: number }
  annotation: { x: number; y: number; anchor: 'start' | 'middle' | 'end' }
}

export interface BandGeometry {
  groupKey: string
  path: string
  labelPath: string
}
