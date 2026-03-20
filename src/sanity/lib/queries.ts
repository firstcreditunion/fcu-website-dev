import { defineQuery } from 'next-sanity'

export const DESIGN_TOKENS_QUERY = defineQuery(/* groq */ `
  *[_id == "designTokens"][0] {
    lastSyncedAt,
    palettes[] {
      _key,
      paletteName,
      tokens[] {
        _key,
        name,
        cssVariable,
        oklch,
        hex,
        rgb
      }
    }
  }
`)

export const ALL_COMPONENT_CONFIGS_QUERY = defineQuery(/* groq */ `
  *[_type == "componentConfig"] | order(displayName asc) {
    _id,
    componentName,
    displayName,
    category,
    approvedVariants,
    disabledVariants,
    approvedSizes,
    defaultVariant,
    defaultSize,
    variantGuidelines[] {
      _key,
      variant,
      colorToken,
      usageNote
    },
    componentSpecificConfig,
    previewConfig
  }
`)

export const COMPONENT_CONFIG_QUERY = defineQuery(/* groq */ `
  *[_type == "componentConfig" && componentName == $componentName][0] {
    _id,
    componentName,
    displayName,
    category,
    approvedVariants,
    disabledVariants,
    approvedSizes,
    defaultVariant,
    defaultSize,
    variantGuidelines[] {
      _key,
      variant,
      colorToken,
      usageNote
    },
    componentSpecificConfig,
    previewConfig
  }
`)

export const HEADER_NAVIGATION_QUERY = defineQuery(/* groq */ `
  *[_id == "headerNavigation"][0] {
    mainNav[] {
      _key,
      label,
      url,
      featuredPosition,
      megaMenu[] {
        _key,
        title,
        isFeatured,
        items[] {
          _key,
          label,
          description,
          image {
            asset-> {
              _id,
              url,
              metadata {
                lqip,
                dimensions { width, height }
              }
            },
            hotspot,
            crop,
            alt
          },
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

export const FOOTER_NAVIGATION_QUERY = defineQuery(/* groq */ `
  *[_id == "footerNavigation"][0] {
    headline,
    subheadline,
    columns[] {
      _key,
      title,
      links[] {
        _key,
        label,
        linkType,
        url,
        externalUrl,
        openInNewTab
      }
    },
    newsletterCta {
      heading,
      description,
      placeholder,
      buttonLabel,
      disclaimer
    },
    appStoreLinks {
      iosUrl,
      androidUrl
    },
    showSocialLinks,
    showContactInfo,
    legalLinks[] {
      _key,
      label,
      linkType,
      url,
      externalUrl,
      openInNewTab
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
