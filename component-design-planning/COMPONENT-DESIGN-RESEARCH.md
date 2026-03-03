# FCU Component Design — Architecture Research

> Comprehensive research on building a reusable, CMS-driven component system for First Credit Union using Next.js 16, TypeScript, Sanity CMS v3, and shadcn/ui. The goal: **developers build once, content editors compose freely.**

---

## Table of Contents

1. [Architecture Philosophy](#1-architecture-philosophy)
2. [The Three-Layer Component Model](#2-the-three-layer-component-model)
3. [Sanity Schema Design for Components](#3-sanity-schema-design-for-components)
4. [Page Builder Architecture](#4-page-builder-architecture)
5. [Frontend Component Structure](#5-frontend-component-structure)
6. [Component Registry & Rendering Pipeline](#6-component-registry--rendering-pipeline)
7. [TypeScript Type Safety](#7-typescript-type-safety)
8. [Visual Editing & Live Preview](#8-visual-editing--live-preview)
9. [Portable Text Integration](#9-portable-text-integration)
10. [SEO & Metadata Per Component](#10-seo--metadata-per-component)
11. [Responsive Design Strategy](#11-responsive-design-strategy)
12. [Accessibility Standards](#12-accessibility-standards)
13. [Performance Optimisation](#13-performance-optimisation)
14. [Content Reuse Patterns](#14-content-reuse-patterns)
15. [Component Categories & Block Inventory](#15-component-categories--block-inventory)
16. [File & Directory Structure](#16-file--directory-structure)
17. [Naming Conventions](#17-naming-conventions)
18. [Editor Experience (Studio UX)](#18-editor-experience-studio-ux)
19. [Testing Strategy](#19-testing-strategy)
20. [Financial Services Considerations](#20-financial-services-considerations)
21. [Implementation Phases](#21-implementation-phases)
22. [Component Table of Contents (Build Plan)](#22-component-table-of-contents-build-plan)

---

## 1. Architecture Philosophy

### Core Principles

| Principle | Description |
|---|---|
| **Content is data, not pages** | Structure content for meaning, not presentation. A "hero" stores a headline, not a "big bold heading." |
| **Single source of truth** | Content lives in Sanity once. References link it; duplication is avoided. |
| **Separation of concerns** | Sanity schemas define *what* content is. React components decide *how* it looks. |
| **Model for meaning** | Field names must survive a redesign: `features` not `threeColumnLayout`, `callToAction` not `redButton`. |
| **Editor-centric** | Every schema choice should make the non-developer's life easier. Previews, icons, validation, grouping. |
| **Future-proof** | Design for channels that don't exist yet (app, email, AI). Keep presentation out of the CMS. |

### The Redesign Test

> "If we completely redesigned the site, would these field names still make sense?"

- `threeColumnFeatures` → Fails (what if 2 columns?)
- `features` → Passes (describes the content's purpose)
- `blueHighlightBox` → Fails (what if the brand changes?)
- `callout` → Passes (describes the role)

### Anti-Patterns to Avoid

- Storing CSS classes, colours, or font sizes in Sanity
- Storing heading levels (`h1`, `h2`) in schema — determine dynamically in the frontend
- Creating too many block variations (>2 variants = split into separate blocks)
- Over-referencing (most blocks should be embedded objects, not references)
- Boolean fields for states that might expand (use string lists with radio layout instead)

---

## 2. The Three-Layer Component Model

Every component in the FCU system spans three layers:

```
┌──────────────────────────────────────────────┐
│  Layer 1: SANITY SCHEMA (Content Model)      │
│  ─ defineType + defineField + defineArrayMember│
│  ─ Validation, previews, icons               │
│  ─ Lives in: src/sanity/schemaTypes/blocks/  │
├──────────────────────────────────────────────┤
│  Layer 2: GROQ QUERY (Data Fetching)         │
│  ─ defineQuery() for TypeGen support         │
│  ─ Projection per block type                 │
│  ─ Reference expansion only where needed     │
│  ─ Lives in: src/sanity/lib/queries.ts       │
├──────────────────────────────────────────────┤
│  Layer 3: REACT COMPONENT (Presentation)     │
│  ─ Server Component by default               │
│  ─ 'use client' only for interactivity       │
│  ─ shadcn/ui primitives + Tailwind CSS       │
│  ─ Lives in: src/components/blocks/          │
└──────────────────────────────────────────────┘
```

### Why Three Layers Matter

- **Schema changes** don't break the frontend (queries abstract the mapping)
- **Query changes** don't require schema migrations
- **Component redesigns** leave content untouched
- **TypeGen** bridges all three with generated types

---

## 3. Sanity Schema Design for Components

### Schema File Organisation

```
src/sanity/schemaTypes/
├── index.ts                    # Schema registry
├── siteSettings.ts             # Global settings (exists)
├── headerNavigation.ts         # Nav structure (exists)
├── page.ts                     # Page document with pageBuilder
├── post.ts                     # Blog post document
├── blocks/                     # Page builder block schemas
│   ├── heroBlock.ts
│   ├── featuresBlock.ts
│   ├── ctaBlock.ts
│   ├── testimonialBlock.ts
│   ├── faqBlock.ts
│   ├── statsBlock.ts
│   ├── pricingBlock.ts
│   ├── formBlock.ts
│   ├── imageGalleryBlock.ts
│   ├── videoBlock.ts
│   ├── richTextBlock.ts
│   ├── logoCloudBlock.ts
│   ├── teamBlock.ts
│   ├── timelineBlock.ts
│   ├── comparisonBlock.ts
│   ├── branchFinderBlock.ts
│   ├── rateDisplayBlock.ts
│   ├── calculatorBlock.ts
│   └── contentCardGridBlock.ts
├── objects/                    # Reusable objects (some exist)
│   ├── link.ts
│   ├── seo.ts
│   ├── socialLink.ts
│   ├── address.ts
│   ├── portableText.ts         # Rich text configuration
│   ├── buttonLink.ts           # CTA button object
│   └── imageWithAlt.ts         # Image + mandatory alt text
└── documents/                  # Shared reference documents
    ├── testimonial.ts
    ├── faq.ts
    ├── teamMember.ts
    ├── branch.ts
    └── product.ts
```

### Strict Definition Syntax (Mandatory)

Every schema **must** use the helper functions:

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'primaryAction',
      title: 'Primary CTA',
      type: 'buttonLink',
    }),
    defineField({
      name: 'secondaryAction',
      title: 'Secondary CTA',
      type: 'buttonLink',
    }),
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      description: 'Visual tone — the frontend translates this to colours/styles',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Prominent', value: 'prominent' },
          { title: 'Subtle', value: 'subtle' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'image' },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled Hero',
        subtitle: 'Hero',
        media: media ?? RocketIcon,
      }
    },
  },
})
```

### Shared Fields Pattern

Common fields (SEO, CTAs) are extracted and spread:

```typescript
// src/sanity/schemaTypes/shared/seoFields.ts
export const seoFields = [
  defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title', group: 'seo' }),
  defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', group: 'seo' }),
  defineField({ name: 'ogImage', type: 'image', title: 'Social Image', group: 'seo' }),
]

// Used in page schemas:
defineType({
  name: 'page',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    ...seoFields,
  ],
})
```

### References vs Embedded Objects Decision Matrix

| Content Type | Use | Reason |
|---|---|---|
| Hero section | **Object** (embedded) | Unique per page, not shared |
| Testimonial in a block | **Reference** | Reusable across many pages |
| FAQ items | **Reference** | Central management, used in multiple contexts |
| CTA button | **Object** | Page-specific copy and links |
| Team member | **Reference** | Single profile, many appearances |
| Feature list | **Object** | Specific to each features block |
| Branch location | **Reference** | Shared data (address, hours, contact) |
| SEO metadata | **Object** | Always page-specific |
| Product/rate info | **Reference** | Single source of truth for financial data |

---

## 4. Page Builder Architecture

### The Core Pattern

A page builder is an **array of typed objects** that lets editors compose pages from reusable blocks without developer intervention.

```typescript
// src/sanity/schemaTypes/pageBuilderType.ts
import { defineType, defineArrayMember } from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'heroBlock' }),
    defineArrayMember({ type: 'featuresBlock' }),
    defineArrayMember({ type: 'ctaBlock' }),
    defineArrayMember({ type: 'testimonialBlock' }),
    defineArrayMember({ type: 'faqBlock' }),
    defineArrayMember({ type: 'statsBlock' }),
    defineArrayMember({ type: 'richTextBlock' }),
    defineArrayMember({ type: 'imageGalleryBlock' }),
    defineArrayMember({ type: 'videoBlock' }),
    defineArrayMember({ type: 'formBlock' }),
    defineArrayMember({ type: 'comparisonBlock' }),
    defineArrayMember({ type: 'rateDisplayBlock' }),
    defineArrayMember({ type: 'calculatorBlock' }),
    defineArrayMember({ type: 'contentCardGridBlock' }),
  ],
  options: {
    insertMenu: {
      filter: true,
      groups: [
        {
          name: 'content',
          title: 'Content',
          of: ['heroBlock', 'richTextBlock', 'featuresBlock', 'statsBlock'],
        },
        {
          name: 'engagement',
          title: 'Engagement',
          of: ['ctaBlock', 'testimonialBlock', 'faqBlock', 'formBlock'],
        },
        {
          name: 'media',
          title: 'Media',
          of: ['imageGalleryBlock', 'videoBlock'],
        },
        {
          name: 'financial',
          title: 'Financial',
          of: ['comparisonBlock', 'rateDisplayBlock', 'calculatorBlock'],
        },
      ],
      views: [
        { name: 'list' },
        {
          name: 'grid',
          previewImageUrl: (type) => `/static/block-previews/${type}.png`,
        },
      ],
    },
  },
})
```

### Page Document Using the Builder

```typescript
// src/sanity/schemaTypes/page.ts
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', group: 'content', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'pageBuilder', type: 'pageBuilder', group: 'content' }),
    ...seoFields,
  ],
})
```

### When to Use Page Builder vs Structured Documents

| Use Page Builder | Use Structured Document |
|---|---|
| Marketing landing pages | Blog posts (fixed structure) |
| Product pages with flexible layout | Product detail pages (formulaic) |
| Campaign/promotion pages | Branch pages (consistent fields) |
| About/team pages | FAQs (list of items) |
| Any page where editors need layout control | Rate/fee schedules (tabular data) |

---

## 5. Frontend Component Structure

### Component Directory Layout

```
src/components/
├── ui/                         # shadcn/ui primitives (already installed)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── blocks/                     # Page builder block components
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── CallToAction.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── Stats.tsx
│   ├── RichText.tsx
│   ├── ImageGallery.tsx
│   ├── Video.tsx
│   ├── Form.tsx
│   ├── Comparison.tsx
│   ├── RateDisplay.tsx
│   ├── Calculator.tsx
│   ├── ContentCardGrid.tsx
│   └── index.ts                # Block registry (component map)
├── portable-text/              # Portable Text custom renderers
│   ├── components.tsx          # PortableTextComponents object
│   ├── LinkMark.tsx
│   └── PteImage.tsx
├── shared/                     # Cross-cutting shared components
│   ├── SanityImage.tsx         # Wraps next/image + Sanity URL builder
│   ├── ButtonLink.tsx          # Renders Sanity buttonLink objects
│   ├── Section.tsx             # Semantic section wrapper with tone
│   └── PageBuilder.tsx         # The switch-based renderer
└── layout/                     # Layout-level components
    ├── Header.tsx
    ├── Footer.tsx
    └── ...
```

### Server vs Client Component Rules

| Server Component (default) | Client Component ('use client') |
|---|---|
| Static content rendering | Interactive calculators |
| Image components | Form blocks (validation, submission) |
| Text/heading blocks | Accordion (open/close state) |
| Card grids | Carousel/slider (navigation state) |
| Stats displays | Video player (play/pause) |
| Most block components | Search/filter interactions |
| SEO metadata generation | Tabs with active state |
| Data fetching | Visual Editing presentation queries |

**Rule:** Start every component as a Server Component. Only add `'use client'` when you need hooks, event handlers, or browser APIs.

---

## 6. Component Registry & Rendering Pipeline

### The Block Registry Pattern

```typescript
// src/components/blocks/index.ts
import dynamic from 'next/dynamic'

export const blockComponents: Record<string, React.ComponentType<any>> = {
  heroBlock: dynamic(() => import('./Hero').then(m => m.Hero)),
  featuresBlock: dynamic(() => import('./Features').then(m => m.Features)),
  ctaBlock: dynamic(() => import('./CallToAction').then(m => m.CallToAction)),
  testimonialBlock: dynamic(() => import('./Testimonials').then(m => m.Testimonials)),
  faqBlock: dynamic(() => import('./FAQ').then(m => m.FAQ)),
  // ... all blocks
}
```

### The PageBuilder Renderer

```typescript
// src/components/shared/PageBuilder.tsx
import { blockComponents } from '@/components/blocks'

type Block = { _type: string; _key: string; [key: string]: unknown }

export function PageBuilder({
  content,
  documentId,
}: {
  content: Block[]
  documentId: string
}) {
  if (!Array.isArray(content)) return null

  return (
    <main>
      {content.map((block, index) => {
        const Component = blockComponents[block._type]

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            return <div key={block._key}>Unknown block type: {block._type}</div>
          }
          return null
        }

        return (
          <Component
            key={block._key}
            documentId={documentId}
            isFirstBlock={index === 0}
            {...block}
          />
        )
      })}
    </main>
  )
}
```

### Semantic Heading Levels

**Never store heading levels in Sanity.** Determine them from context:

```typescript
function Section({
  block,
  isFirstBlock = false,
}: {
  block: { headline: string }
  isFirstBlock?: boolean
}) {
  const Tag = isFirstBlock ? 'h1' : 'h2'
  return <Tag>{block.headline}</Tag>
}
```

### Stega Cleaning for Logic

When block fields control rendering logic (alignment, tone, variant), always clean stega:

```typescript
import { stegaClean } from 'next-sanity'

function Features({ layout, items }: FeaturesProps) {
  const cleanLayout = stegaClean(layout) || 'grid'
  // Use cleanLayout for className logic, never the raw value
}
```

---

## 7. TypeScript Type Safety

### TypeGen Workflow

1. Schemas change → run `npm run typegen`
2. Queries change → run `npm run typegen`
3. Generated types appear in `src/sanity/types.ts`

### Typing Block Components

Use `Extract` to pull block types from the page query result:

```typescript
import type { PAGE_QUERYResult } from '@/sanity/types'

type PageContent = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>

type HeroProps = Extract<PageContent[number], { _type: 'heroBlock' }> & {
  documentId: string
  isFirstBlock?: boolean
}

export function Hero({ headline, subheadline, image, primaryAction, documentId, isFirstBlock }: HeroProps) {
  // Fully typed from schema
}
```

### Query Type Safety

All queries must use `defineQuery()`:

```typescript
import { defineQuery } from 'next-sanity'

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    pageBuilder[] {
      ...,
      _type == "testimonialBlock" => {
        ...,
        testimonials[]-> { _id, quote, author, company, image }
      },
      _type == "faqBlock" => {
        ...,
        faqs[]-> { _id, question, answer }
      }
    }
  }
`)
```

---

## 8. Visual Editing & Live Preview

### Architecture

The FCU project uses **embedded Studio** at `/studio` with route groups `(frontend)` and `studio`. Visual Editing is enabled via:

- `<SanityLive />` in `(frontend)/layout.tsx` for real-time content updates
- `<VisualEditing />` conditionally rendered in draft mode for click-to-edit overlays

### Presentation Queries (Performance)

For pages with many blocks, use targeted presentation queries so editing one block doesn't re-render the entire page:

```typescript
export const HERO_PRESENTATION_QUERY = defineQuery(`
  *[_id == $documentId][0] {
    _id, _type,
    "heroBlock": pageBuilder[_key == $blockKey && _type == "heroBlock"][0] {
      headline, subheadline, image, primaryAction, secondaryAction, tone
    }
  }
`)
```

### Key Rules

- Always use `_key` for React keys on array items (never index)
- Always include `_key` and `_type` in array projections
- Set `stega: false` for `generateMetadata` and `generateStaticParams`
- Clean stega values before using in comparisons, class logic, or HTML attributes
- Never let stega strings leak into `<head>` tags

---

## 9. Portable Text Integration

### When to Use Portable Text vs Page Builder

| Portable Text (`body[]`) | Page Builder (`pageBuilder[]`) |
|---|---|
| Rich text content within a block | Page-level layout composition |
| Blog post body | Marketing page structure |
| Inline images, links, embeds | Section-level components |
| Running prose with formatting | Reorderable content modules |

### Custom Portable Text Configuration

```typescript
// src/sanity/schemaTypes/objects/portableText.ts
export const portableText = defineType({
  name: 'portableText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          { name: 'link', type: 'object', fields: [
            defineField({ name: 'href', type: 'url' }),
            defineField({ name: 'openInNewTab', type: 'boolean' }),
          ]},
          { name: 'internalLink', type: 'reference', to: [{ type: 'page' }, { type: 'post' }] },
        ],
      },
    },
    { type: 'image', fields: [
      defineField({ name: 'alt', type: 'string', validation: (r) => r.required() }),
      defineField({ name: 'caption', type: 'string' }),
    ]},
  ],
})
```

---

## 10. SEO & Metadata Per Component

### Component-Level SEO Considerations

- Each page fetches its own `seo` object fields
- `generateMetadata` always sets `stega: false`
- JSON-LD structured data generated from page content (CreditUnion, FAQPage, Product schemas)
- Financial services require specific schema.org types:
  - `CreditUnion` for the organisation
  - `FinancialProduct` for loans/accounts
  - `FAQPage` for FAQ sections
  - `BreadcrumbList` for navigation

### Metadata Fetch Pattern

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: PAGE_SEO_QUERY,
    params: await params,
    stega: false, // Critical: no stega in <head>
  })

  return {
    title: data?.seoTitle || data?.title,
    description: data?.seoDescription,
    openGraph: { images: data?.ogImage ? [urlFor(data.ogImage).width(1200).height(630).url()] : [] },
  }
}
```

---

## 11. Responsive Design Strategy

### Approach: Mobile-First with Container Queries

- All components start with mobile layout, enhanced via `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Use Tailwind CSS v4 breakpoint utilities
- Container queries (`@container`) for component-level responsiveness (cards, feature grids)
- Fluid typography via `clamp()` for headings
- Touch targets: minimum 44×44px on all interactive elements
- Dynamic viewport units (`dvh`) for mobile hero sections

### Responsive Component Pattern

```typescript
function Features({ items }: FeaturesProps) {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @md:grid-cols-2 @lg:grid-cols-3">
        {items.map((item) => (
          <FeatureCard key={item._key} {...item} />
        ))}
      </div>
    </div>
  )
}
```

---

## 12. Accessibility Standards

### WCAG 2.1 AA (Mandatory for FCU)

| Requirement | Implementation |
|---|---|
| Colour contrast 4.5:1 (text) | Enforced via design tokens, checked in design guidelines |
| Colour contrast 3:1 (large text, UI) | Brand colours tested against backgrounds |
| Keyboard navigation | All interactive elements reachable via Tab |
| Focus visible | Custom `:focus-visible` ring using `--ring` token |
| Semantic HTML | `<section>`, `<nav>`, `<main>`, `<article>`, landmarks |
| Alt text | Mandatory on all images via schema validation |
| ARIA labels | Standalone icons get `aria-label`; decorative get `aria-hidden` |
| Skip links | Skip to main content link at page top |
| Touch targets | Minimum 44×44px, 8px gap between targets |
| Reduced motion | All animations respect `prefers-reduced-motion` |

### Per-Component Accessibility Checklist

Every block component must:
1. Use semantic heading hierarchy (determined by context, not CMS)
2. Include alt text for all imagery
3. Support keyboard navigation for interactive elements
4. Provide visible focus indicators
5. Work with screen readers (landmarks, ARIA)
6. Meet colour contrast requirements
7. Not rely on colour alone to convey meaning

---

## 13. Performance Optimisation

### Component-Level Strategies

| Strategy | Implementation |
|---|---|
| **Server Components** | Default for all blocks; zero client JS for static content |
| **Dynamic imports** | `next/dynamic` for heavy interactive blocks (calculator, forms) |
| **Image optimisation** | `next/image` via `SanityImage` wrapper; WebP/AVIF; responsive `sizes` |
| **Lazy loading** | Images below the fold use `loading="lazy"` |
| **Priority loading** | Hero images use `priority={true}` for LCP |
| **Code splitting** | Block registry uses dynamic imports; each block is its own chunk |
| **Suspense boundaries** | Wrap interactive blocks in `<Suspense>` with skeleton fallbacks |
| **ISR** | Sanity webhooks trigger tag-based revalidation for published content |
| **CDN caching** | `useCdn: true` for runtime fetches; `useCdn: false` for static generation |

### Core Web Vitals Targets

| Metric | Target | Component Impact |
|---|---|---|
| LCP | < 2.5s | Hero image priority, font preload, above-fold SSR |
| INP | < 200ms | Minimal client JS, debounced interactions |
| CLS | < 0.1 | Explicit image dimensions, skeleton loaders, font swap |

---

## 14. Content Reuse Patterns

### Pattern 1: Shared Reference Documents

Content reused across many pages lives as standalone documents:

```
Testimonials → Referenced from multiple page builder blocks
FAQs → Referenced from FAQ blocks and page footers
Team Members → Referenced from team blocks and author bios
Branches → Referenced from branch finder and contact pages
Products → Referenced from comparison, rate, calculator blocks
```

### Pattern 2: Shared Field Sets

Common field patterns extracted and spread into schemas:

```
seoFields → SEO title, description, OG image
buttonLink → Label, URL, style, openInNewTab
imageWithAlt → Image with mandatory alt text
```

### Pattern 3: Embedded Objects for Page-Specific Content

Content that is unique to a single page stays embedded:

```
Hero content → Headline, subheadline, image, CTAs
Feature items → Title, description, icon
Stat items → Number, label, suffix
```

### Decision Guide

- **Will this content appear on 2+ pages?** → Reference
- **Does it need its own editing interface?** → Reference
- **Is it unique to this one page?** → Embedded object
- **Does it need to stay in sync across the site?** → Reference
- **Is it a simple config (CTA, alignment)?** → Embedded object

---

## 15. Component Categories & Block Inventory

### Category 1: Content & Messaging

| Block | Purpose | Fields | Type |
|---|---|---|---|
| **Hero** | Above-fold impact section | headline, subheadline, image, primaryCTA, secondaryCTA, tone | Object |
| **Rich Text** | Freeform content via Portable Text | body (portableText) | Object |
| **Stats / Metrics** | Key numbers and achievements | items[] { value, label, suffix, icon } | Object |
| **Timeline** | Chronological events/milestones | items[] { date, title, description } | Object |

### Category 2: Engagement & Conversion

| Block | Purpose | Fields | Type |
|---|---|---|---|
| **Call to Action** | Conversion-focused banner | headline, description, primaryCTA, secondaryCTA, tone | Object |
| **Testimonials** | Social proof section | headline, testimonials[] → testimonial | Reference |
| **FAQ** | Common questions | headline, faqs[] → faq | Reference |
| **Form** | Lead capture / contact | headline, formType (contact, newsletter, application), description | Object |

### Category 3: Navigation & Discovery

| Block | Purpose | Fields | Type |
|---|---|---|---|
| **Content Card Grid** | Linked content cards | headline, cards[] { title, description, image, link } | Object |
| **Logo Cloud** | Partner/member logos | headline, logos[] { name, image, url } | Object |
| **Team** | Staff/team showcase | headline, members[] → teamMember | Reference |

### Category 4: Media

| Block | Purpose | Fields | Type |
|---|---|---|---|
| **Image Gallery** | Image showcase | images[] { image, alt, caption } | Object |
| **Video** | Embedded video | headline, videoUrl, posterImage | Object |
| **Features** | Feature highlight grid | headline, items[] { title, description, icon, link }, layout | Object |

### Category 5: Financial Services (FCU-Specific)

| Block | Purpose | Fields | Type |
|---|---|---|---|
| **Product Comparison** | Side-by-side product comparison | headline, products[] → product | Reference |
| **Rate Display** | Interest rate showcase | headline, rates[] → product (filtered) | Reference |
| **Calculator** | Interactive loan/savings calculator | calculatorType (loan, savings, mortgage), headline | Object |
| **Branch Finder** | Location search | headline, branches[] → branch | Reference |
| **Fee Table** | Structured fee schedule | headline, rows[] { description, amount, frequency } | Object |

---

## 16. File & Directory Structure

### Complete Project Structure (Component-Related)

```
src/
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.ts                      # Schema registry
│   │   ├── page.ts                       # Page document
│   │   ├── post.ts                       # Blog post document
│   │   ├── blocks/                       # Block schemas (1 file per block)
│   │   │   ├── heroBlock.ts
│   │   │   ├── featuresBlock.ts
│   │   │   └── ...
│   │   ├── objects/                      # Reusable objects
│   │   │   ├── portableText.ts
│   │   │   ├── buttonLink.ts
│   │   │   ├── imageWithAlt.ts
│   │   │   └── ...
│   │   ├── documents/                    # Shared reference documents
│   │   │   ├── testimonial.ts
│   │   │   ├── faq.ts
│   │   │   └── ...
│   │   └── shared/                       # Shared field definitions
│   │       └── seoFields.ts
│   ├── lib/
│   │   ├── queries.ts                    # All GROQ queries
│   │   ├── client.ts                     # Sanity client config
│   │   └── live.ts                       # defineLive setup
│   └── presentation/
│       └── resolve.ts                    # Document locations for Presentation Tool
├── components/
│   ├── ui/                               # shadcn/ui (existing)
│   ├── blocks/                           # Page builder block components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── ...
│   │   └── index.ts                      # Block registry
│   ├── portable-text/                    # PTE renderers
│   │   └── components.tsx
│   ├── shared/                           # Cross-cutting components
│   │   ├── SanityImage.tsx
│   │   ├── ButtonLink.tsx
│   │   ├── Section.tsx
│   │   └── PageBuilder.tsx
│   └── layout/                           # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── app/
│   ├── (frontend)/
│   │   ├── layout.tsx                    # Frontend layout with SanityLive + VisualEditing
│   │   ├── page.tsx                      # Home page
│   │   ├── [...slug]/page.tsx            # Dynamic pages (page builder)
│   │   └── component-design/            # Component design showcase (internal)
│   │       └── page.tsx
│   └── studio/
│       └── [[...tool]]/page.tsx          # Embedded Sanity Studio
└── lib/
    └── utils.ts                          # cn() helper, etc.
```

---

## 17. Naming Conventions

### Sanity Schema Names

| Convention | Example | Used For |
|---|---|---|
| **camelCase** | `heroBlock`, `featuresBlock` | Block type names |
| **camelCase** | `buttonLink`, `imageWithAlt` | Object type names |
| **camelCase** | `testimonial`, `teamMember` | Document type names |
| **camelCase** | `headline`, `subheadline` | Field names |

### React Component Names

| Convention | Example | Used For |
|---|---|---|
| **PascalCase** | `Hero.tsx`, `Features.tsx` | Block components |
| **PascalCase** | `SanityImage.tsx`, `ButtonLink.tsx` | Shared components |
| **PascalCase** | `PageBuilder.tsx` | Renderer component |

### File Names

| Convention | Example | Used For |
|---|---|---|
| **camelCase** `.ts` | `heroBlock.ts` | Sanity schema files |
| **PascalCase** `.tsx` | `Hero.tsx` | React component files |
| **camelCase** `.ts` | `queries.ts`, `utils.ts` | Utility files |

### Block Type ↔ Component Mapping

| Sanity Type Name | React Component | File |
|---|---|---|
| `heroBlock` | `<Hero />` | `Hero.tsx` |
| `featuresBlock` | `<Features />` | `Features.tsx` |
| `ctaBlock` | `<CallToAction />` | `CallToAction.tsx` |
| `testimonialBlock` | `<Testimonials />` | `Testimonials.tsx` |
| `faqBlock` | `<FAQ />` | `FAQ.tsx` |
| `formBlock` | `<FormBlock />` | `Form.tsx` |

---

## 18. Editor Experience (Studio UX)

### Block Preview Requirements

Every block schema **must** define:
1. **Icon** from `@sanity/icons`
2. **Preview** with `title`, `subtitle` (block type name), and `media` (fallback to icon)

### Insert Menu Grouping

Blocks are grouped by purpose in the insert menu:
- **Content** — Hero, Rich Text, Features, Stats
- **Engagement** — CTA, Testimonials, FAQ, Forms
- **Media** — Image Gallery, Video
- **Financial** — Comparison, Rate Display, Calculator

### Validation for Content Quality

- Required fields clearly marked
- Character limits on headlines (120 chars) and descriptions (300 chars)
- Alt text required on all images
- URL validation on link fields
- Cross-field validation where applicable (e.g. end date > start date)

### Conditional Field Visibility

Use `hidden` to show/hide fields based on other selections:

```typescript
defineField({
  name: 'calculatorType',
  type: 'string',
  options: { list: ['loan', 'savings', 'mortgage'], layout: 'radio' },
}),
defineField({
  name: 'defaultLoanAmount',
  type: 'number',
  hidden: ({ parent }) => parent?.calculatorType !== 'loan',
}),
```

---

## 19. Testing Strategy

### Component Testing Levels

| Level | Tool | What to Test |
|---|---|---|
| **Unit** | Vitest + React Testing Library | Individual block rendering, prop variations |
| **Visual** | Storybook or Chromatic | Visual regression across breakpoints |
| **Integration** | Playwright | Full page builder rendering with mock Sanity data |
| **Accessibility** | axe-core + Playwright | WCAG 2.1 AA compliance per block |
| **Performance** | Lighthouse CI | Core Web Vitals per page template |

### What Each Block Test Should Cover

1. Renders correctly with minimal props
2. Renders correctly with all props populated
3. Handles missing/null fields gracefully
4. Meets accessibility standards (keyboard, screen reader, contrast)
5. Responsive layout works across breakpoints
6. Interactive elements function correctly (for client components)

---

## 20. Financial Services Considerations

### Trust & Compliance Components

- **Security badges** — NZFMA, SSL indicators, FSP number display
- **Disclaimer blocks** — Interest rate disclaimers, legal notices
- **Regulatory footer** — Registered name, NZBN, FSP number, dispute resolution
- **Privacy indicators** — Secure form badges, encryption notices

### NZ Data Formatting (Enforced in Components)

| Data Type | Format | Example |
|---|---|---|
| Currency | NZD, 2 decimal places | $1,234.56 |
| Interest Rate | Percentage, 2 decimal places + "p.a." | 6.45% p.a. |
| Date | DD/MM/YYYY | 02/03/2026 |
| Phone | +64 or 0X XXX XXXX | 07 839 8896 |
| BSB / Account | XX-XXXX-XXXXXXX-XXX | 02-0316-0012345-000 |

### Sensitive Data Handling

- Account numbers masked (show last 4 digits)
- Password fields with visibility toggle
- Session timeout awareness in forms
- Secure form indicators visible to users

---

## 21. Implementation Phases

### Phase 1: Foundation (Infrastructure)

1. Create `page` document schema with `pageBuilder` array
2. Create shared objects (`buttonLink`, `imageWithAlt`, `portableText`)
3. Set up `PageBuilder.tsx` renderer and block registry
4. Set up `SanityImage.tsx` wrapper
5. Create `[...slug]/page.tsx` dynamic route with GROQ query
6. Configure Visual Editing and presentation queries
7. Run TypeGen and verify types

### Phase 2: Core Blocks (Most-Used)

1. `heroBlock` — Hero section
2. `richTextBlock` — Portable Text content
3. `featuresBlock` — Feature grid/list
4. `ctaBlock` — Call to action banner
5. `contentCardGridBlock` — Linked content cards

### Phase 3: Engagement Blocks

1. `testimonialBlock` — Social proof (with `testimonial` document)
2. `faqBlock` — FAQ accordion (with `faq` document)
3. `formBlock` — Contact / newsletter / application
4. `statsBlock` — Key metrics display

### Phase 4: Media & Layout Blocks

1. `imageGalleryBlock` — Image gallery
2. `videoBlock` — Embedded video
3. `logoCloudBlock` — Partner logos
4. `teamBlock` — Team members (with `teamMember` document)
5. `timelineBlock` — Timeline/milestones

### Phase 5: Financial Services Blocks

1. `comparisonBlock` — Product comparison table
2. `rateDisplayBlock` — Interest rate showcase
3. `calculatorBlock` — Loan/savings calculator
4. `branchFinderBlock` — Branch location search
5. `feeTableBlock` — Fee schedule

### Phase 6: Polish & Optimisation

1. Block preview images for Studio insert menu
2. Storybook/visual testing setup
3. Accessibility audit with axe-core
4. Performance audit with Lighthouse CI
5. Documentation in component-design page

---

## 22. Component Table of Contents (Build Plan)

This maps directly to the `src/app/(frontend)/component-design/` page where each component will be showcased with live demos.

### Foundations

- [ ] PageBuilder Renderer
- [ ] SanityImage Wrapper
- [ ] ButtonLink Component
- [ ] Section Wrapper (with tone support)
- [ ] Portable Text Renderer

### Content & Messaging Blocks

- [ ] Hero
- [ ] Rich Text
- [ ] Stats / Metrics
- [ ] Timeline
- [ ] Features

### Engagement & Conversion Blocks

- [ ] Call to Action
- [ ] Testimonials
- [ ] FAQ (Accordion)
- [ ] Form (Contact / Newsletter / Application)

### Navigation & Discovery Blocks

- [ ] Content Card Grid
- [ ] Logo Cloud
- [ ] Team Showcase

### Media Blocks

- [ ] Image Gallery
- [ ] Video Embed

### Financial Services Blocks

- [ ] Product Comparison
- [ ] Rate Display
- [ ] Calculator (Loan / Savings / Mortgage)
- [ ] Branch Finder
- [ ] Fee Table

---

## References & Sources

| Source | Key Takeaway |
|---|---|
| [Sanity Page Builder Patterns](references/page-builder.md) | Array of objects pattern, switch-based rendering, `_key` for React keys |
| [Sanity Schema Best Practices](references/schema.md) | `defineType`/`defineField`/`defineArrayMember`, references vs objects, deprecation |
| [Sanity Portable Text](references/portable-text.md) | Custom blocks, marks, annotations; separate from page builder |
| [Sanity Visual Editing](references/visual-editing.md) | Stega cleaning, presentation queries, `usePresentationQuery` |
| [Sanity + Next.js Integration](references/nextjs.md) | `defineLive`, `sanityFetch`, draft mode, embedded Studio |
| [Content Modeling Best Practices](skills/content-modeling) | Data not pages, separation of concerns, reference vs embedding |
| [SEO & AEO Best Practices](skills/seo-aeo) | EEAT, structured data, metadata patterns |
| [Next.js Best Practices](skills/next-best-practices) | RSC boundaries, async APIs, data patterns, image optimisation |
| [Responsive Design](skills/responsive-design) | Container queries, fluid typography, mobile-first |
| [Frontend Design](skills/frontend-design) | Distinctive UI, production-grade, accessible |
| [Web Interface Guidelines](skills/web-design-guidelines) | Vercel's UI review standard |
| [Sanity Docs — Page Building Guide](https://sanity.io/docs/developer-guides/how-to-use-structured-content-for-page-building) | Model for meaning, not presentation |
| [Sanity Docs — Fields & Relationships](https://sanity.io/docs/developer-guides/deciding-fields-and-relationships) | Practical content modeling decisions |
| [CFPB Design System](https://cfpb.github.io/design-system/) | Atomic design for financial services |
