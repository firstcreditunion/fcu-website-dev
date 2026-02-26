# Site Settings — Comprehensive Plan

## Overview

A **singleton document** in Sanity called `siteSettings` (document ID: `siteSettings`) that stores all global, site-wide configuration. Organized into **groups** (tabs) in Sanity Studio for clean editor UX.

This document covers every field category a modern financial-services website needs — from basic identity through SEO, compliance, analytics, and emergency alerting.

---

## Sanity Studio Groups (Tabs)

| # | Group Key | Tab Label | Purpose |
|---|-----------|-----------|---------|
| 1 | `general` | General | Site name, tagline, logo, favicon, contact |
| 2 | `seo` | SEO & Metadata | Default meta, OG, Twitter, robots, sitemap |
| 3 | `social` | Social & Links | Social media profiles, external links |
| 4 | `contact` | Contact & Hours | Primary contact info, branch hours |
| 5 | `announcement` | Announcements | Top-bar alerts, maintenance banners |
| 6 | `analytics` | Analytics & Scripts | GA4, GTM, third-party scripts, code injection |
| 7 | `compliance` | Compliance & Legal | Financial disclosures, dispute resolution, privacy |
| 8 | `appearance` | Appearance | Light/dark mode, custom CSS overrides |
| 9 | `advanced` | Advanced | Maintenance mode, redirects, robots.txt overrides |

---

## 1. General (Group: `general`)

Core brand identity and basic site information.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `siteName` | `string` | Yes | "First Credit Union" — used in `<title>` suffix, schema.org |
| `siteTagline` | `string` | No | Short tagline / strapline |
| `siteDescription` | `text` (3 rows) | Yes | Default meta description fallback |
| `siteUrl` | `url` | Yes | Canonical base URL (e.g. `https://www.firstcreditunion.co.nz`). Validation: must start with `https://` |
| `logo` | `image` (hotspot) | Yes | Primary logo (SVG or PNG, transparent). Used in header, OG fallback, schema.org |
| `logoAlt` | `string` | Yes | Alt text for logo |
| `logoDark` | `image` (hotspot) | No | Dark-mode variant if needed |
| `favicon` | `image` | No | 32×32 or SVG favicon. Falls back to logo if not set |
| `appleTouchIcon` | `image` | No | 180×180 Apple touch icon |
| `locale` | `string` | Yes | Default `en-NZ`. Options list: `en-NZ`, `mi-NZ` |
| `currency` | `string` | Yes | Default `NZD`. Read-only for now |
| `dateFormat` | `string` | Yes | Default `DD/MM/YYYY`. Options list |
| `timezone` | `string` | Yes | Default `Pacific/Auckland` |

---

## 2. SEO & Metadata (Group: `seo`)

Default metadata used as fallbacks when pages don't specify their own.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `defaultSeoTitle` | `string` | No | Fallback `<title>` if a page has none |
| `titleTemplate` | `string` | No | Template pattern, e.g. `%s | First Credit Union`. `%s` is replaced with page title |
| `defaultSeoDescription` | `text` (3 rows) | No | Fallback meta description |
| `defaultOgImage` | `image` (hotspot) | Yes | Default Open Graph image (1200×630). Used when pages have no OG image |
| `twitterHandle` | `string` | No | e.g. `@FirstCreditUnion` — for `twitter:site` |
| `twitterCardType` | `string` | No | `summary` or `summary_large_image`. Default: `summary_large_image` |
| `googleSiteVerification` | `string` | No | Google Search Console verification code |
| `bingSiteVerification` | `string` | No | Bing Webmaster verification code |
| `noIndexSite` | `boolean` | No | Emergency kill-switch to add `noindex` to entire site. Default: `false` |
| `robotsTxtOverride` | `text` | No | Custom `robots.txt` content. Blank = auto-generated |
| `enableJsonLd` | `boolean` | No | Enable Organization schema.org JSON-LD on every page. Default: `true` |

---

## 3. Social & Links (Group: `social`)

Social media profiles and external platform links.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `socialLinks` | `array` of `socialLink` objects | No | Each has: `platform` (string list), `url` (url), `label` (string) |

**`socialLink` object fields:**

| Field | Type | Notes |
|-------|------|-------|
| `platform` | `string` (options list) | `facebook`, `instagram`, `linkedin`, `youtube`, `tiktok`, `twitter`, `threads` |
| `url` | `url` | Full URL to profile |
| `label` | `string` | Accessible label, e.g. "Follow us on Facebook" |

---

## 4. Contact & Hours (Group: `contact`)

Primary organisation contact information and operating hours.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `primaryPhone` | `string` | Yes | Main phone number. Validated format: `+64` or `0X` prefix |
| `tollFreePhone` | `string` | No | Toll-free / 0800 number |
| `primaryEmail` | `string` (email validated) | Yes | General enquiries email |
| `headOfficeAddress` | `object` | Yes | Structured address: `street`, `suburb`, `city`, `postcode`, `region`, `country` (default "New Zealand") |
| `postalAddress` | `object` | No | PO Box / postal address if different from physical |
| `businessHours` | `array` of `dayHours` objects | No | Operating hours per day |
| `holidayNotice` | `text` (2 rows) | No | Short notice about public holiday hours |

**`headOfficeAddress` / `postalAddress` object fields:**

| Field | Type | Notes |
|-------|------|-------|
| `street` | `string` | Street address line |
| `suburb` | `string` | Optional suburb |
| `city` | `string` | City / town |
| `postcode` | `string` | NZ postcode |
| `region` | `string` | e.g. Waikato |
| `country` | `string` | Default "New Zealand" |

**`dayHours` object fields:**

| Field | Type | Notes |
|-------|------|-------|
| `day` | `string` (options list) | Monday – Sunday, Public Holidays |
| `openTime` | `string` | e.g. "8:30 AM" |
| `closeTime` | `string` | e.g. "4:30 PM" |
| `isClosed` | `boolean` | If true, display "Closed" |

---

## 5. Announcements (Group: `announcement`)

Site-wide banners for alerts, promotions, or maintenance notices.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `announcementBar` | `object` | No | Top-of-page announcement bar |

**`announcementBar` object fields:**

| Field | Type | Notes |
|-------|------|-------|
| `enabled` | `boolean` | Show/hide the bar |
| `message` | `text` (2 rows) | Banner message text (max 200 chars) |
| `linkText` | `string` | Optional CTA text, e.g. "Learn more" |
| `linkUrl` | `string` | Internal or external URL |
| `style` | `string` (options list) | `info`, `warning`, `success`, `emergency`. Determines background color |
| `dismissible` | `boolean` | Whether users can dismiss (close) the bar |
| `showOnPages` | `string` (options list) | `all`, `homepage-only` |
| `startDate` | `datetime` | Optional: auto-show from this date |
| `endDate` | `datetime` | Optional: auto-hide after this date |

---

## 6. Analytics & Scripts (Group: `analytics`)

Tracking, analytics, and custom script injection.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `googleAnalyticsId` | `string` | No | GA4 measurement ID (e.g. `G-XXXXXXXXXX`) |
| `googleTagManagerId` | `string` | No | GTM container ID (e.g. `GTM-XXXXXXX`) |
| `enableAnalytics` | `boolean` | No | Master toggle to enable/disable all analytics. Default: `true` |
| `hotjarId` | `string` | No | Hotjar site ID |
| `metaPixelId` | `string` | No | Facebook/Meta Pixel ID |
| `linkedinPartnerId` | `string` | No | LinkedIn Insight Tag partner ID |
| `customHeadScripts` | `text` (code) | No | Raw `<script>` tags injected into `<head>`. **Warning label in Studio** |
| `customBodyScripts` | `text` (code) | No | Raw `<script>` tags injected before `</body>`. **Warning label in Studio** |

> **Security Note:** Script injection fields should display a prominent warning in Studio: "Only add trusted scripts. Malicious code can compromise user data."

---

## 7. Compliance & Legal (Group: `compliance`)

NZ financial services regulatory requirements.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `registeredName` | `string` | Yes | Legal registered entity name |
| `nzbn` | `string` | No | NZ Business Number |
| `fspNumber` | `string` | Yes | Financial Service Provider registration number |
| `disputeResolutionScheme` | `object` | Yes | Details of the disputes scheme |
| `regulatoryBody` | `string` | No | e.g. "Regulated by the Financial Markets Authority (FMA)" |
| `copyrightNotice` | `string` | Yes | Footer copyright text. Supports `{year}` placeholder for auto-replacement |
| `privacyPolicyUrl` | `string` | No | URL/slug to privacy policy page |
| `termsUrl` | `string` | No | URL/slug to terms & conditions page |
| `disclosureStatementUrl` | `string` | No | URL/slug to disclosure statement (CCCFA requirement) |
| `complaintsUrl` | `string` | No | URL/slug to complaints process page |
| `accessibilityStatementUrl` | `string` | No | URL/slug to accessibility statement |
| `cookieConsentEnabled` | `boolean` | No | Whether to show cookie consent banner. Default: `true` |
| `cookieConsentMessage` | `text` (2 rows) | No | Custom cookie consent banner text |

**`disputeResolutionScheme` object fields:**

| Field | Type | Notes |
|-------|------|-------|
| `schemeName` | `string` | e.g. "Financial Services Complaints Ltd (FSCL)" |
| `schemeUrl` | `url` | Link to the scheme's website |
| `memberNumber` | `string` | FCU's membership/registration number with the scheme |
| `description` | `text` (2 rows) | Brief description for footer/legal pages |

---

## 8. Appearance (Group: `appearance`)

Global appearance overrides managed from CMS. (Most styling is in code — this is for CMS-controllable toggles only.)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `enableDarkMode` | `boolean` | No | Whether dark mode toggle is available. Default: `false` |
| `headerStyle` | `string` (options list) | No | `transparent`, `solid`, `sticky`. Default: `sticky` |
| `footerStyle` | `string` (options list) | No | `standard`, `minimal`, `expanded`. Default: `standard` |
| `customCss` | `text` (code) | No | Custom CSS injected globally. **Use with caution** |
| `fontPrimary` | `string` | No | Primary font family override (if fonts managed via CMS) |
| `fontSecondary` | `string` | No | Secondary font family override |

> **Note:** Brand colors are maintained in `globals.css` via Tailwind `@theme`, not in Sanity. Only CMS editors who need to override presentation use these fields.

---

## 9. Advanced (Group: `advanced`)

Maintenance mode, error pages, and developer-level settings.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `maintenanceMode` | `boolean` | No | When `true`, show maintenance page to all visitors. Default: `false` |
| `maintenanceMessage` | `text` (3 rows) | No | Custom maintenance mode message |
| `maintenanceAllowedIPs` | `array` of `string` | No | IP addresses that can bypass maintenance mode |
| `custom404Title` | `string` | No | Custom 404 page title. Fallback: "Page Not Found" |
| `custom404Description` | `text` (2 rows) | No | Custom 404 page description |
| `custom500Title` | `string` | No | Custom 500 page title. Fallback: "Something Went Wrong" |
| `custom500Description` | `text` (2 rows) | No | Custom 500 page description |
| `enablePwa` | `boolean` | No | Enable Progressive Web App features. Default: `false` |
| `pwaShortName` | `string` | No | Short name for PWA manifest |
| `pwaThemeColor` | `string` (color) | No | PWA theme color |
| `pwaBackgroundColor` | `string` (color) | No | PWA background color |

---

## Schema.org Organization JSON-LD

The `siteSettings` document should power the **Organization** structured data on every page. Fields map as follows:

```json
{
  "@context": "https://schema.org",
  "@type": "CreditUnion",
  "name": "{siteName}",
  "description": "{siteDescription}",
  "url": "{siteUrl}",
  "logo": "{logo URL}",
  "telephone": "{primaryPhone}",
  "email": "{primaryEmail}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{headOfficeAddress.street}",
    "addressLocality": "{headOfficeAddress.city}",
    "addressRegion": "{headOfficeAddress.region}",
    "postalCode": "{headOfficeAddress.postcode}",
    "addressCountry": "NZ"
  },
  "sameAs": ["{socialLinks[].url}"],
  "openingHoursSpecification": ["{businessHours mapped}"]
}
```

---

## Singleton Implementation Notes

### Sanity Structure (Desk)

```typescript
S.listItem()
  .title('Site Settings')
  .icon(CogIcon)
  .child(
    S.document()
      .schemaType('siteSettings')
      .documentId('siteSettings')
      .title('Site Settings')
  )
```

### GROQ Query

```groq
*[_id == "siteSettings"][0] {
  siteName,
  siteDescription,
  siteUrl,
  logo,
  // ... expand as needed
}
```

### Frontend Consumption (Next.js)

- Fetch once in `layout.tsx` (root layout) and pass via Context or props
- Use in `generateMetadata` for default fallbacks
- Cache with ISR / `next-sanity` live content

### SINGLETONS Array

Add `'siteSettings'` to the existing `SINGLETONS` array in `src/sanity/structure.ts` to prevent it from appearing in the generic document list.

---

## Fields NOT in Sanity (Stays in Code)

These are intentionally kept out of Sanity for performance, security, or architectural reasons:

| Setting | Where | Reason |
|---------|-------|--------|
| Brand colors | `globals.css` (`@theme`) | Design tokens belong in code; rebuild on change is acceptable |
| Font files | `next/font` config | Binary assets, optimized by Next.js |
| API keys / secrets | `.env.local` | Security — never in CMS |
| Base URL | `NEXT_PUBLIC_SITE_URL` env var | Used at build time; CMS `siteUrl` is the canonical version for content |
| Redirects (bulk) | `next.config.ts` or middleware | Performance; CMS-managed redirects are an option via a separate `redirect` document type |
| CSP headers | `next.config.ts` | Security policy managed by developers |

---

## Priority / Phasing

### Phase 1 — MVP (Build Now)
- General: `siteName`, `siteDescription`, `siteUrl`, `logo`, `logoAlt`, `locale`, `currency`
- SEO: `titleTemplate`, `defaultSeoDescription`, `defaultOgImage`, `noIndexSite`, `enableJsonLd`
- Contact: `primaryPhone`, `primaryEmail`, `headOfficeAddress`
- Compliance: `registeredName`, `fspNumber`, `copyrightNotice`, `disputeResolutionScheme`
- Social: `socialLinks`

### Phase 2 — Pre-Launch
- SEO: `googleSiteVerification`, `twitterHandle`, `twitterCardType`
- Analytics: `googleAnalyticsId`, `googleTagManagerId`, `enableAnalytics`
- Announcement: `announcementBar` (full object)
- Compliance: `privacyPolicyUrl`, `termsUrl`, `disclosureStatementUrl`, `cookieConsentEnabled`
- Contact: `businessHours`, `tollFreePhone`
- Advanced: `maintenanceMode`, `maintenanceMessage`

### Phase 3 — Post-Launch Enhancements
- Appearance: `enableDarkMode`, `headerStyle`, `footerStyle`
- Analytics: `hotjarId`, `metaPixelId`, `linkedinPartnerId`
- Advanced: `enablePwa`, custom error page content, `customHeadScripts`, `customBodyScripts`
- SEO: `robotsTxtOverride`, `bingSiteVerification`
- Contact: `postalAddress`, `holidayNotice`

---

## Open Questions

1. **Branch Locations** — Should branches be a separate `branch` document type (array of locations with map coordinates, individual hours, and staff) or embedded in site settings? Recommendation: **Separate document type** (`branch`) with references.

2. **Interest Rates** — Should current interest rates be managed in Sanity? Recommendation: **Separate document type** (`interestRate`) or feed from core banking system via API. Never store in site settings.

3. **Fees & Charges** — Similar to interest rates: **separate document or external feed**.

4. **Multi-language** — If te reo Māori content is needed, the `locale` field may need to expand into a full i18n strategy (see `sanity-localization` rule).

5. **Cookie Consent Granularity** — Do we need category-based consent (analytics, marketing, functional) or a simple accept/decline? This affects the `cookieConsentEnabled` implementation.

6. **PWA** — Is a Progressive Web App planned for the member portal or just the marketing site?
