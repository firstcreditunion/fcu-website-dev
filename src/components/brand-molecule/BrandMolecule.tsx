// src/components/brand-molecule/BrandMolecule.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Drawer } from 'vaul'
import { MoleculeWheel } from './MoleculeWheel'
import { MoleculeDetail } from './MoleculeDetail'
import { MoleculeA11yList } from './MoleculeA11yList'
import type { MoleculeData, MoleculeVariant } from './lib/types'

export function BrandMolecule({ data, variant }: { data: MoleculeData; variant: MoleculeVariant }) {
  const reduce = useReducedMotion()
  const expandable = variant === 'expand'
  const autoTour = variant === 'tour'
  const [active, setActive] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [playing, setPlaying] = useState(autoTour && !reduce)
  const [paused, setPaused] = useState(false)

  const selectedSeg = data.segments.find((s) => s.key === selected) ?? null

  const onSelect = (k: string) => {
    if (expandable) setSelected(k)
    else setActive(k)
  }

  useEffect(() => {
    if (!autoTour || !playing || paused) return
    const id = setInterval(() => {
      setActive((cur) => {
        const i = data.segments.findIndex((s) => s.key === cur)
        return data.segments[(i + 1) % data.segments.length].key
      })
    }, 2800)
    return () => clearInterval(id)
  }, [autoTour, playing, paused, data.segments])

  return (
    <div className="relative w-full">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <motion.div
          onPointerEnter={() => autoTour && setPaused(true)}
          onPointerLeave={() => autoTour && setPaused(false)}
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <MoleculeWheel data={data} activeKey={active} onFocus={setActive} onSelect={onSelect} />
        </motion.div>

        {/* desktop side card (V2) */}
        {expandable && (
          <div className="hidden lg:block lg:w-[320px]">
            <AnimatePresence mode="wait">
              {selectedSeg && (
                <motion.div key={selectedSeg.key}
                  initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-md)]">
                  <MoleculeDetail segment={selectedSeg} onClose={() => setSelected(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {autoTour && (
        <div className="mt-4 flex justify-center">
          <button type="button" onClick={() => setPlaying((p) => !p)}
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground-muted hover:bg-surface-muted"
            aria-pressed={playing}>
            {playing ? 'Pause tour' : 'Play tour'}
          </button>
        </div>
      )}

      {/* mobile bottom sheet (V2) */}
      {expandable && (
        <Drawer.Root open={!!selectedSeg} onOpenChange={(o) => !o && setSelected(null)}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
            <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-card p-5 lg:hidden">
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
              {selectedSeg && <MoleculeDetail segment={selectedSeg} onClose={() => setSelected(null)} />}
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}

      <MoleculeA11yList data={data} />
    </div>
  )
}
