// src/components/brand-molecule/MoleculeA11yList.tsx
import type { MoleculeData } from './lib/types'

export function MoleculeA11yList({ data }: { data: MoleculeData }) {
  return (
    <ol className="sr-only">
      {data.segments.map((s) => (
        <li key={s.key}>
          <strong>{s.annotationTitle}:</strong> {s.attributes}
        </li>
      ))}
    </ol>
  )
}
