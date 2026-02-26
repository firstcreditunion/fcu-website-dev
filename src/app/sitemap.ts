import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const dynamicPages = await client.fetch<
      { href: string; _updatedAt: string }[]
    >(
      `*[_type in ["page", "post"] && defined(slug.current) && !(seo.noIndex == true)] {
        "href": select(
          _type == "page" => "/" + slug.current,
          _type == "post" => "/blog/" + slug.current,
          "/" + slug.current
        ),
        _updatedAt
      }`,
    )

    if (dynamicPages?.length) {
      return [
        ...staticPages,
        ...dynamicPages.map((page) => ({
          url: new URL(page.href, baseUrl).toString(),
          lastModified: new Date(page._updatedAt),
        })),
      ]
    }
  } catch {
    // Sanity may not have these content types yet
  }

  return staticPages
}
