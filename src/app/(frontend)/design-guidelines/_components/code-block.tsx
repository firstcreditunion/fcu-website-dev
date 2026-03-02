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
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-fcu-primary-400">
          {label}
        </p>
      )}
      <div className="relative overflow-hidden rounded-lg border border-fcu-primary-100 bg-fcu-primary-950">
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-fcu-primary-200">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-md bg-fcu-primary-800 text-fcu-primary-300 opacity-0 transition-all hover:bg-fcu-primary-700 hover:text-white group-hover:opacity-100"
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
        'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-mono text-fcu-primary-500 transition-colors hover:bg-fcu-primary-100 hover:text-fcu-primary-800',
        className
      )}
      aria-label={`Copy ${label || value}`}
    >
      {copied ? (
        <Check className="size-2.5 text-fcu-secondary-600" />
      ) : (
        <Copy className="size-2.5" />
      )}
      {value}
    </button>
  )
}
