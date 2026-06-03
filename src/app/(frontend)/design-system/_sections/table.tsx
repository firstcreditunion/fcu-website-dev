import { type ReactNode } from 'react'
import { SearchIcon, FilterIcon, EllipsisIcon, InboxIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableContainer,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import { Section } from '../_components/section'
import { Note, SubHead } from '../_components/showcase'

/* ── Local helpers ── */

/** avatar + name + subtitle, the canonical "who" cell. */
function RowMeta({
  initials,
  tone,
  t1,
  t2,
}: {
  initials: string
  tone: string
  t1: string
  t2: string
}) {
  return (
    <span className='inline-flex min-w-0 items-center gap-3'>
      <span
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-semibold tracking-[-0.01em] text-white',
          tone
        )}
      >
        {initials}
      </span>
      <span className='flex min-w-0 flex-col'>
        <span className='text-[13.5px] font-medium text-foreground'>{t1}</span>
        <span className='truncate font-mono text-[11.5px] text-foreground-subtle'>{t2}</span>
      </span>
    </span>
  )
}

const statusTones = {
  success: 'border-status-success-500/25 bg-status-success-50 text-status-success-700',
  danger: 'border-destructive/25 bg-status-danger-50 text-status-danger-700',
  warning: 'border-status-warning-500/30 bg-status-warning-50 text-status-warning-700',
}

function StatusBadge({
  tone,
  children,
}: {
  tone: keyof typeof statusTones
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex h-[22px] items-center gap-1.5 rounded-full border px-2 text-[11.5px] font-medium whitespace-nowrap',
        statusTones[tone]
      )}
    >
      <span className='size-1.5 rounded-full bg-current opacity-70' />
      {children}
    </span>
  )
}

const AV = {
  blue: 'from-fcu-primary-400 to-fcu-primary-700',
  slate: 'from-neutral-400 to-neutral-600',
  deep: 'from-fcu-primary-600 to-fcu-primary-900',
  steel: 'from-neutral-500 to-neutral-700',
}

type Tx = {
  date: string
  initials: string
  tone: string
  name: string
  sub: string
  account: string
  status: { tone: keyof typeof statusTones; label: string }
  amount: string
  pos?: boolean
}

const TX: Tx[] = [
  { date: '28 May 2026', initials: 'SC', tone: AV.blue, name: 'Sarah Chen', sub: 'June groceries', account: 'Everyday', status: { tone: 'success', label: 'Sent' }, amount: '−$1,250.00' },
  { date: '27 May 2026', initials: 'AC', tone: AV.slate, name: 'Auckland Council · Rates', sub: 'Direct debit · scheduled', account: 'Everyday', status: { tone: 'danger', label: 'Failed' }, amount: '−$184.00' },
  { date: '27 May 2026', initials: 'CE', tone: AV.deep, name: 'Countdown', sub: 'Card payment · Ponsonby', account: 'Everyday', status: { tone: 'success', label: 'Sent' }, amount: '−$82.40' },
  { date: '26 May 2026', initials: 'VE', tone: AV.steel, name: 'Vector Energy', sub: 'Card payment', account: 'Everyday', status: { tone: 'success', label: 'Sent' }, amount: '−$142.18' },
  { date: '26 May 2026', initials: 'SI', tone: AV.blue, name: 'Spark NZ', sub: 'Mobile plan', account: 'Everyday', status: { tone: 'warning', label: 'Pending' }, amount: '−$65.00' },
  { date: '25 May 2026', initials: 'PA', tone: AV.slate, name: 'Payroll · Acme Ltd', sub: 'Salary', account: 'Everyday', status: { tone: 'success', label: 'Received' }, amount: '+$3,842.50', pos: true },
]

function FilterBar({ searchValue }: { searchValue?: string }) {
  return (
    <div className='flex flex-wrap items-center gap-2.5 border-b border-border bg-card px-[18px] py-3.5'>
      <div className='relative min-w-[180px] max-w-[280px] flex-1'>
        <SearchIcon className='pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-foreground-subtle' />
        <Input
          type='search'
          className='h-8 bg-surface pl-8 text-[13px]'
          placeholder='Search transactions'
          defaultValue={searchValue}
        />
      </div>
      <select className='hidden h-8 rounded-lg border border-input bg-surface px-2.5 text-[13px] text-foreground sm:block'>
        <option>All accounts</option>
        <option>Everyday</option>
        <option>Saver</option>
      </select>
      <div className='flex-1' />
      <Button variant='outline' size='sm'>
        <FilterIcon />
        Filters
      </Button>
      <Button size='sm'>Export</Button>
    </div>
  )
}

const numCell = 'text-right font-mono tabular-nums'
const monoCell = 'font-mono text-[12.5px] text-foreground-muted'

export function TableSection() {
  return (
    <Section
      id='table'
      num='Component'
      title='Table'
      description={
        <>
          The component every banking product lives or dies by — transactions, payees, statements,
          audit logs. Built to <b className='font-medium text-foreground'>read first</b>: tabular
          figures, restrained chrome, a 56px row, and a sticky header so a member can scroll a year
          of activity without losing the columns. Wrap a table in{' '}
          <code className='font-mono text-[12px]'>TableContainer</code> for the border, radius, and
          shadow; the inner scroll handles overflow on narrow screens.
        </>
      }
    >
      {/* ═══════════ A · ANATOMY ═══════════ */}
      <h3 className='mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        A · Anatomy
      </h3>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[TX[0], TX[1], TX[3], TX[5]].map((t) => (
              <TableRow key={t.date + t.name}>
                <TableCell className={monoCell}>{t.date}</TableCell>
                <TableCell>
                  <RowMeta initials={t.initials} tone={t.tone} t1={t.name} t2={t.sub} />
                </TableCell>
                <TableCell className={monoCell}>{t.account}</TableCell>
                <TableCell>
                  <StatusBadge tone={t.status.tone}>{t.status.label}</StatusBadge>
                </TableCell>
                <TableCell className={cn(numCell, t.pos && 'text-status-success-700')}>
                  {t.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ═══════════ B · VARIANTS ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        B · Variants
      </h3>

      <SubHead title='Striped' hint='zebra rows · dense, wide tables' />
      <TableContainer>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Account number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead className='text-right'>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ['12-3401-0234567-00', 'Everyday', '14 Mar 2018', '$4,182.14'],
              ['12-3401-0871244-00', 'Saver', '14 Mar 2018', '$28,450.00'],
              ['12-3401-0998170-00', 'Holiday fund', '02 Jan 2023', '$1,205.40'],
              ['12-3401-1102234-00', 'Term deposit · 12mo', '05 Apr 2025', '$15,000.00'],
            ].map(([acct, type, opened, bal]) => (
              <TableRow key={acct}>
                <TableCell className='font-medium'>Mereana Te Awa</TableCell>
                <TableCell className={monoCell}>{acct}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell className={monoCell}>{opened}</TableCell>
                <TableCell className={numCell}>{bal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SubHead title='Compact' hint='44px rows · dashboards, embedded lists' />
      <TableContainer>
        <Table compact>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Last sent</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ['Sarah Chen', '06-0145-0987654-00', '2 days ago', '$250.00'],
              ['Auckland Council', '02-1100-7842910-00', '30 days ago', '$184.00'],
              ['Vector Energy', '03-0518-0044721-00', '12 days ago', '$142.18'],
              ['Wisetech Holdings', '06-0507-0918321-00', '4 months ago', '$45.00'],
              ['Mum & Dad', '15-3950-1248890-00', '6 months ago', '$200.00'],
            ].map(([name, acct, last, amt]) => (
              <TableRow key={acct}>
                <TableCell className='font-medium'>{name}</TableCell>
                <TableCell className={monoCell}>{acct}</TableCell>
                <TableCell>{last}</TableCell>
                <TableCell className={numCell}>{amt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SubHead title='Bordered' hint='every cell ringed · exports, audit logs' />
      <TableContainer>
        <Table bordered compact>
          <TableHeader>
            <TableRow>
              <TableHead>Tx ID</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead className='text-right'>Debit</TableHead>
              <TableHead className='text-right'>Credit</TableHead>
              <TableHead className='text-right'>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ['TX-019823', '28-05 09:14', 'DC', 'SARAH CHEN', '1,250.00', '—', '4,182.14'],
              ['TX-019822', '27-05 02:00', 'DD', 'AKL COUNCIL', '184.00', '—', '5,432.14'],
              ['TX-019821', '26-05 17:48', 'CP', 'VECTOR', '142.18', '—', '5,616.14'],
              ['TX-019820', '25-05 12:00', 'CR', 'ACME LTD', '—', '3,842.50', '5,758.32'],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className={monoCell}>{r[0]}</TableCell>
                <TableCell className={monoCell}>{r[1]}</TableCell>
                <TableCell>{r[2]}</TableCell>
                <TableCell>{r[3]}</TableCell>
                <TableCell className={numCell}>{r[4]}</TableCell>
                <TableCell className={numCell}>{r[5]}</TableCell>
                <TableCell className={numCell}>{r[6]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ═══════════ C · SORT & SELECT ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        C · Sort &amp; select
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        Sortable headers get a chevron that flips ascending / descending, the active sort highlighted
        in primary. Selected rows shift to <b className='font-medium text-foreground'>primary-subtle</b>{' '}
        — the same tint used for selected radio cards and options elsewhere, so &ldquo;this is
        chosen&rdquo; reads consistently.
      </p>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-10 pr-0'>
                <Checkbox indeterminate aria-label='Select all' />
              </TableHead>
              <TableHead sortable sortDirection='desc'>
                Date
              </TableHead>
              <TableHead sortable>Description</TableHead>
              <TableHead sortable>Status</TableHead>
              <TableHead sortable className='text-right'>
                Amount
              </TableHead>
              <TableHead className='w-10' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[TX[0], TX[1], TX[3], TX[5]].map((t, i) => (
              <TableRow key={t.date + t.name} aria-selected={i < 2 || undefined}>
                <TableCell className='pr-0'>
                  <Checkbox defaultChecked={i < 2} aria-label={`Select ${t.name}`} />
                </TableCell>
                <TableCell className={monoCell}>{t.date}</TableCell>
                <TableCell>
                  <RowMeta initials={t.initials} tone={t.tone} t1={t.name} t2={t.sub} />
                </TableCell>
                <TableCell>
                  <StatusBadge tone={t.status.tone}>{t.status.label}</StatusBadge>
                </TableCell>
                <TableCell className={cn(numCell, t.pos && 'text-status-success-700')}>
                  {t.amount}
                </TableCell>
                <TableCell className='text-right'>
                  <Button variant='ghost' size='icon-sm' aria-label='More'>
                    <EllipsisIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ═══════════ D · IN CONTEXT ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        D · In context
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        Filter bar on top, table in the middle, pagination at the bottom — the canonical layout for
        any list view in the product.
      </p>
      <TableContainer>
        <FilterBar />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead sortable sortDirection='desc'>
                Date
              </TableHead>
              <TableHead sortable>Description</TableHead>
              <TableHead>Account</TableHead>
              <TableHead sortable>Status</TableHead>
              <TableHead sortable className='text-right'>
                Amount
              </TableHead>
              <TableHead className='w-10' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {TX.map((t) => (
              <TableRow key={t.date + t.name}>
                <TableCell className={monoCell}>{t.date}</TableCell>
                <TableCell>
                  <RowMeta initials={t.initials} tone={t.tone} t1={t.name} t2={t.sub} />
                </TableCell>
                <TableCell className={monoCell}>{t.account}</TableCell>
                <TableCell>
                  <StatusBadge tone={t.status.tone}>{t.status.label}</StatusBadge>
                </TableCell>
                <TableCell className={cn(numCell, t.pos && 'text-status-success-700')}>
                  {t.amount}
                </TableCell>
                <TableCell className='text-right'>
                  <Button variant='ghost' size='icon-sm' aria-label='More'>
                    <EllipsisIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex flex-wrap items-center justify-between gap-4 border-t border-border bg-surface px-4 py-3'>
          <span className='text-[12.5px] text-foreground-muted'>
            Showing <b className='font-mono font-medium text-foreground'>1–6</b> of{' '}
            <b className='font-mono font-medium text-foreground'>128</b> transactions
          </span>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>22</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </TableContainer>

      {/* ═══════════ E · EMPTY STATE ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        E · Empty state
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        When there&rsquo;s nothing to show, show <i>why</i> and what to do next — never just an empty
        table chrome.
      </p>
      <TableContainer>
        <FilterBar searchValue='xyzz' />
        <div className='flex flex-col items-center px-6 py-14 text-center text-foreground-muted'>
          <div className='mb-3.5 grid size-12 place-items-center rounded-full bg-surface-sunken text-foreground-subtle'>
            <InboxIcon className='size-[22px]' />
          </div>
          <h4 className='mb-1.5 text-[15px] font-semibold text-foreground'>
            No transactions match &ldquo;xyzz&rdquo;
          </h4>
          <p className='mb-[18px] max-w-[36ch] text-[13px] leading-relaxed'>
            Try a wider date range, or clear the search to see your last 30 days of activity.
          </p>
          <Button variant='outline' size='sm'>
            Clear filters
          </Button>
        </div>
      </TableContainer>

      <Note>
        <b>Pagination truncation rule.</b> Show first 1, last 1, the two either side of current, and
        an ellipsis for any gap. For ≤ 7 pages, show them all — an ellipsis on a 5-page list reads as
        a missing feature.
      </Note>
    </Section>
  )
}
