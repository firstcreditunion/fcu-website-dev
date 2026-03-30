import { Suspense } from 'react'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { DisableDraftMode } from '@/components/disable-draft-mode'

import { SanityLive } from '@/sanity/lib/live'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import { IntercomProvider } from '@/components/intercom-provider'

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='bg-white min-h-screen'>
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
      <SanityLive />
      <Suspense fallback={null}>
        <IntercomProvider />
      </Suspense>
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </section>
  )
}
