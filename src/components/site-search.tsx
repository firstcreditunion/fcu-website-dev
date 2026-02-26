'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CreditCard,
  PiggyBank,
  Shield,
  HelpCircle,
  MapPin,
  Phone,
  FileText,
  Calculator,
  Users,
  Search,
  ArrowRight,
  CornerDownLeft,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

interface SearchItem {
  label: string
  href: string
  icon: React.ReactNode
  keywords?: string[]
}

const quickLinks: SearchItem[] = [
  {
    label: 'Apply for a Loan',
    href: '/loans/loan-application',
    icon: <FileText />,
    keywords: ['borrow', 'finance'],
  },
  {
    label: 'Become a Member',
    href: '/contact/become-a-member',
    icon: <Users />,
    keywords: ['join', 'sign up', 'register'],
  },
  {
    label: 'Find a Branch',
    href: '/contact/branch-finder',
    icon: <MapPin />,
    keywords: ['location', 'office', 'visit'],
  },
  {
    label: 'Loan Calculator',
    href: '/support/tools/personal-loan-calculator',
    icon: <Calculator />,
    keywords: ['repayment', 'calculate'],
  },
]

const pages: { heading: string; items: SearchItem[] }[] = [
  {
    heading: 'Loans',
    items: [
      {
        label: 'Personal Loan',
        href: '/loans/products/personal-loan',
        icon: <CreditCard />,
      },
      {
        label: 'Home Loan',
        href: '/loans/products/home-loan',
        icon: <CreditCard />,
        keywords: ['mortgage', 'house'],
      },
      {
        label: 'Car Loan',
        href: '/loans/products/car-loan',
        icon: <CreditCard />,
        keywords: ['vehicle', 'auto'],
      },
      {
        label: 'Debt Consolidation',
        href: '/loans/products/debt-consolidation-loan',
        icon: <CreditCard />,
      },
      {
        label: 'Hardship Assistance',
        href: '/loans/hardship',
        icon: <HelpCircle />,
        keywords: ['financial difficulty'],
      },
    ],
  },
  {
    heading: 'Accounts',
    items: [
      {
        label: 'Everyday Account',
        href: '/accounts/transactional-accounts/everyday-account',
        icon: <PiggyBank />,
      },
      {
        label: 'Online Savings',
        href: '/accounts/savings-accounts/online-savings-account',
        icon: <PiggyBank />,
        keywords: ['save'],
      },
      {
        label: 'Term Deposit',
        href: '/accounts/term-deposit',
        icon: <PiggyBank />,
        keywords: ['fixed', 'invest'],
      },
      {
        label: 'Mastercard Debit Card',
        href: '/accounts/mastercard-debit-card',
        icon: <CreditCard />,
        keywords: ['card'],
      },
      {
        label: 'Internet Banking',
        href: '/accounts/ways-to-bank/internet-banking',
        icon: <CreditCard />,
        keywords: ['online banking'],
      },
    ],
  },
  {
    heading: 'Insurance',
    items: [
      {
        label: 'Car Insurance',
        href: '/insurance/products/car-insurance',
        icon: <Shield />,
        keywords: ['vehicle'],
      },
      {
        label: 'Funeral Insurance',
        href: '/insurance/products/funeral-insurance',
        icon: <Shield />,
      },
      {
        label: 'Loan Protection',
        href: '/insurance/products/loan-protection-insurance',
        icon: <Shield />,
      },
    ],
  },
  {
    heading: 'Support',
    items: [
      {
        label: 'FAQs',
        href: '/support/resources/faqs',
        icon: <HelpCircle />,
        keywords: ['help', 'questions'],
      },
      {
        label: 'Rates & Fees',
        href: '/support/rates-and-fees',
        icon: <FileText />,
        keywords: ['interest', 'pricing'],
      },
      {
        label: 'Contact Us',
        href: '/contact',
        icon: <Phone />,
        keywords: ['email', 'call'],
      },
      {
        label: 'Cyber Security',
        href: '/support/cyber-security',
        icon: <Shield />,
        keywords: ['scams', 'fraud', 'safety'],
      },
    ],
  },
]

export function SiteSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router],
  )

  return (
    <>
      {/* Desktop trigger */}
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50/60 px-4 py-1.5 text-sm text-gray-400 transition-all hover:border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fcu-primary-900 sm:inline-flex'
        aria-label='Search the site'
      >
        <Search className='size-4 text-gray-400' />
        <span className='text-gray-500'>Search...</span>
        <kbd className='pointer-events-none ml-4 hidden select-none items-center gap-0.5 rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-400 md:inline-flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title='Search First Credit Union'
        description='Find pages, products, and services'
      >
        <CommandInput placeholder='What are you looking for?' />
        <CommandList>
          <CommandEmpty>
            <div className='flex flex-col items-center gap-3 py-8'>
              <div className='flex size-12 items-center justify-center rounded-full bg-gray-100'>
                <Search className='size-5 text-gray-400' />
              </div>
              <div className='text-center'>
                <p className='font-medium text-foreground'>No results found</p>
                <p className='mt-1 text-xs text-muted-foreground'>
                  Try a different search term
                </p>
              </div>
            </div>
          </CommandEmpty>

          <CommandGroup heading='Quick Links'>
            {quickLinks.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                onSelect={() => navigate(item.href)}
                className='cursor-pointer gap-3'
              >
                <span className='text-fcu-secondary-500'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
                <ArrowRight className='ml-auto size-3.5! text-muted-foreground' />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {pages.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${group.heading} ${item.label} ${item.keywords?.join(' ') ?? ''}`}
                  onSelect={() => navigate(item.href)}
                  className='cursor-pointer gap-3'
                >
                  {item.icon}
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />

          <CommandGroup heading='Contact'>
            <CommandItem
              value='contact call phone'
              onSelect={() => navigate('/contact/call')}
              className='cursor-pointer gap-3'
            >
              <Phone />
              Call Us
              <CommandShortcut>0800 11 11 23</CommandShortcut>
            </CommandItem>
            <CommandItem
              value='live chat support'
              onSelect={() => navigate('/contact/live-chat')}
              className='cursor-pointer gap-3'
            >
              <HelpCircle />
              Live Chat
            </CommandItem>
          </CommandGroup>
        </CommandList>

        {/* Footer with keyboard hints */}
        <div className='flex items-center justify-between border-t border-gray-100 bg-gray-50/60 px-4 py-2.5'>
          <div className='flex items-center gap-5 text-[11px] text-gray-400'>
            <span className='inline-flex items-center gap-1.5'>
              <kbd className='inline-flex size-5 items-center justify-center rounded-md border border-gray-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] font-mono text-[10px]'>
                <CornerDownLeft className='size-2.5' />
              </kbd>
              select
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <kbd className='inline-flex size-5 items-center justify-center rounded-md border border-gray-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] font-mono text-[10px]'>
                ↑
              </kbd>
              <kbd className='inline-flex size-5 items-center justify-center rounded-md border border-gray-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] font-mono text-[10px]'>
                ↓
              </kbd>
              navigate
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <kbd className='inline-flex h-5 items-center justify-center rounded-md border border-gray-200/80 bg-white px-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] font-mono text-[10px]'>
                esc
              </kbd>
              close
            </span>
          </div>
          <span className='text-[10px] font-medium tracking-wide text-fcu-secondary-600'>
            Powered by First Credit Union
          </span>
        </div>
      </CommandDialog>
    </>
  )
}
