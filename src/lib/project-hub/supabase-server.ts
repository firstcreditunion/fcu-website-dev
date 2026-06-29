import 'server-only'
import { createClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = ReturnType<typeof createClient<any, any, any>>

let client: AnyClient | null = null

export function supabaseAdmin(): AnyClient {
  if (!client) {
    const url = process.env.SUPABASE_URL
    // Secret key (sb_secret_…) — the modern replacement for the legacy service_role
    // JWT. Full access, bypasses RLS; server-only (this module is `import 'server-only'`).
    const key = process.env.SUPABASE_SECRET_KEY
    if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SECRET_KEY not set')
    client = createClient(url, key, {
      db: { schema: 'api' },
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return client
}
