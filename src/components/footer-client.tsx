'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ArrowRight,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'
import type {
  FOOTER_NAVIGATION_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from '@/sanity/types'
import { ShieldedBadge } from '@/components/shielded-badge'

type FooterLink = {
  _key: string
  label: string
  linkType: 'internal' | 'external'
  url: string | null
  externalUrl: string | null
  openInNewTab: boolean | null
}

function FooterLinkItem({ link }: { link: FooterLink }) {
  const href = link.linkType === 'external' ? link.externalUrl : link.url
  if (!href) return null

  const isExternal = link.linkType === 'external'
  const target = link.openInNewTab || isExternal ? '_blank' : undefined
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined

  return (
    <li>
      <Link
        href={href}
        target={target}
        rel={rel}
        className='text-sm tracking-tight text-white/90 transition-colors hover:text-white'
      >
        {link.label}
      </Link>
    </li>
  )
}

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export function FooterClient({
  footerData,
  settingsData,
}: {
  footerData: FOOTER_NAVIGATION_QUERY_RESULT
  settingsData: SITE_SETTINGS_QUERY_RESULT
}) {
  if (!footerData || !settingsData) return null

  const copyrightText = settingsData.copyrightNotice
    ? settingsData.copyrightNotice.replace(
        '{year}',
        new Date().getFullYear().toString(),
      )
    : `\u00A9 ${new Date().getFullYear()} First Credit Union. All rights reserved.`

  const legalLinks = [
    settingsData.privacyPolicyUrl && {
      label: 'Privacy Policy',
      href: settingsData.privacyPolicyUrl,
    },
    settingsData.termsUrl && {
      label: 'Terms & Conditions',
      href: settingsData.termsUrl,
    },
    settingsData.disclosureStatementUrl && {
      label: 'Disclosure',
      href: settingsData.disclosureStatementUrl,
    },
    settingsData.complaintsUrl && {
      label: 'Complaints',
      href: settingsData.complaintsUrl,
    },
    settingsData.accessibilityStatementUrl && {
      label: 'Accessibility',
      href: settingsData.accessibilityStatementUrl,
    },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <footer className='w-full rounded-t-4xl bg-linear-to-b from-fcu-primary-800 to-fcu-primary-950'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Headline */}
        <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div variants={itemVariants} className='py-12 md:py-16'>
            <h2 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl'>
              {footerData.headline}
            </h2>
            {footerData.subheadline && (
              <p className='mt-3 text-lg text-white/60 md:text-xl'>
                {footerData.subheadline}
              </p>
            )}
            <Link
              href='/join'
              className='mt-6 inline-flex items-center gap-2 rounded-full bg-fcu-secondary-500 px-7 py-3 text-sm font-semibold text-fcu-primary-950 transition-colors hover:bg-fcu-secondary-400'
            >
              Become a Member
              <ArrowRight className='size-4' aria-hidden='true' />
            </Link>
          </motion.div>
        </div>

        {/* Two-column layout with borders */}
        <div className='border-y border-white/10'>
          <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
            <motion.div
              variants={itemVariants}
              className='grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.5fr]'
            >
              {/* Left column — Newsletter + App Store */}
              <div className='border-b border-white/10 py-8 lg:border-b-0 lg:border-r lg:py-10 lg:pr-10'>
                {footerData.newsletterCta && (
                  <div>
                    {footerData.newsletterCta.heading && (
                      <h3 className='mb-4 text-xl font-semibold tracking-tight text-fcu-secondary-500 sm:text-2xl'>
                        {footerData.newsletterCta.heading}
                      </h3>
                    )}
                    {footerData.newsletterCta.description && (
                      <p className='mb-5 text-sm leading-relaxed text-white/90'>
                        {footerData.newsletterCta.description}
                      </p>
                    )}

                    <div className='mb-4 flex'>
                      <input
                        type='email'
                        placeholder={
                          footerData.newsletterCta.placeholder ||
                          'Enter your email address'
                        }
                        className='flex-1 rounded-l-full border border-r-0 border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/40 focus:border-fcu-secondary-500/50 focus:outline-none focus:ring-1 focus:ring-fcu-secondary-500/50'
                      />
                      <button
                        type='button'
                        className='flex items-center justify-center rounded-r-full border border-white/20 bg-white/10 px-5 transition-colors hover:bg-white/20'
                        aria-label={
                          footerData.newsletterCta.buttonLabel || 'Subscribe'
                        }
                      >
                        <ArrowRight
                          className='size-5 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>

                    {footerData.newsletterCta.disclaimer && (
                      <p className='text-xs leading-relaxed text-white/40'>
                        {footerData.newsletterCta.disclaimer}
                      </p>
                    )}
                  </div>
                )}

                {/* App Store links */}
                {footerData.appStoreLinks &&
                  (footerData.appStoreLinks.iosUrl ||
                    footerData.appStoreLinks.androidUrl) && (
                    <div className='mt-8 flex flex-wrap items-center gap-3'>
                      {footerData.appStoreLinks.iosUrl && (
                        <a
                          href={footerData.appStoreLinks.iosUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-block overflow-hidden rounded-xl transition-opacity hover:opacity-80'
                        >
                          <Image
                            src='/badges/app-store-badge.svg'
                            alt='Download on the App Store'
                            width={135}
                            height={40}
                            className='h-10 w-auto'
                          />
                        </a>
                      )}
                      {footerData.appStoreLinks.androidUrl && (
                        <a
                          href={footerData.appStoreLinks.androidUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-block overflow-hidden rounded-xl transition-opacity hover:opacity-80'
                        >
                          <Image
                            src='/badges/google-play-badge.svg'
                            alt='Get it on Google Play'
                            width={135}
                            height={40}
                            className='h-10 w-auto'
                          />
                        </a>
                      )}
                    </div>
                  )}
              </div>

              {/* Right column — Nav columns + Contact */}
              <div className='py-8 lg:py-10 lg:pl-10'>
                <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4'>
                  {footerData.columns?.map((column) => (
                    <div key={column._key}>
                      <h4 className='mb-4 text-xs font-semibold uppercase tracking-wider text-fcu-secondary-500'>
                        {column.title}
                      </h4>
                      <ul className='space-y-3'>
                        {column.links?.map((link) => (
                          <FooterLinkItem key={link._key} link={link} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact info — full-width row */}
        {footerData.showContactInfo && (
          <div className='border-b border-white/10'>
            <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
              <motion.div
                variants={itemVariants}
                className='flex flex-wrap items-center gap-x-10 gap-y-3 py-5'
              >
                {settingsData.primaryPhone && (
                  <a
                    href={`tel:${settingsData.primaryPhone.replace(/\s/g, '')}`}
                    className='inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white'
                  >
                    <Phone className='size-4' aria-hidden='true' />
                    <span className='font-mono'>
                      {settingsData.primaryPhone}
                    </span>
                  </a>
                )}
                {settingsData.primaryEmail && (
                  <a
                    href={`mailto:${settingsData.primaryEmail}`}
                    className='inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white'
                  >
                    <Mail className='size-4' aria-hidden='true' />
                    {settingsData.primaryEmail}
                  </a>
                )}
                {settingsData.headOfficeAddress && (
                  <a
                    href={settingsData.googleMapsUrl || '#'}
                    target={settingsData.googleMapsUrl ? '_blank' : undefined}
                    rel={
                      settingsData.googleMapsUrl
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className='inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white'
                  >
                    <MapPin className='size-4 shrink-0' aria-hidden='true' />
                    {[
                      (
                        settingsData.headOfficeAddress as Record<
                          string,
                          string
                        >
                      )?.street,
                      (
                        settingsData.headOfficeAddress as Record<
                          string,
                          string
                        >
                      )?.city,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Legal links row */}
        {(legalLinks.length > 0 ||
          (footerData.legalLinks && footerData.legalLinks.length > 0)) && (
          <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
            <motion.div
              variants={itemVariants}
              className='flex flex-wrap items-center gap-x-6 gap-y-2 py-5'
            >
              <div className='flex flex-1 flex-wrap items-center gap-x-6 gap-y-2'>
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className='text-xs text-white/50 transition-colors hover:text-white'
                  >
                    {link.label}
                  </Link>
                ))}
                {footerData.legalLinks?.map((link) => {
                  const href =
                    link.linkType === 'external' ? link.externalUrl : link.url
                  if (!href) return null
                  return (
                    <Link
                      key={link._key}
                      href={href}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={
                        link.openInNewTab ? 'noopener noreferrer' : undefined
                      }
                      className='text-xs text-white/50 transition-colors hover:text-white'
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
              <button
                type='button'
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                className='inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white'
                aria-label='Back to top'
              >
                Back to top
                <ArrowUp className='size-3' aria-hidden='true' />
              </button>
            </motion.div>
          </div>
        )}

        {/* Bottom bar */}
        <div className='bg-fcu-secondary-500'>
          <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
            <motion.div
              variants={itemVariants}
              className='grid grid-cols-1 items-center gap-5 py-6 md:grid-cols-3 md:gap-4'
            >
              {/* Logo + Copyright */}
              <div className='text-center md:text-left'>
                <Link
                  href='/'
                  className='inline-block'
                  aria-label='First Credit Union home'
                >
                  <span className='text-lg font-bold tracking-tight text-fcu-primary-950'>
                    First Credit Union
                  </span>
                </Link>
                <p className='mt-1 text-xs font-medium tracking-tight text-fcu-primary-950/60'>
                  {copyrightText}
                </p>
              </div>

              {/* Shielded badge — dead centre */}
              <div className='flex justify-center'>
                <ShieldedBadge />
              </div>

              {/* Social icons */}
              <div className='flex justify-center md:justify-end'>
                {footerData.showSocialLinks &&
                  settingsData.socialLinks &&
                  settingsData.socialLinks.length > 0 && (
                    <nav
                      aria-label='Social media'
                      className='flex items-center gap-4'
                    >
                      {settingsData.socialLinks.map((social) => {
                        const Icon = SOCIAL_ICONS[social.platform || '']
                        if (!Icon || !social.url) return null
                        return (
                          <a
                            key={social._key}
                            href={social.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={
                              social.label || `Follow us on ${social.platform}`
                            }
                            className='text-fcu-primary-950/60 transition-colors hover:text-fcu-primary-950'
                          >
                            <Icon className='size-5' />
                          </a>
                        )
                      })}
                    </nav>
                  )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
