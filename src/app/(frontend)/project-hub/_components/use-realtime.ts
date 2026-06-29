'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null
function supabaseBrowser(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Publishable key (sb_publishable_…) — the modern, browser-safe replacement for
  // the legacy anon JWT. Used only to join the public broadcast channel.
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) return null
  if (!browserClient) browserClient = createClient(url, key, { auth: { persistSession: false } })
  return browserClient
}

export function useHubRealtime(projectId: string, onChange: () => void) {
  const [viewers, setViewers] = useState(1)
  const [live, setLive] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cb = useRef(onChange)

  useEffect(() => {
    cb.current = onChange
  }, [onChange])

  useEffect(() => {
    const sb = supabaseBrowser()
    if (!sb) return
    const channel = sb.channel(`pt:${projectId}`, {
      config: { presence: { key: crypto.randomUUID() } },
    })
    channel
      .on('broadcast', { event: 'change' }, () => {
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => cb.current(), 500)
      })
      .on('presence', { event: 'sync' }, () => {
        setViewers(Math.max(1, Object.keys(channel.presenceState()).length))
      })
      .subscribe((status) => {
        setLive(status === 'SUBSCRIBED')
        if (status === 'SUBSCRIBED') {
          void channel.track({}) // anonymous: no identity on the public channel
          cb.current() // refetch once on (re)join to cover missed pings
        }
      })
    return () => {
      if (timer.current) clearTimeout(timer.current)
      void sb.removeChannel(channel)
    }
  }, [projectId])

  return { viewers, live }
}
