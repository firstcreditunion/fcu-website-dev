// src/components/brand-molecule/MoleculeDetail.tsx
'use client'

import { motion } from 'motion/react'
import { PortableText } from 'next-sanity'
import type { MoleculeSegment } from './lib/types'

interface Props {
  segment: MoleculeSegment
  /** Group label for the eyebrow (e.g. "Head & Hearts"). */
  groupLabel: string
  onClose: () => void
  /** Stagger rows in; off under reduced motion (instant). */
  animate?: boolean
}

const ROW_EASE = [0.22, 0.61, 0.36, 1] as const

export function MoleculeDetail({ segment, groupLabel, onClose, animate = true }: Props) {
  // Each content row rises in (opacity + translateY), staggered. Keying the whole
  // panel on segment.key (done by the caller) re-runs this when segments switch.
  const row = (i: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: ROW_EASE, delay: (90 + i * 70) / 1000 },
        }
      : { initial: false as const, animate: { opacity: 1, y: 0 } }

  const color = segment.colorVar

  return (
    <div className="flex flex-col gap-4">
      <motion.div {...row(0)} className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-[9px]">
          <span
            className="inline-flex items-center gap-[9px] text-[11px] font-bold uppercase"
            style={{ letterSpacing: '.13em', color }}
          >
            <span
              aria-hidden="true"
              className="h-[9px] w-[9px] rounded-[3px]"
              style={{ background: color, boxShadow: `0 0 0 4px color-mix(in srgb, ${color} 16%, transparent)` }}
            />
            {groupLabel}
          </span>
          <h2
            className="m-0 text-[23px] font-semibold leading-[1.12] text-foreground"
            style={{ letterSpacing: '-.015em' }}
          >
            {segment.annotationTitle}
          </h2>
        </div>
        <button
          type="button"
          data-bm-close
          onClick={onClose}
          aria-label="Close detail"
          className="inline-grid h-8 w-8 flex-none place-items-center rounded-[9px] border border-border bg-surface text-[14px] leading-none text-foreground-muted"
        >
          ✕
        </button>
      </motion.div>

      <motion.div
        {...row(1)}
        aria-hidden="true"
        className="h-[2px] rounded-[2px]"
        style={{ background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 0%, transparent))` }}
      />

      <motion.p {...row(1)} className="m-0 text-[13px] font-semibold" style={{ letterSpacing: '.01em', color }}>
        {segment.attributes}
      </motion.p>

      {segment.detail ? (
        <motion.div
          {...row(2)}
          className="prose prose-sm m-0 max-w-none text-[14.5px] leading-[1.62] text-foreground-muted"
        >
          <PortableText value={segment.detail} />
        </motion.div>
      ) : null}
    </div>
  )
}
