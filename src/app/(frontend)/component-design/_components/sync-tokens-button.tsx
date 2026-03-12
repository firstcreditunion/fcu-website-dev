'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, Loader2, Check, AlertCircle } from 'lucide-react'
import { syncTokens } from '../_actions/sync-tokens'

type Status = 'idle' | 'syncing' | 'success' | 'error'

export function SyncTokensButton({
  lastSyncedAt,
}: {
  lastSyncedAt?: string | null
}) {
  const [status, setStatus] = React.useState<Status>('idle')
  const [message, setMessage] = React.useState('')

  async function handleSync() {
    setStatus('syncing')
    const result = await syncTokens()
    if (result.success) {
      setStatus('success')
      setMessage(result.message)
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
      setMessage(result.message)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div className='flex items-center gap-3'>
      <Button
        variant='outline'
        size='sm'
        onClick={handleSync}
        disabled={status === 'syncing'}
      >
        {status === 'syncing' && <Loader2 className='size-3.5 animate-spin' />}
        {status === 'success' && <Check className='size-3.5' />}
        {status === 'error' && <AlertCircle className='size-3.5' />}
        {status === 'idle' && <RefreshCw className='size-3.5' />}
        {status === 'syncing' ? 'Syncing...' : 'Sync Tokens from CSS'}
      </Button>

      {status !== 'idle' && (
        <span
          className={`text-xs ${status === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}
        >
          {message}
        </span>
      )}

      {status === 'idle' && lastSyncedAt && (
        <span className='text-[10px] text-muted-foreground'>
          Last synced:{' '}
          {new Date(lastSyncedAt).toLocaleDateString('en-NZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      )}
    </div>
  )
}
