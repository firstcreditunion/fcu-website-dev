// scripts/seed-brand-molecule.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

// Load env from .env.local without printing anything.
const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
const get = (k) =>
  (env.match(new RegExp('^' + k + '=(.*)$', 'm')) || [])[1]
    ?.trim()
    .replace(/^["']|["']$/g, '')

const client = createClient({
  projectId: get('NEXT_PUBLIC_SANITY_PROJECT_ID') || 'c8w93txa',
  dataset: get('NEXT_PUBLIC_SANITY_DATASET') || 'production',
  apiVersion: '2025-01-01',
  token: get('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
})

const groups = [
  { _key: 'hh', _type: 'group', key: { _type: 'slug', current: 'hh' }, label: 'Head & Hearts', colorToken: 'molecule-hh-band' },
  { _key: 'wt', _type: 'group', key: { _type: 'slug', current: 'wt' }, label: 'Walk & Talk', colorToken: 'molecule-wt-band' },
  { _key: 'pp', _type: 'group', key: { _type: 'slug', current: 'pp' }, label: 'Proof & Pudding', colorToken: 'molecule-pp-band' },
]
const seg = (key, label, groupKey, title, attrs, colorToken) => ({
  _key: key, _type: 'segment', key: { _type: 'slug', current: key },
  label, groupKey, annotationTitle: title, attributes: attrs, colorToken, detail: null, icon: null,
})
const segments = [
  seg('vision', 'Our Vision', 'hh', 'Our Vision', 'To help everyday Kiwis succeed.', 'molecule-hh-vision'),
  seg('values', 'Our Values', 'hh', 'Our Values', 'Honesty · Transparency · Fairness · Supportive', 'molecule-hh-values'),
  seg('belief', 'Belief', 'hh', 'Our Belief', 'Help Kiwis achieve their goals within their means.', 'molecule-hh-belief'),
  seg('behave', 'How we Behave', 'wt', 'How we Behave', 'Professional · Proactive · Open · Community-minded · Thrifty', 'molecule-wt-behave'),
  seg('talk', 'How we Talk', 'wt', 'How we Talk', 'Welcoming · Considerate · Straight-forward · Knowledgeable', 'molecule-wt-talk'),
  seg('look', 'How we Look', 'wt', 'How we Look', 'Modern · Fresh · Welcoming · Clear · Human · Kiwi', 'molecule-wt-look'),
  seg('proof', 'Proof', 'pp', 'Proof', 'World-class CU · 65+ years people helping people.', 'molecule-pp-proof'),
  seg('products', 'Products', 'pp', 'Products & Services', 'Value for money, inclusive, easy to understand.', 'molecule-pp-products'),
  seg('position', 'Position', 'pp', 'Position', 'You come first — not profits. A real alternative for life.', 'molecule-pp-position'),
]

await client.createOrReplace({
  _id: 'brandMolecule',
  _type: 'brandMolecule',
  title: 'Our Brand Molecule',
  intro: 'Everything we stand for, in one picture — built around you.',
  defaultVariant: 'focus',
  centerKicker: 'CORE OF BRAND',
  centerLabel: 'You first',
  groups,
  segments,
})
console.log('Seeded brandMolecule')

// Read-back verification: log only the _id and segment count, never the token or full doc.
const doc = await client.getDocument('brandMolecule')
console.log('Read-back _id:', doc?._id, '| segments:', doc?.segments?.length)
