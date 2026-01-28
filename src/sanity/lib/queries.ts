/**
 * PLACEHOLDER QUERIES - Delete and replace with production queries
 *
 * All queries should use defineQuery() for TypeGen support.
 * Query names determine generated type names (e.g., HOMEPAGE_QUERY → HOMEPAGE_QUERYResult)
 */

import { defineQuery } from 'next-sanity'

/**
 * Homepage query - fetches the singleton homepage document by fixed ID
 * Using _id query is more efficient than _type for singletons
 */
export const HOMEPAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "homePage"][0] {
    title,
    subtitle,
    ctaText,
    ctaLink
  }
`)
