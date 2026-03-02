'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  label?: string
  className?: string
}

export function CodeBlock({ code, label, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('group relative', className)}>
      {label && (
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      )}
      <div className="relative overflow-hidden rounded-lg border border-border bg-foreground">
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-background">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-md bg-background/15 text-background/80 opacity-0 transition-all hover:bg-background/25 hover:text-background group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  )
}

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    toast.success(label ? `Copied: ${label}` : 'Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className
      )}
      aria-label={`Copy ${label || value}`}
    >
      {copied ? (
        <Check className="size-2.5 text-fcu-secondary-500" />
      ) : (
        <Copy className="size-2.5" />
      )}
      {value}
    </button>
  )
}
