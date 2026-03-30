'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

const SCROLL_SHOW_THRESHOLD_PX = 400

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_SHOW_THRESHOLD_PX)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [])

  if (!visible) return null

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className='fixed bottom-5 right-[calc(4.5rem+env(safe-area-inset-right,0px))] z-2147483646 flex size-12 shrink-0 items-center justify-center rounded-full bg-fcu-primary-800 text-white shadow-md transition-[transform,background-color,box-shadow] hover:bg-fcu-primary-900 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fcu-secondary-400 active:scale-[0.97] mr-2'
      aria-label='Scroll to top'
    >
      <ChevronUp className='size-6' strokeWidth={2.5} aria-hidden='true' />
    </button>
  )
}
