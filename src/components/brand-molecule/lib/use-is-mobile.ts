// src/components/brand-molecule/lib/use-is-mobile.ts
'use client'

import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 639px)'
const DESKTOP_QUERY = '(min-width: 1024px)'

/**
 * SSR-safe viewport check: returns `false` on the server and first client render,
 * then updates on mount via `matchMedia` with a listener. `false`-on-server keeps
 * server markup and first client paint identical (no hydration mismatch).
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}

/** True below the mobile breakpoint (≤639px). SSR-safe (false until mounted). */
export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY)
}

/** True at or above the desktop breakpoint (≥1024px). SSR-safe (false until mounted). */
export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_QUERY)
}
