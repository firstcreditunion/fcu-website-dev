import { urlFor } from '@/sanity/lib/image'

interface SiteSettingsForJsonLd {
  siteName?: string | null
  siteDescription?: string | null
  siteUrl?: string | null
  logo?: { asset?: { _ref: string } } | null
  primaryPhone?: string | null
  primaryEmail?: string | null
  socialLinks?: Array<{ url?: string | null }> | null
  headOfficeAddress?: {
    street?: string | null
    city?: string | null
    region?: string | null
    postcode?: string | null
    country?: string | null
  } | null
  businessHours?: Array<{
    day?: string | null
    openTime?: string | null
    closeTime?: string | null
    isClosed?: boolean | null
  }> | null
}

type JsonLdObject = Record<string, unknown>

export function JsonLd({ data }: { data: JsonLdObject }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const DAY_MAP: Record<string, string> = {
  Monday: 'https://schema.org/Monday',
  Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday',
  Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
}

function mapBusinessHours(hours: SiteSettingsForJsonLd['businessHours']) {
  if (!hours?.length) return undefined

  return hours
    .filter((h) => !h.isClosed && h.openTime && h.closeTime && DAY_MAP[h.day ?? ''])
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_MAP[h.day!],
      opens: h.openTime!,
      closes: h.closeTime!,
    }))
}

export function generateOrganizationSchema(
  settings: SiteSettingsForJsonLd,
): JsonLdObject {
  const logoUrl = settings.logo
    ? urlFor(settings.logo).width(600).url()
    : undefined

  const sameAs = settings.socialLinks
    ?.map((link) => link.url)
    .filter((url): url is string => Boolean(url))

  const addr = settings.headOfficeAddress

  const schema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'BankOrCreditUnion',
    name: settings.siteName ?? undefined,
    description: settings.siteDescription ?? undefined,
    url: settings.siteUrl ?? undefined,
    logo: logoUrl,
    telephone: settings.primaryPhone ?? undefined,
    email: settings.primaryEmail ?? undefined,
    ...(sameAs?.length ? { sameAs } : {}),
  }

  if (addr) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: addr.street ?? undefined,
      addressLocality: addr.city ?? undefined,
      addressRegion: addr.region ?? undefined,
      postalCode: addr.postcode ?? undefined,
      addressCountry: addr.country ?? 'NZ',
    }
  }

  const hours = mapBusinessHours(settings.businessHours)
  if (hours?.length) {
    schema.openingHoursSpecification = hours
  }

  return schema
}
