'use client'

import * as React from 'react'
import { SectionWrapper, Subsection } from './section-wrapper'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Globe,
  Heart,
  HelpCircle,
  Home,
  Info,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Sun,
  Trash2,
  TrendingUp,
  TrendingDown,
  Upload,
  User,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'

interface IconEntry {
  name: string
  icon: LucideIcon
  category: string
}

const ICONS: IconEntry[] = [
  // Navigation
  { name: 'ArrowLeft', icon: ArrowLeft, category: 'Navigation' },
  { name: 'ArrowRight', icon: ArrowRight, category: 'Navigation' },
  { name: 'ArrowUp', icon: ArrowUp, category: 'Navigation' },
  { name: 'ArrowDown', icon: ArrowDown, category: 'Navigation' },
  { name: 'ChevronDown', icon: ChevronDown, category: 'Navigation' },
  { name: 'ChevronLeft', icon: ChevronLeft, category: 'Navigation' },
  { name: 'ChevronRight', icon: ChevronRight, category: 'Navigation' },
  { name: 'ChevronUp', icon: ChevronUp, category: 'Navigation' },
  { name: 'ExternalLink', icon: ExternalLink, category: 'Navigation' },
  { name: 'Home', icon: Home, category: 'Navigation' },
  { name: 'Menu', icon: Menu, category: 'Navigation' },

  // Actions
  { name: 'Check', icon: Check, category: 'Actions' },
  { name: 'Copy', icon: Copy, category: 'Actions' },
  { name: 'Download', icon: Download, category: 'Actions' },
  { name: 'Filter', icon: Filter, category: 'Actions' },
  { name: 'LogOut', icon: LogOut, category: 'Actions' },
  { name: 'Minus', icon: Minus, category: 'Actions' },
  { name: 'MoreHorizontal', icon: MoreHorizontal, category: 'Actions' },
  { name: 'Pencil', icon: Pencil, category: 'Actions' },
  { name: 'Plus', icon: Plus, category: 'Actions' },
  { name: 'Search', icon: Search, category: 'Actions' },
  { name: 'Settings', icon: Settings, category: 'Actions' },
  { name: 'Trash2', icon: Trash2, category: 'Actions' },
  { name: 'Upload', icon: Upload, category: 'Actions' },
  { name: 'X', icon: X, category: 'Actions' },

  // Status
  { name: 'CircleAlert', icon: CircleAlert, category: 'Status' },
  { name: 'CircleCheck', icon: CircleCheck, category: 'Status' },
  { name: 'CircleX', icon: CircleX, category: 'Status' },
  { name: 'HelpCircle', icon: HelpCircle, category: 'Status' },
  { name: 'Info', icon: Info, category: 'Status' },
  { name: 'Loader2', icon: Loader2, category: 'Status' },

  // Financial
  { name: 'CreditCard', icon: CreditCard, category: 'Financial' },
  { name: 'DollarSign', icon: DollarSign, category: 'Financial' },
  { name: 'TrendingUp', icon: TrendingUp, category: 'Financial' },
  { name: 'TrendingDown', icon: TrendingDown, category: 'Financial' },
  { name: 'Shield', icon: Shield, category: 'Financial' },
  { name: 'Lock', icon: Lock, category: 'Financial' },

  // Content
  { name: 'FileText', icon: FileText, category: 'Content' },
  { name: 'Globe', icon: Globe, category: 'Content' },
  { name: 'Heart', icon: Heart, category: 'Content' },
  { name: 'Mail', icon: Mail, category: 'Content' },
  { name: 'MapPin', icon: MapPin, category: 'Content' },
  { name: 'Phone', icon: Phone, category: 'Content' },
  { name: 'Star', icon: Star, category: 'Content' },

  // User
  { name: 'Eye', icon: Eye, category: 'User' },
  { name: 'EyeOff', icon: EyeOff, category: 'User' },
  { name: 'User', icon: User, category: 'User' },
  { name: 'Users', icon: Users, category: 'User' },

  // Theme
  { name: 'Clock', icon: Clock, category: 'Theme' },
  { name: 'Moon', icon: Moon, category: 'Theme' },
  { name: 'Sun', icon: Sun, category: 'Theme' },
]

const SIZES = [
  { label: '16px', className: 'size-4', size: 16 },
  { label: '20px', className: 'size-5', size: 20 },
  { label: '24px', className: 'size-6', size: 24 },
  { label: '32px', className: 'size-8', size: 32 },
  { label: '48px', className: 'size-12', size: 48 },
] as const

const CATEGORIES = [...new Set(ICONS.map((i) => i.category))]

export function IconSection() {
  const [search, setSearch] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null,
  )
  const [previewSize, setPreviewSize] = React.useState(24)

  const filtered = ICONS.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !activeCategory || i.category === activeCategory
    return matchesSearch && matchesCategory
  })

  function handleCopy(name: string) {
    navigator.clipboard.writeText(`import { ${name} } from 'lucide-react'`)
    toast.success(`Copied import for ${name}`)
  }

  return (
    <SectionWrapper
      id='iconography'
      title='Iconography'
      description='Lucide React is our icon library — open source, consistent stroke width, pixel-aligned. All icons inherit currentColor for seamless theming.'
    >
      <Subsection title='Icon Sizes'>
        <div className='flex flex-wrap items-end gap-8 rounded-2xl border border-border bg-card p-8'>
          {SIZES.map((s) => (
            <div key={s.size} className='text-center'>
              <div className='mb-2 flex items-center justify-center'>
                <Search className='text-foreground/80' style={{ width: s.size, height: s.size }} />
              </div>
              <p className='text-xs font-bold tabular-nums text-foreground'>
                {s.label}
              </p>
              <p className='text-[10px] text-muted-foreground'>{s.className}</p>
            </div>
          ))}
        </div>
      </Subsection>

      <Subsection
        title='Icon Library'
        description='Click any icon to copy its import statement. Filter by name or category.'
      >
        <div className='mb-4 flex flex-wrap items-center gap-3'>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search icons...'
            className='max-w-xs border-border text-sm'
          />

          <div className='flex flex-wrap gap-1.5'>
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'rounded-full px-3 py-1 text-[10px] font-medium transition-colors',
                !activeCategory
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground',
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={cn(
                  'rounded-full px-3 py-1 text-[10px] font-medium transition-colors',
                  activeCategory === cat
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className='ml-auto flex items-center gap-2'>
            <span className='text-[10px] text-muted-foreground'>Size:</span>
            {SIZES.filter((s) => [16, 24, 32].includes(s.size)).map((s) => (
              <button
                key={s.size}
                onClick={() => setPreviewSize(s.size)}
                className={cn(
                  'rounded px-2 py-0.5 text-[10px] font-medium transition-colors',
                  previewSize === s.size
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className='flex h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30'>
            <p className='text-sm text-muted-foreground'>
              No icons match &ldquo;{search}&rdquo;
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10'>
            {filtered.map((entry) => {
              const Icon = entry.icon
              return (
                <button
                  key={entry.name}
                  onClick={() => handleCopy(entry.name)}
                  className='group flex flex-col items-center gap-2 rounded-xl border border-transparent p-3 transition-all hover:border-border hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring'
                  title={`${entry.name} (${entry.category})`}
                >
                  <Icon
                    className='text-foreground/75 transition-colors group-hover:text-foreground'
                    style={{ width: previewSize, height: previewSize }}
                  />
                  <span className='max-w-full truncate text-[9px] text-muted-foreground group-hover:text-foreground/80'>
                    {entry.name}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        <div className='mt-4 flex items-center gap-2'>
          <Badge variant='outline' className='text-[10px]'>
            {filtered.length} icons shown
          </Badge>
          <Badge variant='outline' className='text-[10px]'>
            {ICONS.length} total
          </Badge>
        </div>
      </Subsection>

      <Subsection title='Usage Rules'>
        <div className='grid gap-4 sm:grid-cols-2'>
          {[
            {
              title: 'Colour',
              rule: 'Always use currentColor (inherited from text colour)',
              code: '<Search className="text-foreground" />',
            },
            {
              title: 'Touch Target',
              rule: 'Minimum 44×44px clickable area, even for small icons',
              code: '<button className="p-2"><Search className="size-5" /></button>',
            },
            {
              title: 'Accessibility',
              rule: 'aria-label for standalone, aria-hidden for decorative',
              code: '<Search aria-hidden="true" />',
            },
            {
              title: 'Consistency',
              rule: "Use the same size across a component (don't mix 16px and 24px)",
              code: 'size-4 for sm, size-5 for md, size-6 for lg',
            },
          ].map((r) => (
            <div
              key={r.title}
              className='rounded-xl border border-border bg-card p-5'
            >
              <p className='text-sm font-semibold text-foreground'>
                {r.title}
              </p>
              <p className='mt-1 text-xs text-muted-foreground'>{r.rule}</p>
              <code className='mt-2 block rounded bg-muted px-2 py-1 text-[10px] text-foreground/80'>
                {r.code}
              </code>
            </div>
          ))}
        </div>
      </Subsection>
    </SectionWrapper>
  )
}
