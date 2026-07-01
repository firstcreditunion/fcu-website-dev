// src/components/header/nav-top-item.tsx
// First-level nav trigger per Figma "Navbar / Top Item" (node 256:42).
// States: Default · Hover = soft pill (surface-sunken, VISUAL ONLY) ·
// Open = outlined box (border-strong) + flipped caret.
//
// HARD RULE: the panel opens/closes on CLICK only. This component renders a
// <button> whose ONLY panel-affecting handler is onClick — no mouseenter /
// mouseleave / focus handlers may ever toggle the panel.
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const baseClasses =
  'relative inline-flex h-10 items-center gap-1.5 rounded-lg border border-transparent px-3 text-sm font-medium text-foreground transition-colors'

function ActiveUnderline() {
  // Active-page indicator (Figma option 2.2a): 2.5px primary bar inside the item.
  return (
    <span
      aria-hidden='true'
      className='absolute inset-x-3 bottom-0 h-[2.5px] rounded-full bg-primary'
      data-slot='active-underline'
    />
  )
}

export function NavTopItem({
  label,
  href,
  hasPanel,
  isOpen = false,
  isActive = false,
  panelId,
  onToggle,
}: {
  label: string
  href?: string | null
  hasPanel: boolean
  isOpen?: boolean
  isActive?: boolean
  panelId?: string
  onToggle?: () => void
}) {
  if (!hasPanel) {
    return (
      <Link
        href={href ?? '#'}
        className={cn(baseClasses, 'hover:bg-surface-sunken')}
        data-slot='nav-top-item'
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
        {isActive && <ActiveUnderline />}
      </Link>
    )
  }

  return (
    <button
      type='button'
      className={cn(
        baseClasses,
        isOpen
          ? 'border-border-strong'
          : 'hover:bg-surface-sunken',
      )}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-haspopup='true'
      aria-controls={panelId}
      data-slot='nav-top-item'
      data-open={isOpen || undefined}
    >
      {label}
      <ChevronDown
        className={cn(
          'size-3.5 transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
        aria-hidden='true'
      />
      {isActive && <ActiveUnderline />}
    </button>
  )
}
