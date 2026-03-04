import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const nav = await client.fetch<{
      _updatedAt: string
      mainNav: Array<{
        url: string
        megaMenu?: Array<{
          items?: Array<{
            linkType: string
            url?: string
          }>
        }>
      }>
    } | null>(
      `*[_id == "headerNavigation"][0] {
        _updatedAt,
        mainNav[] {
          url,
          megaMenu[] {
            items[] {
              linkType,
              url
            }
          }
        }
      }`,
    )

    if (!nav?.mainNav) return entries

    const seen = new Set<string>(['/'])
    const lastMod = new Date(nav._updatedAt)

    for (const section of nav.mainNav) {
      if (section.url && !seen.has(section.url)) {
        seen.add(section.url)
        entries.push({
          url: new URL(section.url, baseUrl).toString(),
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }

      if (section.megaMenu) {
        for (const group of section.megaMenu) {
          if (!group.items) continue
          for (const link of group.items) {
            if (link.linkType !== 'internal' || !link.url) continue
            if (seen.has(link.url)) continue
            seen.add(link.url)
            entries.push({
              url: new URL(link.url, baseUrl).toString(),
              lastModified: lastMod,
              changeFrequency: 'monthly',
              priority: 0.5,
            })
          }
        }
      }
    }
  } catch {
    // Navigation may not exist yet
  }

  return entries
}
