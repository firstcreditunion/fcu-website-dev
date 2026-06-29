// src/components/brand-molecule/BrandMolecule.tsx
'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { MoleculeWheel } from './MoleculeWheel'
import { MoleculeA11yList } from './MoleculeA11yList'
import type { MoleculeData, MoleculeVariant } from './lib/types'

interface Props {
  data: MoleculeData
  // V1 does not use `variant` yet; the page passes it and V2/V3 wire it in.
  variant: MoleculeVariant
}

export function BrandMolecule({ data }: Props) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="relative w-full">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
      >
        <MoleculeWheel
          data={data}
          activeKey={active}
          onFocus={setActive}
          onSelect={(k) => setActive(k)}
        />
      </motion.div>
      <MoleculeA11yList data={data} />
    </div>
  )
}
