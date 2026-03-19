'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID

export function IntercomProvider() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.Intercom) {
      window.Intercom('update')
    }
  }, [pathname])

  useEffect(() => {
    return () => {
      if (window.Intercom) {
        window.Intercom('shutdown')
      }
    }
  }, [])

  if (!APP_ID) return null

  return (
    <Script
      id='intercom-widget'
      strategy='afterInteractive'
      src={`https://widget.intercom.io/widget/${APP_ID}`}
      onLoad={() => {
        window.Intercom('boot', { app_id: APP_ID })
      }}
    />
  )
}
