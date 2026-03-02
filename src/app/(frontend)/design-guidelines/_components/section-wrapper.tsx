'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { Separator } from '@/components/ui/separator'

interface SectionWrapperProps {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}

export function SectionWrapper({
  id,
  title,
  description,
  children,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-8 pb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}

      <Separator className="mt-20 bg-border" />
    </motion.section>
  )
}

export function Subsection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-12 first:mt-0">
      <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {description && (
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      )}
      {!description && <div className="mb-6" />}
      {children}
    </div>
  )
}
