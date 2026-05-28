# Loan Product Page Builder Authoring Guide

## Purpose

This guide explains how content editors should build and maintain loan product pages using the `loanProductPage` document and `loanPageBuilder` block system.

## Document Setup

Create one document per product page:

- Home Loan
- Travel Loan
- Wedding Loan
- Christmas Loan
- Hardship

Required setup:

1. Set `title`
2. Set `slug` (for example `loans/products/home-loan`)
3. Set `loanProductType`
4. Set `status` (`draft`, `ready`, `published`)
5. Add at least one block in `pageBuilder`

## Block Catalog

Recommended baseline stack for loan product pages:

1. `loanHeroBlock`
2. `featureGridBlock`
3. `loanExampleBlock` (or `ratesFeesBlock` first, based on page intent)
4. `ratesFeesBlock`
5. `noticeBlock` (responsible lending)
6. `faqBlock`
7. `relatedLinksBlock`
8. `ctaBarBlock`
9. `legalFinePrintBlock`

Optional blocks:

- `loanAtAGlanceBlock`
- `trustStatsBlock`

## Reuse Rules

- Keep product-specific content embedded inside each page's blocks.
- Use `sharedDisclaimer` references in `noticeBlock` only for compliance/legal text that must stay synchronized.
- Avoid over-referencing for normal marketing copy.

## Authoring Standards

- Use meaningful copy fields, not style instructions.
- Keep headings under character limits in Studio.
- Use internal links for FCU pages and external links only when required.
- Add legal/compliance notices where applicable.
- Keep CTA actions consistent with intended conversion path.

## Seed Rollout Plan (Initial 5 Pages)

Use `src/sanity/seeds/loanProductPagesSeed.ts` as starter payload guidance:

- `loans/products/home-loan`
- `loans/products/travel-loan`
- `loans/products/wedding-loan`
- `loans/products/christmas-loan`
- `loans/hardship`

## QA Checklist Before Publishing

- Slug matches navigation URL
- Hero copy and CTAs are accurate
- Rates and fee values reviewed
- Responsible lending notice present
- FAQ content reviewed by product owner
- Legal fine print present
- SEO title and description complete
