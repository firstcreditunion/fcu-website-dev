// src/components/brand-molecule/lib/molecule-geometry.ts
import { arc as d3arc } from 'd3-shape'
import type { Span, SegmentGeometry, BandGeometry, MoleculeSegment, MoleculeGroup } from './types'

const TAU = Math.PI / 180

/** Point on a circle; angle in degrees measured clockwise from 12 o'clock. */
export function pointOnCircle(cx: number, cy: number, r: number, angleDeg: number) {
  const a = angleDeg * TAU
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) }
}

/** N equal angular spans, with `startDeg` as the first span's a0. */
export function segmentSpans(count: number, _gapDeg: number, startDeg: number): Span[] {
  const step = 360 / count
  return Array.from({ length: count }, (_, i) => {
    const a0 = startDeg + i * step
    const a1 = a0 + step
    return { a0, a1, center: a0 + step / 2 }
  })
}

export function annotationAnchor(centerDeg: number): 'start' | 'middle' | 'end' {
  const s = Math.sin(centerDeg * TAU)
  if (s > 0.22) return 'start'
  if (s < -0.22) return 'end'
  return 'middle'
}

/** Annular-sector path centered at (0,0); the consumer translates the group to the wheel center. */
export function arcPath(opts: {
  innerRadius: number
  outerRadius: number
  startDeg: number
  endDeg: number
  padDeg: number
  cornerRadius: number
}): string {
  const generator = d3arc()
    .innerRadius(opts.innerRadius)
    .outerRadius(opts.outerRadius)
    .cornerRadius(opts.cornerRadius)
  // d3 angles: 0 at 12 o'clock, clockwise positive, radians — matches our convention.
  return generator({
    startAngle: (opts.startDeg + opts.padDeg) * TAU,
    endAngle: (opts.endDeg - opts.padDeg) * TAU,
    innerRadius: opts.innerRadius,
    outerRadius: opts.outerRadius,
  } as never) ?? ''
}

/** Invisible arc for a curved textPath; reversed direction when `flip` so text isn't upside-down. */
export function labelArcPath(
  cx: number,
  cy: number,
  r: number,
  a0Deg: number,
  a1Deg: number,
  flip: boolean,
  insetDeg: number,
): string {
  const a0 = a0Deg + insetDeg
  const a1 = a1Deg - insetDeg
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  const round = (n: number) => Math.round(n * 100) / 100
  if (flip) {
    const p0 = pointOnCircle(cx, cy, r, a1)
    const p1 = pointOnCircle(cx, cy, r, a0)
    return `M${round(p0.x)} ${round(p0.y)}A${r} ${r} 0 ${large} 0 ${round(p1.x)} ${round(p1.y)}`
  }
  const q0 = pointOnCircle(cx, cy, r, a0)
  const q1 = pointOnCircle(cx, cy, r, a1)
  return `M${round(q0.x)} ${round(q0.y)}A${r} ${r} 0 ${large} 1 ${round(q1.x)} ${round(q1.y)}`
}

/** True when a segment's curved label would render upside-down (bottom half). */
export function shouldFlip(centerDeg: number): boolean {
  const c = ((centerDeg % 360) + 360) % 360
  return c > 90 && c < 270
}

export interface WheelDims {
  cx: number
  cy: number
  hubR: number
  bandR0: number
  bandR1: number
  segR0: number
  segR1: number
  bandLabelR: number
  segLabelR: number
  leadIn: number
  leadOut: number
  textR: number
  startDeg: number
}

export const DEFAULT_DIMS: WheelDims = {
  cx: 590, cy: 350, hubR: 66,
  bandR0: 72, bandR1: 130, segR0: 134, segR1: 212,
  bandLabelR: 100, segLabelR: 174, leadIn: 214, leadOut: 236, textR: 246,
  startDeg: -20,
}

/** Geometry for each outer segment, in segment order. */
export function buildSegmentGeometry(segments: MoleculeSegment[], dims: WheelDims = DEFAULT_DIMS): SegmentGeometry[] {
  const spans = segmentSpans(segments.length, 0, dims.startDeg)
  return segments.map((seg, i) => {
    const { a0, a1, center } = spans[i]
    const flip = shouldFlip(center)
    const li = pointOnCircle(dims.cx, dims.cy, dims.leadIn, center)
    const lo = pointOnCircle(dims.cx, dims.cy, dims.leadOut, center)
    const tp = pointOnCircle(dims.cx, dims.cy, dims.textR, center)
    const anchor = annotationAnchor(center)
    const dx = anchor === 'start' ? 6 : anchor === 'end' ? -6 : 0
    return {
      key: seg.key,
      path: arcPath({ innerRadius: dims.segR0, outerRadius: dims.segR1, startDeg: a0, endDeg: a1, padDeg: 1.4, cornerRadius: 3 }),
      labelPath: labelArcPath(dims.cx, dims.cy, dims.segLabelR, a0, a1, flip, 4),
      centerAngle: center,
      leader: { x1: li.x, y1: li.y, x2: lo.x, y2: lo.y },
      annotation: { x: tp.x + dx, y: tp.y, anchor },
    }
  })
}

/** Group bands derived by grouping consecutive segments sharing a groupKey. */
export function buildBandGeometry(
  segments: MoleculeSegment[],
  groups: MoleculeGroup[],
  dims: WheelDims = DEFAULT_DIMS,
): BandGeometry[] {
  const spans = segmentSpans(segments.length, 0, dims.startDeg)
  return groups.map((g) => {
    const idxs = segments.map((s, i) => (s.groupKey === g.key ? i : -1)).filter((i) => i >= 0)
    const a0 = spans[idxs[0]].a0
    const a1 = spans[idxs[idxs.length - 1]].a1
    const center = (a0 + a1) / 2
    return {
      groupKey: g.key,
      path: arcPath({ innerRadius: dims.bandR0, outerRadius: dims.bandR1, startDeg: a0, endDeg: a1, padDeg: 0.8, cornerRadius: 3 }),
      labelPath: labelArcPath(dims.cx, dims.cy, dims.bandLabelR, a0, a1, shouldFlip(center), 8),
    }
  })
}
