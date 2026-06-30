// src/components/brand-molecule/MoleculeWheel.tsx
'use client'

import { DEFAULT_DIMS, buildSegmentGeometry, buildBandGeometry } from './lib/molecule-geometry'
import type { MoleculeData } from './lib/types'

interface Props {
  data: MoleculeData
  activeKey: string | null
  compact?: boolean
  onFocus: (key: string | null) => void
  onSelect: (key: string) => void
}

export function MoleculeWheel({ data, activeKey, compact = false, onFocus, onSelect }: Props) {
  const d = DEFAULT_DIMS
  const segGeo = buildSegmentGeometry(data.segments, d)
  const bandGeo = buildBandGeometry(data.segments, data.groups, d)
  const activeSeg = data.segments.find((s) => s.key === activeKey) ?? null
  const activeGroupKey = activeSeg?.groupKey ?? null

  return (
    <svg
      viewBox="0 0 1180 720"
      role="group"
      aria-label="First Credit Union brand molecule"
      className="h-auto w-full select-none overflow-visible"
      onMouseLeave={() => onFocus(null)}
    >
      <title>First Credit Union brand molecule</title>
      <desc>A radial diagram of the brand: a central core, three group bands, and nine segments.</desc>

      {/* leaders (hidden in compact) */}
      {!compact && segGeo.map((g) => {
        const seg = data.segments.find((s) => s.key === g.key)!
        const on = activeKey === null ? 0.6 : activeKey === g.key ? 1 : 0.15
        return (
          <line key={'l' + g.key} x1={g.leader.x1} y1={g.leader.y1} x2={g.leader.x2} y2={g.leader.y2}
            stroke={seg.colorVar} strokeWidth={1.5} style={{ opacity: on, transition: 'opacity .25s' }} />
        )
      })}

      {/* group bands */}
      {bandGeo.map((b) => {
        const group = data.groups.find((g) => g.key === b.groupKey)!
        const op = activeGroupKey === null ? 1 : activeGroupKey === b.groupKey ? 1 : 0.4
        return (
          <g key={'b' + b.groupKey} transform={`translate(${d.cx} ${d.cy})`} style={{ opacity: op, transition: 'opacity .25s' }}>
            <path d={b.path} fill={group.colorVar} />
            <text fontSize={13} fontWeight={700} letterSpacing="0.04em" fill="var(--color-neutral-0)" style={{ textTransform: 'uppercase', opacity: 0.92 }}>
              <textPath href={`#bandlabel-${b.groupKey}`} startOffset="50%" textAnchor="middle">{group.label}</textPath>
            </text>
          </g>
        )
      })}
      {/* band label paths live in untranslated space (already absolute coords) */}
      <defs>
        {bandGeo.map((b) => <path key={'bp' + b.groupKey} id={`bandlabel-${b.groupKey}`} d={b.labelPath} />)}
        {segGeo.map((g) => <path key={'sp' + g.key} id={`seglabel-${g.key}`} d={g.labelPath} />)}
      </defs>

      {/* segments */}
      {segGeo.map((g) => {
        const seg = data.segments.find((s) => s.key === g.key)!
        const isActive = activeKey === g.key
        const op = activeKey === null ? 1 : isActive ? 1 : 0.28
        const tx = Math.sin((g.centerAngle * Math.PI) / 180) * 8
        const ty = -Math.cos((g.centerAngle * Math.PI) / 180) * 8
        return (
          <g key={'s' + g.key}
            role="button" tabIndex={0} data-bm-segment
            aria-label={`${seg.annotationTitle} — ${seg.attributes}`}
            onMouseEnter={() => onFocus(g.key)}
            onFocus={() => onFocus(g.key)}
            onClick={() => onSelect(g.key)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(g.key) } }}
            style={{
              cursor: 'pointer',
              opacity: op,
              transform: isActive ? `translate(${tx}px, ${ty}px) scale(1.04)` : 'none',
              transformBox: 'fill-box', transformOrigin: 'center',
              transition: 'transform .28s cubic-bezier(.2,.7,.3,1), opacity .25s',
            }}>
            <g transform={`translate(${d.cx} ${d.cy})`}><path d={g.path} fill={seg.colorVar} /></g>
            <text fontSize={11} fontWeight={600} fill="var(--color-neutral-0)" style={{ pointerEvents: 'none' }}>
              <textPath href={`#seglabel-${g.key}`} startOffset="50%" textAnchor="middle">{seg.label}</textPath>
            </text>
          </g>
        )
      })}

      {/* hub */}
      <g>
        <circle cx={d.cx} cy={d.cy} r={d.hubR} fill="var(--color-neutral-900, #2D393B)" />
        <text x={d.cx} y={d.cy - 8} textAnchor="middle" fontSize={9} letterSpacing="1.2" fontWeight={600} fill="var(--color-neutral-400, #9fb0b5)">{data.centerKicker}</text>
        <text x={d.cx} y={d.cy + 14} textAnchor="middle" fontSize={20} fontWeight={700} fill="var(--color-neutral-0)">{data.centerLabel}</text>
      </g>

      {/* annotations (hidden in compact) */}
      {!compact && segGeo.map((g) => {
        const seg = data.segments.find((s) => s.key === g.key)!
        const isActive = activeKey === g.key
        // AA contrast via DS tokens at full opacity (not alpha): active title is
        // full foreground + bold; non-active / at-rest is an AA-safe muted token.
        return (
          <g key={'a' + g.key} transform={`translate(${g.annotation.x} ${g.annotation.y})`}
            onMouseEnter={() => onFocus(g.key)} onClick={() => onSelect(g.key)} style={{ cursor: 'pointer' }}>
            <text textAnchor={g.annotation.anchor} fontSize={13}
              style={{ fill: isActive ? 'var(--color-foreground)' : 'var(--color-foreground-muted)', fontWeight: isActive ? 700 : 600, transition: 'fill .25s' }}>
              {seg.annotationTitle}
            </text>
            <text textAnchor={g.annotation.anchor} y={15} fontSize={11}
              style={{ fill: 'var(--color-foreground-muted)', opacity: isActive ? 1 : 0, transition: 'opacity .25s' }}>
              {seg.attributes}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
