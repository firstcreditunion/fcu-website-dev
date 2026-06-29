// src/app/(frontend)/brand-molecule/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { BRAND_MOLECULE_QUERY } from '@/sanity/lib/queries'
import { adaptMolecule } from '@/components/brand-molecule/lib/adapt-molecule'
import { BrandMolecule } from '@/components/brand-molecule/BrandMolecule'
import { VersionSwitcher } from '@/components/brand-molecule/VersionSwitcher'
import type { MoleculeVariant } from '@/components/brand-molecule/lib/types'

export const metadata = { title: 'Brand Molecule' }

const VALID: MoleculeVariant[] = ['focus', 'expand', 'tour']

export default async function BrandMoleculePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>
}) {
  const raw = await client.fetch(BRAND_MOLECULE_QUERY)
  // Generated query type is a union (SCREAMING_SNAKE BRAND_MOLECULE_QUERY_RESULT);
  // adaptMolecule takes a loose RawMolecule — narrow at the call site.
  const data = adaptMolecule(raw as Parameters<typeof adaptMolecule>[0])
  if (!data) notFound()

  const { v } = await searchParams
  const vMap: Record<string, MoleculeVariant> = { '1': 'focus', '2': 'expand', '3': 'tour' }
  const fromQuery = v ? vMap[v] ?? (VALID.includes(v as MoleculeVariant) ? (v as MoleculeVariant) : null) : null
  const variant = fromQuery ?? data.defaultVariant

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{data.title}</h1>
        {data.intro ? <p className="mx-auto mt-3 max-w-[60ch] text-foreground-muted">{data.intro}</p> : null}
      </header>
      <div className="mb-8 flex justify-center"><VersionSwitcher current={variant} /></div>
      <BrandMolecule key={variant} data={data} variant={variant} />
    </main>
  )
}
