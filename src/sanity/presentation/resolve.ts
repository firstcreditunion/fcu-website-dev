import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    loanProductPage: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Loan Product Page',
            href: `/${doc?.slug}`,
          },
        ],
      }),
    }),
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/posts/${doc?.slug}`,
          },
          { title: 'Posts index', href: `/posts` },
        ],
      }),
    }),
  },
}
