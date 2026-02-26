import { defineQuery } from 'next-sanity'

export const HEADER_NAVIGATION_QUERY = defineQuery(/* groq */ `
  *[_id == "headerNavigation"][0] {
    mainNav[] {
      _key,
      label,
      url,
      megaMenu[] {
        _key,
        title,
        items[] {
          _key,
          label,
          linkType,
          url,
          externalUrl,
          openInNewTab
        }
      }
    },
    utilityNav {
      primaryAction {
        label,
        url
      },
      secondaryAction {
        label,
        url
      },
      showSearch
    }
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0] {
    siteName,
    siteTagline,
    siteDescription,
    siteUrl,
    logo,
    logoAlt,
    titleTemplate,
    defaultSeoTitle,
    defaultSeoDescription,
    defaultOgImage,
    twitterHandle,
    twitterCardType,
    googleSiteVerification,
    bingSiteVerification,
    noIndexSite,
    enableJsonLd,
    enableAnalytics,
    googleAnalyticsId,
    googleTagManagerId,
    socialLinks[] { _key, platform, url, label },
    primaryPhone,
    tollFreePhone,
    primaryEmail,
    headOfficeAddress,
    postalAddress,
    businessHours[] { _key, day, openTime, closeTime, isClosed },
    holidayNotice,
    announcementBar,
    registeredName,
    nzbn,
    fspNumber,
    copyrightNotice,
    disputeResolutionScheme,
    regulatoryBody,
    privacyPolicyUrl,
    termsUrl,
    disclosureStatementUrl,
    complaintsUrl,
    accessibilityStatementUrl,
    cookieConsentEnabled,
    cookieConsentMessage,
    locale,
    maintenanceMode,
    maintenanceMessage,
    headerStyle,
    footerStyle
  }
`)
