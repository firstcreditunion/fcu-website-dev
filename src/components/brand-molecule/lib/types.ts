// src/components/brand-molecule/lib/types.ts
import type { PortableTextBlock } from '@portabletext/types'

// Retained for the (now unused) Sanity `defaultVariant` field + adaptMolecule;
// the page renders a single experience (focus + click-to-expand).
export type MoleculeVariant = 'focus' | 'expand' | 'tour'

export type EntranceDirection = 'clockwise' | 'radiate'

/**
 * Per-deployment motion toggles. Each defaults ON; every one is hard-disabled
 * under `prefers-reduced-motion`. Mirrors the design prototype's toggles.
 */
export interface MoleculeMotionProps {
  /** Idle breathing + pointer parallax of the wheel. */
  ambientLife?: boolean
  /** Hero/stage drift on scroll. */
  scrollParallax?: boolean
  /** Soft glow follows the cursor (desktop). */
  cursorLight?: boolean
  /** Order segments build in: clockwise stagger or near-simultaneous radiate. */
  entranceDirection?: EntranceDirection
  /** Radiating pulse from the central hub. */
  hubPulse?: boolean
  /** Floating background motes in the three group colours. */
  motes?: boolean
  /** Close-button hover/press micro-interaction polish. */
  microPolish?: boolean
}

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
