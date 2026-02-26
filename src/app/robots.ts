import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function robots(): Promise<MetadataRoute.Robots> {
  let override: string | null = null

  try {
    const settings = await client.fetch<{ robotsTxtOverride: string | null }>(
      `*[_id == "siteSettings"][0] { robotsTxtOverride }`,
    )
    override = settings?.robotsTxtOverride ?? null
  } catch {
    // Settings may not exist yet
  }

  if (override) {
    return {
      rules: { userAgent: '*', allow: '/' },
      host: baseUrl,
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
      // Standard search engines
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      // OpenAI
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      // Anthropic (Claude)
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      // Google AI (Gemini)
      { userAgent: 'Google-Extended', allow: '/' },
      // Meta AI
      { userAgent: 'FacebookBot', allow: '/' },
      // Common Crawl
      { userAgent: 'CCBot', allow: '/' },
      // Apple
      { userAgent: 'Applebot', allow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
