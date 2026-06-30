// src/components/brand-molecule/MoleculeA11yList.tsx
import { PortableText } from 'next-sanity'
import type { MoleculeData } from './lib/types'

/**
 * Visually-hidden list of every segment as `"{title} — {attributes}. {detail}"`,
 * so the SVG's content is fully available to assistive tech.
 */
export function MoleculeA11yList({ data }: { data: MoleculeData }) {
  return (
    <ul className="sr-only">
      {data.segments.map((s) => (
        <li key={s.key}>
          {s.annotationTitle} — {s.attributes}.{' '}
          {s.detail ? <PortableText value={s.detail} /> : null}
        </li>
      ))}
    </ul>
  )
}
