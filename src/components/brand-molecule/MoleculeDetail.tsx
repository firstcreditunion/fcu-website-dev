// src/components/brand-molecule/MoleculeDetail.tsx
import { PortableText } from 'next-sanity'
import type { MoleculeSegment } from './lib/types'

export function MoleculeDetail({ segment, onClose }: { segment: MoleculeSegment; onClose: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground" style={{ color: segment.colorVar }}>{segment.annotationTitle}</h2>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-foreground-muted hover:bg-surface-muted">✕</button>
      </div>
      <p className="text-sm font-medium text-foreground-muted">{segment.attributes}</p>
      {segment.detail ? (
        <div className="prose prose-sm max-w-none text-foreground-muted"><PortableText value={segment.detail} /></div>
      ) : null}
    </div>
  )
}
