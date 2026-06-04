import { type ReactNode } from 'react'
import {
  HomeIcon,
  SlashIcon,
  WalletIcon,
  ListIcon,
  SettingsIcon,
  LayoutGridIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Section } from '../_components/section'
import { Demo, Note, SubHead } from '../_components/showcase'

function DemoTag({ children }: { children: ReactNode }) {
  return (
    <span className='font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
      {children}
    </span>
  )
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className='rounded-lg border border-dashed border-border bg-surface p-6 text-[13.5px] leading-relaxed text-foreground-muted'>
      {children}
    </div>
  )
}

export function Navigation() {
  return (
    <Section
      id='navigation'
      num='Component'
      title='Breadcrumb & Tabs'
      description={
        <>
          Two ways a member finds their place. <b className='font-medium text-foreground'>Breadcrumb</b>{' '}
          shows where on the site they are, back to home. <b className='font-medium text-foreground'>Tabs</b>{' '}
          divide one screen into sections without making them feel like separate pages. Both are
          quiet — never the loudest thing on the page.
        </>
      }
    >
      {/* ═══════════ A · BREADCRUMB ═══════════ */}
      <h3 className='mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        A · Breadcrumb
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        A horizontal trail back to the site root — under the site nav, above the page H1. The
        current page is the last item: non-clickable and slightly heavier. Chevron is the default
        separator; a slash is reserved for code / audit paths.
      </p>

      <SubHead title='Variants' hint='chevron · slash · compact' />
      <Demo>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <DemoTag>Chevron · default</DemoTag>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#' aria-label='Home'>
                    <HomeIcon className='size-3.5' />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Savings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Everyday Saver</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='flex flex-col gap-2'>
            <DemoTag>Slash</DemoTag>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Audit</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon className='-rotate-12' />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Transactions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon className='-rotate-12' />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#' className='font-mono'>
                    TX-019823
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon className='-rotate-12' />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Detail</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='flex flex-col gap-2'>
            <DemoTag>Compact · size=&quot;sm&quot;</DemoTag>
            <Breadcrumb>
              <BreadcrumbList size='sm'>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Accounts</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Everyday · ending 567</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>May statement</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </Demo>

      <SubHead title='Overflow' hint='collapse the middle · truncate long names' />
      <Demo>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <DemoTag>Collapsed middle</DemoTag>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#' aria-label='Home'>
                    <HomeIcon className='size-3.5' />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Term deposit</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Renewal options</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='flex flex-col gap-2'>
            <DemoTag>Long names truncate · max-width 240px</DemoTag>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>
                    An exceptionally long category name that goes on for a while
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Detail page also with an unreasonably long title
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </Demo>

      <SubHead title='In context' hint='above the page title' />
      <div className='overflow-hidden rounded-xl border border-border bg-card'>
        <div className='border-b border-border bg-surface px-6 py-3.5'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='#' aria-label='Home'>
                  <HomeIcon className='size-3.5' />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Savings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Everyday Saver</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='px-6 pt-8 pb-6'>
          <h2 className='m-0 text-[28px] leading-tight font-semibold tracking-[-0.02em] text-foreground'>
            Everyday Saver
          </h2>
          <p className='mt-2 max-w-[60ch] text-[15px] leading-relaxed text-foreground-muted'>
            Built around one idea: your money grows without you having to think about it. 4.85% p.a.
            on the first $10,000.
          </p>
        </div>
      </div>

      {/* ═══════════ B · TABS ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        B · Tabs
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        For switching between two-to-seven sections of one page. Three variants, three jobs:{' '}
        <b className='font-medium text-foreground'>underline</b> for primary page sections,{' '}
        <b className='font-medium text-foreground'>pill</b> for filter-like view toggles, and{' '}
        <b className='font-medium text-foreground'>enclosed</b> where each section needs to read as
        a self-contained surface.
      </p>

      <SubHead title='Underline' hint='default · 2px primary underline' />
      <Demo>
        <Tabs defaultValue='overview'>
          <TabsList variant='underline'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='transactions'>
              Transactions
              <Badge variant='neutral'>128</Badge>
            </TabsTrigger>
            <TabsTrigger value='statements'>Statements</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
          </TabsList>
          <TabsContent value='overview'>
            <Panel>Overview panel — account balance, recent activity, scheduled transfers.</Panel>
          </TabsContent>
          <TabsContent value='transactions'>
            <Panel>Transactions panel — 128 rows of statement activity.</Panel>
          </TabsContent>
          <TabsContent value='statements'>
            <Panel>Statements panel — downloadable monthly PDFs.</Panel>
          </TabsContent>
          <TabsContent value='settings'>
            <Panel>Settings panel — account name, alerts, linked cards.</Panel>
          </TabsContent>
        </Tabs>
      </Demo>
      <Demo>
        <div className='flex flex-col gap-3'>
          <DemoTag>With icons · one disabled</DemoTag>
          <Tabs defaultValue='accounts'>
            <TabsList variant='underline'>
              <TabsTrigger value='accounts'>
                <WalletIcon />
                Accounts
              </TabsTrigger>
              <TabsTrigger value='activity'>
                <ListIcon />
                Activity
              </TabsTrigger>
              <TabsTrigger value='settings'>
                <SettingsIcon />
                Settings
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports · soon
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Demo>

      <SubHead title='Pill' hint='self-contained toggle · filters & view switches' />
      <Demo>
        <div className='flex flex-col gap-4'>
          <Tabs defaultValue='day'>
            <TabsList variant='pill'>
              <TabsTrigger value='day'>Day</TabsTrigger>
              <TabsTrigger value='week'>Week</TabsTrigger>
              <TabsTrigger value='month'>Month</TabsTrigger>
              <TabsTrigger value='year'>Year</TabsTrigger>
              <TabsTrigger value='all'>All time</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue='grid'>
            <TabsList variant='pill'>
              <TabsTrigger value='grid'>
                <LayoutGridIcon />
                Grid
              </TabsTrigger>
              <TabsTrigger value='list'>
                <ListIcon />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Demo>

      <SubHead title='Enclosed' hint='each tab reads like the top of a card' />
      <Demo>
        <Tabs defaultValue='details'>
          <TabsList variant='enclosed'>
            <TabsTrigger value='details'>Account details</TabsTrigger>
            <TabsTrigger value='cards'>Linked cards</TabsTrigger>
            <TabsTrigger value='beneficiaries'>Beneficiaries</TabsTrigger>
          </TabsList>
          <TabsContent value='details'>
            <div className='rounded-b-xl rounded-tr-xl border border-t-0 border-border bg-card p-6 text-sm text-foreground-muted'>
              Account details — name on account, address, IRD number, tax residency.
            </div>
          </TabsContent>
          <TabsContent value='cards'>
            <div className='rounded-b-xl rounded-tr-xl border border-t-0 border-border bg-card p-6 text-sm text-foreground-muted'>
              Linked cards — debit and credit cards attached to this account.
            </div>
          </TabsContent>
          <TabsContent value='beneficiaries'>
            <div className='rounded-b-xl rounded-tr-xl border border-t-0 border-border bg-card p-6 text-sm text-foreground-muted'>
              Beneficiaries — who inherits this account, and their share.
            </div>
          </TabsContent>
        </Tabs>
      </Demo>

      <SubHead title='States' hint='default · active · disabled · with badge' />
      <Demo>
        <Tabs defaultValue='active'>
          <TabsList variant='underline'>
            <TabsTrigger value='default'>Default</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='disabled' disabled>
              Disabled
            </TabsTrigger>
            <TabsTrigger value='new'>
              With
              <Badge size='sm' variant='primary'>
                New
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Demo>

      <Note>
        <b>Sticky on scroll.</b> When a page has a tall main panel, make the tab list{' '}
        <code className='font-mono text-[12px]'>position: sticky; top: 0</code> with a backdrop —
        members keep their context as they scroll.
      </Note>
    </Section>
  )
}
