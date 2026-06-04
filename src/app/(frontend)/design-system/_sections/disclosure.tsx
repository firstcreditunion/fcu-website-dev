import { type ReactNode } from 'react'
import {
  InfoIcon,
  PencilIcon,
  MoreHorizontalIcon,
  Trash2Icon,
  UserIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionSub,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  PopoverItem,
  PopoverShortcut,
  PopoverSeparator,
} from '@/components/ui/popover'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Section } from '../_components/section'
import { Demo, Note, SubHead } from '../_components/showcase'

function DemoTag({ children }: { children: ReactNode }) {
  return (
    <span className='font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
      {children}
    </span>
  )
}

function Avatar({ size = 24, children }: { size?: number; children: ReactNode }) {
  return (
    <span
      className='inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fcu-primary-300 to-fcu-primary-600 font-semibold text-white'
      style={{ width: size, height: size, fontSize: size > 30 ? 14 : 11 }}
    >
      {children}
    </span>
  )
}

export function Disclosure() {
  return (
    <Section
      id='disclosure'
      num='Component'
      title='Accordion · Tooltip · Popover'
      description={
        <>
          Three ways to keep a page calm. <b className='font-medium text-foreground'>Accordion</b>{' '}
          reveals long content one chunk at a time; <b className='font-medium text-foreground'>Tooltip</b>{' '}
          answers &ldquo;what does this mean?&rdquo; inline; <b className='font-medium text-foreground'>Popover</b>{' '}
          is the larger cousin for menus, mini-forms, and rich cards. All open from a trigger and
          dismiss without interrupting flow.
        </>
      }
    >
      {/* ═══════════ A · ACCORDION ═══════════ */}
      <h3 className='mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        A · Accordion
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        For FAQ blocks, expandable terms, and any content where the title is enough most of the
        time and the body is needed sometimes. The caret rotates 180° when open.
      </p>

      <SubHead title='Default' hint='one container · 1px dividers' />
      <Accordion variant='default' defaultValue={['rate']}>
        <AccordionItem value='rate'>
          <AccordionTrigger>What&rsquo;s the interest rate on Everyday Saver?</AccordionTrigger>
          <AccordionContent>
            <p>
              <strong>4.85% p.a.</strong> on the first $10,000, calculated daily and paid monthly.
              Anything above $10,000 earns 1.20% p.a. — still better than a current account, but
              we&rsquo;d suggest a term deposit at that point.
            </p>
            <p>There are no minimum balances, no notice periods, and no monthly fees.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='withdraw'>
          <AccordionTrigger>Can I withdraw money any time?</AccordionTrigger>
          <AccordionContent>
            <p>
              Yes. Transfers to your linked Everyday account settle in seconds. Transfers to other
              banks settle within one business day.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='safe'>
          <AccordionTrigger>Is my money safe with First Credit Union?</AccordionTrigger>
          <AccordionContent>
            <p>
              FCU is supervised by the Reserve Bank of New Zealand. Deposits up to $100,000 per
              member are protected under the Deposit Takers Act 2023.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='diff'>
          <AccordionTrigger>How is FCU different from a bank?</AccordionTrigger>
          <AccordionContent>
            <p>
              We&rsquo;re owned by our members, not shareholders. Profits go back into better rates,
              lower fees, and community grants — not dividends to investors.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SubHead title='With subtitle' hint='a context line under the label' />
      <Accordion variant='default'>
        <AccordionItem value='dd'>
          <AccordionTrigger>
            Direct debit didn&rsquo;t go through
            <AccordionSub>Auckland Council · Rates · 27 May 2026</AccordionSub>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Funds were short by <strong>$12.40</strong>. We&rsquo;ll retry on Friday at 9:00 am —
              top up your Everyday account by then, or switch the debit to a different account.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='spark'>
          <AccordionTrigger>
            Spark NZ payment pending
            <AccordionSub>Card payment · 26 May 2026 · $65.00</AccordionSub>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Pending payments usually settle within one to three business days. Your available
              balance has already been reduced.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SubHead title='Spaced' hint='each item its own card' />
      <Accordion variant='spaced' defaultValue={['elig']}>
        <AccordionItem value='elig'>
          <AccordionTrigger>Membership eligibility</AccordionTrigger>
          <AccordionContent>
            <p>
              You can join FCU if you live, work, study, or worship in the Auckland region — or if
              you&rsquo;re related to an existing member. Memberships are lifetime.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='fees'>
          <AccordionTrigger>Joining fees</AccordionTrigger>
          <AccordionContent>
            <p>
              A one-off $20 membership share, refundable if you ever close your account. No annual
              fees.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='docs'>
          <AccordionTrigger>Required documents</AccordionTrigger>
          <AccordionContent>
            <p>
              NZ driver&rsquo;s licence or passport, IRD number, and proof of address from the last
              three months.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SubHead title='Ghost' hint='no frame · inside another surface' />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Fine print</CardTitle>
            <CardDescription>
              Everything you might want to skip — but we&rsquo;ll list it anyway.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className='pt-0'>
          <Accordion variant='ghost'>
            <AccordionItem value='disc'>
              <AccordionTrigger>Disclosure statement</AccordionTrigger>
              <AccordionContent>
                <p>
                  Available under the Financial Markets Conduct Act 2013. Hard copy on request, or
                  download from our disclosures page.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='privacy'>
              <AccordionTrigger>Privacy &amp; data</AccordionTrigger>
              <AccordionContent>
                <p>
                  We collect only what we need to provide services. Full privacy policy on our
                  website.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* ═══════════ B · TOOLTIP ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        B · Tooltip
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        A small, dark, one-line annotation. Use sparingly — if a button needs a tooltip to be
        understood, its label is probably wrong. The right place: icon-only buttons, info icons next
        to financial figures, abbreviations.
      </p>

      <TooltipProvider delay={150}>
        <SubHead title='Positions' hint='hover a target · arrow points at it' />
        <Demo>
          <div className='grid grid-cols-2 gap-10 py-6 sm:grid-cols-4'>
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <div key={side} className='flex flex-col items-center gap-2'>
                <Tooltip>
                  <TooltipTrigger className='inline-flex h-8 w-[120px] items-center justify-center rounded-md border border-border bg-card text-[12px] text-foreground-muted capitalize outline-none hover:border-border-strong focus-visible:shadow-[var(--shadow-focus)]'>
                    {side}
                  </TooltipTrigger>
                  <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
                </Tooltip>
                <span className='font-mono text-[11px] text-foreground-subtle'>
                  side=&quot;{side}&quot;
                </span>
              </div>
            ))}
          </div>
        </Demo>

        <SubHead title='In context' hint='info icons · icon-only buttons' />
        <Demo>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <DemoTag>Info icon · explains a term</DemoTag>
              <p className='m-0 max-w-[60ch] text-sm leading-relaxed text-foreground'>
                Your effective interest rate is{' '}
                <strong className='font-medium'>4.32% p.a.</strong> after{' '}
                <span className='inline-flex items-center gap-0.5 align-baseline'>
                  RWT
                  <Tooltip>
                    <TooltipTrigger
                      aria-label='What is RWT?'
                      className='inline-flex size-4 cursor-help items-center justify-center rounded-full text-foreground-subtle outline-none hover:text-primary [&_svg]:size-3.5'
                    >
                      <InfoIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      Resident Withholding Tax — taken automatically by FCU at your declared rate.
                    </TooltipContent>
                  </Tooltip>
                </span>{' '}
                is deducted at your declared rate of 10.5%.
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <DemoTag>Icon-only buttons</DemoTag>
              <div className='flex items-center gap-2'>
                {[
                  { icon: <PencilIcon />, label: 'Edit' },
                  { icon: <MoreHorizontalIcon />, label: 'More actions' },
                  { icon: <Trash2Icon />, label: 'Delete payee' },
                ].map((b) => (
                  <Tooltip key={b.label}>
                    <TooltipTrigger
                      render={<Button variant='ghost' size='icon-sm' aria-label={b.label} />}
                    >
                      {b.icon}
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>{b.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </Demo>
      </TooltipProvider>

      <Note variant='warning'>
        <b>Never use tooltips for essential information.</b> Anything a user must read to complete a
        task belongs in the page, not behind a hover — tooltips are silently inaccessible to touch
        users in most implementations.
      </Note>

      {/* ═══════════ C · POPOVER ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        C · Popover
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        Bigger than a tooltip, lighter than a dialog — for action menus, mini-forms, and definition
        cards. Three sizes for three jobs.
      </p>

      <SubHead title='Variants' hint='menu · info card · mini-form' />
      <Demo>
        <div className='flex flex-wrap items-start gap-3'>
          <Popover>
            <PopoverTrigger render={<Button variant='outline' size='sm' />}>
              Action menu
            </PopoverTrigger>
            <PopoverContent size='menu' align='start'>
              <PopoverItem>
                <PencilIcon />
                Edit payee
                <PopoverShortcut>⌘E</PopoverShortcut>
              </PopoverItem>
              <PopoverItem>
                <UserIcon />
                View details
              </PopoverItem>
              <PopoverSeparator />
              <PopoverItem variant='danger'>
                <Trash2Icon />
                Delete payee
              </PopoverItem>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger render={<Button variant='outline' size='sm' />}>
              Info card
            </PopoverTrigger>
            <PopoverContent align='start'>
              <PopoverHeader>
                <PopoverTitle>What&rsquo;s a member share?</PopoverTitle>
              </PopoverHeader>
              <p className='m-0 text-foreground-muted [&_strong]:font-medium [&_strong]:text-foreground'>
                A <strong>$20 one-off</strong> deposit that makes you a co-owner of FCU. It&rsquo;s
                refundable if you ever close your account.
              </p>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger render={<Button variant='outline' size='sm' />}>
              Mini-form
            </PopoverTrigger>
            <PopoverContent size='lg' align='start'>
              <PopoverHeader>
                <PopoverTitle>Quick note on Sarah&rsquo;s payment</PopoverTitle>
                <PopoverDescription>
                  Only you&rsquo;ll see this. Stays on your statement.
                </PopoverDescription>
              </PopoverHeader>
              <Input placeholder='e.g. June groceries' />
              <PopoverFooter>
                <Button variant='ghost' size='sm'>
                  Cancel
                </Button>
                <Button size='sm'>Save</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </div>
      </Demo>

      <SubHead title='In context' hint='row action menu · profile card' />
      <Card>
        <CardContent className='p-0'>
          <div className='flex items-center gap-3.5 border-b border-border px-5 py-3.5'>
            <div className='min-w-0 flex-1'>
              <div className='text-sm font-medium text-foreground'>Sarah Chen</div>
              <div className='font-mono text-[11.5px] text-foreground-subtle'>
                06-0145-0987654-00 · last sent 2 days ago
              </div>
            </div>
            <Popover>
              <PopoverTrigger
                render={<Button variant='ghost' size='icon-sm' aria-label='More' />}
              >
                <MoreHorizontalIcon />
              </PopoverTrigger>
              <PopoverContent size='menu' align='end'>
                <PopoverItem>
                  <PencilIcon />
                  Edit payee
                </PopoverItem>
                <PopoverItem>
                  <UserIcon />
                  View transaction history
                </PopoverItem>
                <PopoverSeparator />
                <PopoverItem variant='danger'>
                  <Trash2Icon />
                  Delete payee
                </PopoverItem>
              </PopoverContent>
            </Popover>
          </div>

          <div className='p-5'>
            <h4 className='m-0 mb-1.5 text-[15px] font-semibold tracking-[-0.008em] text-foreground'>
              Profile popover
            </h4>
            <p className='m-0 mb-4 text-[13.5px] text-foreground-muted'>
              Click a member avatar in audit logs to see their profile without leaving the page.
            </p>
            <Popover>
              <PopoverTrigger
                render={<Button variant='ghost' size='sm' className='gap-2' />}
              >
                <Avatar>MT</Avatar>
                Mereana Te Awa
              </PopoverTrigger>
              <PopoverContent align='start'>
                <PopoverHeader>
                  <div className='flex items-center gap-3'>
                    <Avatar size={40}>MT</Avatar>
                    <div>
                      <PopoverTitle>Mereana Te Awa</PopoverTitle>
                      <PopoverDescription>Member since Mar 2018</PopoverDescription>
                    </div>
                  </div>
                </PopoverHeader>
                <p className='m-0 text-foreground-muted [&_strong]:font-medium [&_strong]:text-foreground'>
                  Three accounts · <strong>$33,837.54</strong> total balance.
                </p>
                <PopoverFooter>
                  <Button variant='outline' size='sm'>
                    View profile
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}
