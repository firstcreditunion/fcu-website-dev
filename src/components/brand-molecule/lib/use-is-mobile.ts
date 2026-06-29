// src/components/brand-molecule/lib/use-is-mobile.ts
'use client'

import { useEffect, useState } from 'react'

const QUERY = '(max-width: 639px)'

/**
 * SSR-safe viewport check: returns `false` on the server and first client render,
 * then updates on mount via `matchMedia('(max-width: 639px)')` with a listener.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  return isMobile
}
