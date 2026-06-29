// src/components/brand-molecule/BrandMolecule.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Drawer } from 'vaul'
import { MoleculeWheel } from './MoleculeWheel'
import { MoleculeDetail } from './MoleculeDetail'
import { MoleculeA11yList } from './MoleculeA11yList'
import type { MoleculeData, MoleculeVariant } from './lib/types'

export function BrandMolecule({ data, variant }: { data: MoleculeData; variant: MoleculeVariant }) {
  const reduce = useReducedMotion()
  const expandable = variant === 'expand'
  const [active, setActive] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const selectedSeg = data.segments.find((s) => s.key === selected) ?? null

  const onSelect = (k: string) => {
    if (expandable) setSelected(k)
    else setActive(k)
  }

  return (
    <div className="relative w-full">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <motion.div
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
