import { client } from '@/sanity/lib/client'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET() {
  let siteName = 'First Credit Union'
  let siteDescription = 'New Zealand credit union providing personal banking, loans, and savings.'

  try {
    const settings = await client.fetch<{
      siteName: string | null
      siteDescription: string | null
    }>(`*[_id == "siteSettings"][0] { siteName, siteDescription }`)

    if (settings?.siteName) siteName = settings.siteName
    if (settings?.siteDescription) siteDescription = settings.siteDescription
  } catch {
    // Use defaults
  }

  const content = `# ${siteName}

> ${siteDescription}

${siteName} is a member-owned financial cooperative based in Hamilton, New Zealand. We provide banking services, loans, savings accounts, and insurance to our members.

## Main Sections

- [Home](${baseUrl}/): Homepage
- [Personal Banking](${baseUrl}/personal-banking): Personal banking products and services
- [Loans](${baseUrl}/loans): Loan products including personal, home, and vehicle loans
- [Savings & Investments](${baseUrl}/savings-investments): Savings accounts and investment options
- [Insurance](${baseUrl}/insurance): Insurance products for members
- [About Us](${baseUrl}/about-us): About First Credit Union
- [Contact](${baseUrl}/contact-us): Contact information and branch locations

## Member Services

- [Internet Banking](${baseUrl}/ways-to-bank/internet-banking): Online banking services
- [Mobile App](${baseUrl}/ways-to-bank/mobile-app): Mobile banking application
- [Calculators](${baseUrl}/tools-resources/calculators): Financial calculators
- [FAQs](${baseUrl}/tools-resources/faqs): Frequently asked questions

## Optional

- [Careers](${baseUrl}/about-us/careers): Work with us
- [Community](${baseUrl}/about-us/community): Community involvement
- [News](${baseUrl}/about-us/news-media): Latest news and updates
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
}
