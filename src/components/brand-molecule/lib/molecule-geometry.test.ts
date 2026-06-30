// src/components/brand-molecule/lib/molecule-geometry.test.ts
import { describe, it, expect } from 'vitest'
import {
  pointOnCircle,
  segmentSpans,
  annotationAnchor,
  arcPath,
  labelArcPath,
  buildBandGeometry,
} from './molecule-geometry'
import type { MoleculeSegment, MoleculeGroup } from './types'

function makeSegment(key: string, groupKey: string): MoleculeSegment {
  return {
    key,
    label: key,
    groupKey,
    annotationTitle: key,
    attributes: '',
    detail: null,
    colorVar: 'var(--color-foreground)',
    icon: null,
  }
}

function makeGroup(key: string): MoleculeGroup {
  return { key, label: key, colorVar: 'var(--color-foreground)' }
}

describe('pointOnCircle', () => {
  it('places angle 0 directly above the center', () => {
    const p = pointOnCircle(100, 100, 50, 0)
    expect(p.x).toBeCloseTo(100, 5)
    expect(p.y).toBeCloseTo(50, 5)
  })
  it('places angle 90 to the right of the center', () => {
    const p = pointOnCircle(100, 100, 50, 90)
    expect(p.x).toBeCloseTo(150, 5)
    expect(p.y).toBeCloseTo(100, 5)
  })
})

describe('segmentSpans', () => {
  it('returns N equal spans summing to 360 minus gaps', () => {
    const spans = segmentSpans(9, 0, -20)
    expect(spans).toHaveLength(9)
    expect(spans[0].a0).toBe(-20)
    expect(spans[0].a1).toBe(20)
    expect(spans[0].center).toBe(0)
    expect(spans[8].center).toBe(320)
  })
})

describe('annotationAnchor', () => {
  it('anchors right-side segments to start, left-side to end, poles to middle', () => {
    expect(annotationAnchor(40)).toBe('start')
    expect(annotationAnchor(320)).toBe('end')
    expect(annotationAnchor(0)).toBe('middle')
    expect(annotationAnchor(180)).toBe('middle')
  })
})

describe('arcPath', () => {
  it('returns a non-empty path string starting with M', () => {
    const d = arcPath({ innerRadius: 60, outerRadius: 100, startDeg: 0, endDeg: 40, padDeg: 1, cornerRadius: 4 })
    expect(d.startsWith('M')).toBe(true)
    expect(d.length).toBeGreaterThan(10)
  })
})

describe('labelArcPath', () => {
  it('reverses endpoints when flipped', () => {
    const normal = labelArcPath(100, 100, 80, 0, 40, false, 2)
    const flipped = labelArcPath(100, 100, 80, 0, 40, true, 2)
    expect(normal).not.toEqual(flipped)
    expect(flipped.startsWith('M')).toBe(true)
  })
})

describe('buildBandGeometry', () => {
  it('builds a band for each group whose key matches segments', () => {
    const segments = [makeSegment('a', 'g1'), makeSegment('b', 'g1'), makeSegment('c', 'g2')]
    const groups = [makeGroup('g1'), makeGroup('g2')]
    const bands = buildBandGeometry(segments, groups)
    expect(bands).toHaveLength(2)
    expect(bands.map((b) => b.groupKey)).toEqual(['g1', 'g2'])
  })

  it('omits a group with no matching segments without throwing (content typo)', () => {
    const segments = [makeSegment('a', 'g1'), makeSegment('b', 'g1')]
    // "g2" matches no segment (e.g. a typo'd groupKey on the group/segment side).
    const groups = [makeGroup('g1'), makeGroup('g2')]
    expect(() => buildBandGeometry(segments, groups)).not.toThrow()
    const bands = buildBandGeometry(segments, groups)
    expect(bands.map((b) => b.groupKey)).toEqual(['g1'])
  })
})
