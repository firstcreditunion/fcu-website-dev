// src/app/(frontend)/brand-molecule/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { BRAND_MOLECULE_QUERY } from '@/sanity/lib/queries'
import { adaptMolecule } from '@/components/brand-molecule/lib/adapt-molecule'
import { BrandMolecule } from '@/components/brand-molecule/BrandMolecule'

export const metadata = { title: 'Brand Molecule' }

export default async function BrandMoleculePage() {
  const raw = await client.fetch(BRAND_MOLECULE_QUERY)
  // Generated query type is a union (SCREAMING_SNAKE BRAND_MOLECULE_QUERY_RESULT);
  // adaptMolecule takes a loose RawMolecule — narrow at the call site.
  const data = adaptMolecule(raw as Parameters<typeof adaptMolecule>[0])
  if (!data) notFound()

  return <BrandMolecule data={data} />
}
