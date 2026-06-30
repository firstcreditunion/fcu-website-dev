// src/components/brand-molecule/MoleculeWheel.tsx
'use client'

import { motion, type MotionValue } from 'motion/react'
import { DEFAULT_DIMS, buildSegmentGeometry, buildBandGeometry } from './lib/molecule-geometry'
import type { EntranceDirection, MoleculeData } from './lib/types'

interface Props {
  data: MoleculeData
  activeKey: string | null
  /** Currently expanded segment — its leader/annotation also reads as active. */
  compact?: boolean
  /** Entrance build has run (stays paused until mount so SSR paint matches). */
  entered: boolean
  /** Reduced motion: no entrance build, no springy nudges, no pulse/breathing. */
  reduce: boolean
  entranceDirection?: EntranceDirection
  hubPulse?: boolean
  /** Idle breathing of the whole wheel (only when nothing is active/selected). */
  breathing?: boolean
  /** Pointer-parallax translation of the inner group (px). */
  parallaxX?: MotionValue<number>
  parallaxY?: MotionValue<number>
  onFocus: (key: string | null) => void
  onSelect: (key: string) => void
  onPointerMoveCapture?: (e: React.PointerEvent) => void
}

const ENTRANCE_EASE = [0.22, 0.61, 0.36, 1] as const

export function MoleculeWheel({
  data,
  activeKey,
  compact = false,
  entered,
  reduce,
  entranceDirection = 'clockwise',
  hubPulse = true,
  breathing = false,
  parallaxX,
  parallaxY,
  onFocus,
  onSelect,
  onPointerMoveCapture,
}: Props) {
  const d = DEFAULT_DIMS
  const segGeo = buildSegmentGeometry(data.segments, d)
  const bandGeo = buildBandGeometry(data.segments, data.groups, d)
  const activeSeg = data.segments.find((s) => s.key === activeKey) ?? null
  const activeGroupKey = activeSeg?.groupKey ?? null
  const showPulse = hubPulse && !reduce

  // Entrance helper: opacity 0→1 (.55s ease) + a transform from `fromScale`/`fromY`
  // back to rest (.7s cubic-bezier), each delayed in ms. Under reduced motion the
  // element is simply at rest (opacity 1, no transform) — identical to "today".
  const ent = (delayMs: number, fromScale: number, fromY = 0) => {
    if (reduce) {
      return { initial: false as const, animate: { opacity: 1 } }
    }
    return {
      initial: { opacity: 0, scale: fromScale, y: fromY },
      animate: entered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: fromScale, y: fromY },
      transition: {
        opacity: { duration: 0.55, ease: 'easeOut' as const, delay: delayMs / 1000 },
        default: { duration: 0.7, ease: ENTRANCE_EASE, delay: delayMs / 1000 },
      },
      // Scale around each element's own centre so geometry is unchanged at rest.
      style: { transformBox: 'fill-box' as const, transformOrigin: 'center' },
    }
  }

  // Render order: build the active segment last so its lift layers above neighbours.
  const orderedSegGeo = (() => {
    if (!activeKey) return segGeo
    const idx = segGeo.findIndex((g) => g.key === activeKey)
    if (idx < 0) return segGeo
    const copy = segGeo.slice()
    const [a] = copy.splice(idx, 1)
    copy.push(a)
    return copy
  })()

  return (
    <svg
      viewBox="70 78 1080 534"
      role="group"
      aria-label="First Credit Union brand molecule"
      className="h-auto w-full select-none overflow-visible"
      style={{ display: 'block' }}
      onMouseLeave={() => onFocus(null)}
      onPointerMove={onPointerMoveCapture}
    >
      <title>First Credit Union brand molecule</title>
      <desc>A radial diagram of the brand: a central core, three group bands, and nine segments.</desc>

      <defs>
        <radialGradient id="bm-hubglow">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
        {bandGeo.map((b) => <path key={'bp' + b.groupKey} id={`bandlabel-${b.groupKey}`} d={b.labelPath} />)}
        {segGeo.map((g) => <path key={'sp' + g.key} id={`seglabel-${g.key}`} d={g.labelPath} />)}
      </defs>

      <motion.g style={{ x: parallaxX, y: parallaxY }} transition={{ duration: 0.4, ease: 'easeOut' }}>
        <g
          style={
            breathing && !reduce
              ? { transformBox: 'fill-box', transformOrigin: 'center', animation: 'bm-breathe 7s ease-in-out infinite' }
              : undefined
          }
        >
          {/* leaders (hidden in compact) — "draw" on entrance via stroke-dashoffset */}
          {!compact && segGeo.map((g, i) => {
            const seg = data.segments.find((s) => s.key === g.key)!
            const len = Math.hypot(g.leader.x2 - g.leader.x1, g.leader.y2 - g.leader.y1)
            const op = activeKey === null ? 0.6 : activeKey === g.key ? 1 : 0.15
            const drawDelay = (720 + i * 28) / 1000
            const drawn = reduce || entered
            return (
              <line
                key={'l' + g.key}
                x1={g.leader.x1} y1={g.leader.y1} x2={g.leader.x2} y2={g.leader.y2}
                stroke={seg.colorVar}
                strokeWidth={activeKey === g.key ? 2 : 1.5}
                style={{
                  opacity: drawn ? op : 0,
                  strokeDasharray: reduce ? undefined : len,
                  strokeDashoffset: drawn ? 0 : len,
                  transition: reduce
                    ? 'opacity .25s ease, stroke-width .2s ease'
                    : drawn
                      ? 'opacity .25s ease, stroke-width .2s ease'
                      : `stroke-dashoffset .55s ease ${drawDelay}s, opacity .45s ease ${drawDelay}s`,
                }}
              />
            )
          })}

          {/* group bands */}
          {bandGeo.map((b, i) => {
            const group = data.groups.find((g) => g.key === b.groupKey)!
            const op = activeGroupKey === null ? 1 : activeGroupKey === b.groupKey ? 1 : 0.4
            return (
              <motion.g key={'b' + b.groupKey} {...ent(130 + i * 80, 0.92)}>
                <g style={{ opacity: op, transition: reduce ? undefined : 'opacity .3s ease' }}>
                  <g transform={`translate(${d.cx} ${d.cy})`}><path d={b.path} fill={group.colorVar} /></g>
                  <text fontSize={13} fontWeight={700} letterSpacing="0.04em" fill="var(--color-neutral-0)" style={{ textTransform: 'uppercase', opacity: 0.92, pointerEvents: 'none' }}>
                    <textPath href={`#bandlabel-${b.groupKey}`} startOffset="50%" textAnchor="middle">{group.label}</textPath>
                  </text>
                </g>
              </motion.g>
            )
          })}

          {/* segments — active segment rendered last (layers above) */}
          {orderedSegGeo.map((g) => {
            const seg = data.segments.find((s) => s.key === g.key)!
            const i = segGeo.findIndex((x) => x.key === g.key)
            const isActive = activeKey === g.key
            const op = activeKey === null ? 1 : isActive ? 1 : 0.28
            const tx = Math.sin((g.centerAngle * Math.PI) / 180) * 8
            const ty = -Math.cos((g.centerAngle * Math.PI) / 180) * 8
            const segDelay = entranceDirection === 'radiate' ? 320 + i * 20 : 320 + i * 48
            return (
              <motion.g key={'s' + g.key} {...ent(segDelay, 0.7)}>
                <g
                  role="button" tabIndex={0} data-bm-segment
                  aria-label={`${seg.annotationTitle} — ${seg.attributes}`}
                  onMouseEnter={() => onFocus(g.key)}
                  onFocus={() => onFocus(g.key)}
                  onClick={() => onSelect(g.key)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(g.key) } }}
                  style={{
                    cursor: 'pointer',
                    opacity: op,
                    transform: (isActive && !reduce) ? `translate(${tx}px, ${ty}px) scale(1.05)` : 'none',
                    transformBox: 'fill-box', transformOrigin: 'center',
                    filter: (isActive && !reduce)
                      ? `drop-shadow(0 8px 16px color-mix(in srgb, ${seg.colorVar} 45%, transparent))`
                      : 'none',
                    transition: reduce
                      ? 'opacity .15s ease'
                      : 'transform .34s cubic-bezier(.34,1.3,.5,1), opacity .25s ease, filter .25s ease',
                  }}
                >
                  <g transform={`translate(${d.cx} ${d.cy})`}><path d={g.path} fill={seg.colorVar} /></g>
                  <text fontSize={11} fontWeight={600} fill="var(--color-neutral-0)" style={{ pointerEvents: 'none' }}>
                    <textPath href={`#seglabel-${g.key}`} startOffset="50%" textAnchor="middle">{seg.label}</textPath>
                  </text>
                </g>
              </motion.g>
            )
          })}

          {/* hub pulse (behind hub) — radiating energy from "You first" */}
          {showPulse && (
            <circle
              cx={d.cx} cy={d.cy} r={d.hubR} fill="url(#bm-hubglow)"
              style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'bm-pulsering 7s ease-out infinite', pointerEvents: 'none' }}
            />
          )}

          {/* hub */}
          <motion.g {...ent(0, 0.5)}>
            <circle cx={d.cx} cy={d.cy} r={d.hubR} fill="var(--color-molecule-hub, #2D393B)" />
            <text x={d.cx} y={d.cy - 8} textAnchor="middle" fontSize={9} letterSpacing="1.2" fontWeight={600} fill="var(--color-neutral-400, #9fb0b5)">{data.centerKicker}</text>
            <text x={d.cx} y={d.cy + 14} textAnchor="middle" fontSize={20} fontWeight={700} fill="var(--color-neutral-0)">{data.centerLabel}</text>
          </motion.g>

          {/* annotations (hidden in compact) — two-way cross-highlight with segments */}
          {!compact && segGeo.map((g, i) => {
            const seg = data.segments.find((s) => s.key === g.key)!
            const isActive = activeKey === g.key
            return (
              <motion.g key={'a' + g.key} {...ent(780 + i * 32, 1, 8)}>
                <g transform={`translate(${g.annotation.x} ${g.annotation.y})`}
                  onMouseEnter={() => onFocus(g.key)} onClick={() => onSelect(g.key)} style={{ cursor: 'pointer' }}>
                  <text textAnchor={g.annotation.anchor} fontSize={13}
                    style={{ fill: isActive ? 'var(--color-foreground)' : 'var(--color-foreground-muted)', fontWeight: isActive ? 700 : 600, transition: reduce ? undefined : 'fill .25s' }}>
                    {seg.annotationTitle}
                  </text>
                  <text textAnchor={g.annotation.anchor} y={15} fontSize={11}
                    style={{ fill: 'var(--color-foreground-muted)', opacity: isActive ? 1 : 0, transition: reduce ? undefined : 'opacity .25s' }}>
                    {seg.attributes}
                  </text>
                </g>
              </motion.g>
            )
          })}
        </g>
      </motion.g>
    </svg>
  )
}
