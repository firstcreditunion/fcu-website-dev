import { type ReactNode } from 'react'
import {
  XIcon,
  EllipsisIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TriangleAlertIcon,
  CircleCheckIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardEyebrow,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogEyebrow,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Section } from '../_components/section'
import { Demo, DoDont, DoDontCard, Note, SubHead } from '../_components/showcase'

/* ─────────────────────────────────────────────────────────────
   Local presentational helpers
   ───────────────────────────────────────────────────────────── */

/** A labelled gallery cell: a live component above a mono token tag. */
function GalleryCell({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <div className='flex min-w-0 flex-col gap-2'>
      {children}
      <span className='font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
        {tag}
      </span>
    </div>
  )
}

/** 16:9 media slot for a card. */
function CardMedia({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'grid aspect-video place-items-center bg-gradient-to-br from-fcu-primary-200 to-fcu-primary-100 font-mono text-[11px] tracking-[0.04em] text-fcu-primary-900',
        className
      )}
    >
      {children}
    </div>
  )
}

/** A stat block (label · mono value · up/down delta). */
function Stat({
  label,
  value,
  delta,
  dir,
}: {
  label: string
  value: string
  delta: string
  dir: 'up' | 'down'
}) {
  return (
    <div className='flex flex-col gap-1.5 px-6 py-6'>
      <span className='text-[13px] text-foreground-muted'>{label}</span>
      <span className='font-mono text-[32px] leading-none font-semibold tracking-[-0.02em] tabular-nums text-foreground'>
        {value}
      </span>
      <span
        className={cn(
          'inline-flex items-center gap-1 font-mono text-[12px]',
          dir === 'up' ? 'text-status-success-700' : 'text-destructive'
        )}
      >
        {dir === 'up' ? <ArrowUpIcon className='size-3' /> : <ArrowDownIcon className='size-3' />}
        {delta}
      </span>
    </div>
  )
}

/** A payee / account row inside a list card. */
function AccountRow({
  initials,
  tone,
  name,
  sub,
  right,
}: {
  initials: string
  tone: string
  name: string
  sub: string
  right: string
}) {
  return (
    <div className='flex items-center gap-3.5 border-t border-border px-[18px] py-3.5 first:border-t-0'>
      <span
        className={cn(
          'inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[13px] font-semibold tracking-[-0.01em] text-white',
          tone
        )}
      >
        {initials}
      </span>
      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <span className='truncate text-sm font-medium text-foreground'>{name}</span>
        <span className='truncate font-mono text-[11.5px] text-foreground-subtle'>{sub}</span>
      </div>
      <span className='hidden shrink-0 font-mono text-[12.5px] font-medium text-foreground-muted sm:block'>
        {right}
      </span>
      <Button variant='ghost' size='icon-sm' aria-label='More'>
        <EllipsisIcon />
      </Button>
    </div>
  )
}

/* ── Static dialog preview (rendered inline in a faux-backdrop stage) ── */

/** Dotted faux-backdrop used to present a dialog inline, mirroring the hand-off. */
function DialogStage({ children }: { children: ReactNode }) {
  return (
    <div
      className='relative grid place-items-center overflow-hidden rounded-xl border border-border px-6 py-12'
      style={{
        backgroundColor: 'var(--surface)',
        backgroundImage:
          'radial-gradient(circle at 1px 1px, var(--neutral-200) 1px, transparent 0)',
        backgroundSize: '18px 18px',
      }}
    >
      {children}
    </div>
  )
}

const panelWidths = {
  sm: 'max-w-[400px]',
  default: 'max-w-[480px]',
  lg: 'max-w-[640px]',
  alert: 'max-w-[420px]',
}

/** Static dialog shell — the dialog surface without the portal/overlay. */
function Panel({
  size = 'default',
  className,
  children,
}: {
  size?: keyof typeof panelWidths
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-[var(--shadow-xl)]',
        panelWidths[size],
        className
      )}
    >
      {children}
    </div>
  )
}

function PClose() {
  return (
    <button
      type='button'
      aria-label='Close'
      className='absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-surface-sunken hover:text-foreground [&_svg]:size-[18px]'
    >
      <XIcon />
    </button>
  )
}

function StageTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className='m-0 text-[18px] leading-snug font-semibold tracking-[-0.012em] text-balance text-foreground'>
      {children}
    </h3>
  )
}

function StageDesc({ children }: { children: ReactNode }) {
  return (
    <p className='m-0 text-sm leading-relaxed text-pretty text-foreground-muted [&_strong]:font-medium [&_strong]:text-foreground'>
      {children}
    </p>
  )
}

/** Icon bubble used in alert-style dialog previews. */
function AlertBubble({
  tone,
  children,
}: {
  tone: 'danger' | 'success' | 'warning' | 'primary'
  children: ReactNode
}) {
  const tones = {
    primary: 'bg-primary-subtle text-primary',
    danger: 'bg-status-danger-50 text-destructive',
    warning: 'bg-status-warning-50 text-status-warning-700',
    success: 'bg-status-success-50 text-status-success-700',
  }
  return (
    <span
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full [&_svg]:size-5',
        tones[tone]
      )}
    >
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section
   ───────────────────────────────────────────────────────────── */

export function CardDialog() {
  return (
    <Section
      id='card-dialog'
      num='Component'
      title='Card & Dialog'
      description={
        <>
          Two containers, different jobs. The <b className='font-medium text-foreground'>Card</b>{' '}
          groups information that belongs together on a page — accounts, payees, marketing tiles,
          stat blocks. The <b className='font-medium text-foreground'>Dialog</b> is the same shape
          lifted off the page to demand a single decision before the user moves on. Both share one
          radius, one border, one body padding — so a dialog feels like a card we paused on.
        </>
      }
    >
      {/* ═══════════ A · CARD ═══════════ */}
      <h3 className='mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        A · Card
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        The base container. Default to <b className='font-medium text-foreground'>outlined</b> — it
        sits alongside content without competing. Elevated and ghost are reserved for specific jobs:
        a card that floats above its background, or a frame that reads as page chrome.
      </p>

      {/* A·1 Variants */}
      <SubHead title='Variants' hint='surface treatment · composition is independent' />
      <div className='grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4'>
        <GalleryCell tag='variant="outlined"'>
          <Card variant='outlined'>
            <CardHeader>
              <div>
                <CardTitle>Outlined</CardTitle>
                <CardDescription>1px border · shadow-xs</CardDescription>
              </div>
            </CardHeader>
            <CardContent>The default. Reads as part of the page, not an interruption.</CardContent>
          </Card>
        </GalleryCell>

        <GalleryCell tag='variant="elevated"'>
          <Card variant='elevated'>
            <CardHeader>
              <div>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>no border · shadow-md</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              For cards that float above their container — feature tiles on a landing page.
            </CardContent>
          </Card>
        </GalleryCell>

        <GalleryCell tag='variant="ghost"'>
          <Card variant='ghost'>
            <CardHeader>
              <div>
                <CardTitle>Ghost</CardTitle>
                <CardDescription>no fill · no shadow</CardDescription>
              </div>
            </CardHeader>
            <CardContent>A border-only frame for grouping without adding visual weight.</CardContent>
          </Card>
        </GalleryCell>

        <GalleryCell tag='variant="interactive"'>
          <Card variant='interactive' tabIndex={0}>
            <CardHeader>
              <div>
                <CardTitle>Interactive</CardTitle>
                <CardDescription>hover lift · focus ring</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Wraps an entire click target. Hover for the lift and shadow upgrade.
            </CardContent>
          </Card>
        </GalleryCell>

        <GalleryCell tag='accent="primary"'>
          <Card accent='primary'>
            <CardHeader>
              <div>
                <CardTitle>Accent rail · primary</CardTitle>
                <CardDescription>3px top border</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Use sparingly — one accent per stack — to flag the current or featured item.
            </CardContent>
          </Card>
        </GalleryCell>

        <GalleryCell tag='accent="destructive"'>
          <Card accent='destructive'>
            <CardHeader>
              <div>
                <CardTitle>Accent rail · danger</CardTitle>
                <CardDescription>blocked / failed states</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              A failed direct debit, a frozen account, an expired card. Pair with an action.
            </CardContent>
          </Card>
        </GalleryCell>
      </div>

      {/* A·2 Composition */}
      <SubHead title='Composition' hint='header · body · footer — each optional' />
      <div className='grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4'>
        {/* header · body · footer */}
        <GalleryCell tag='header · body · footer'>
          <Card>
            <CardHeader>
              <div>
                <CardEyebrow>Account</CardEyebrow>
                <CardTitle>Everyday</CardTitle>
                <CardDescription className='font-mono'>12-3401-0234567-00</CardDescription>
              </div>
              <CardAction>
                <Button variant='ghost' size='icon-sm' aria-label='More'>
                  <EllipsisIcon />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              Available balance:{' '}
              <strong className='font-mono font-medium text-foreground'>$4,182.14</strong>
            </CardContent>
            <CardFooter>
              <Button variant='ghost' size='sm'>
                Statement
              </Button>
              <Button size='sm'>Transfer</Button>
            </CardFooter>
          </Card>
        </GalleryCell>

        {/* media + content */}
        <GalleryCell tag='media + content'>
          <Card>
            <CardMedia>PLACEHOLDER · 16:9</CardMedia>
            <CardHeader>
              <div>
                <CardEyebrow>Members earn more</CardEyebrow>
                <CardTitle>4.85% p.a. on your first $10,000</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              No teaser rates, no balance tiers, no monthly fees. Open a Saver in under three minutes.
            </CardContent>
            <CardFooter className='justify-start'>
              <Button size='sm'>Open a Saver</Button>
            </CardFooter>
          </Card>
        </GalleryCell>

        {/* stat */}
        <GalleryCell tag='stat card · mono value'>
          <Card>
            <Stat
              label='Total balance · all accounts'
              value='$33,837.54'
              delta='$1,204.50 this month'
              dir='up'
            />
          </Card>
        </GalleryCell>
      </div>

      {/* A·3 In context */}
      <SubHead title='In context' hint='a dashboard is nothing but cards' />
      <div className='grid gap-4 sm:grid-cols-3'>
        <Card>
          <Stat label='Everyday' value='$4,182.14' delta='$284.12 today' dir='down' />
        </Card>
        <Card accent='primary'>
          <Stat label='Saver' value='$28,450.00' delta='$112.40 interest' dir='up' />
        </Card>
        <Card>
          <Stat label='Holiday fund' value='$1,205.40' delta='$80.00 this month' dir='up' />
        </Card>
      </div>

      <div className='mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]'>
        {/* Payees list */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Payees</CardTitle>
              <CardDescription>Saved recipients · 5 total</CardDescription>
            </div>
            <CardAction>
              <Button variant='outline' size='sm'>
                Add payee
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className='p-0'>
            <AccountRow
              initials='SC'
              tone='from-fcu-primary-400 to-fcu-primary-700'
              name='Sarah Chen'
              sub='06-0145-0987654-00 · ANZ'
              right='last sent $250'
            />
            <AccountRow
              initials='AC'
              tone='from-neutral-400 to-neutral-600'
              name='Auckland Council · Rates'
              sub='02-1100-7842910-00 · monthly'
              right='$184.00 / mo'
            />
            <AccountRow
              initials='VE'
              tone='from-fcu-primary-600 to-fcu-primary-900'
              name='Vector Energy'
              sub='03-0518-0044721-00 · 12d ago'
              right='avg $142'
            />
          </CardContent>
        </Card>

        {/* Notification + tip */}
        <div className='flex flex-col gap-4'>
          <Card accent='destructive'>
            <CardHeader>
              <div>
                <CardEyebrow className='text-destructive'>Action needed</CardEyebrow>
                <CardTitle>Direct debit didn&rsquo;t go through</CardTitle>
                <CardDescription>Auckland Council · 27 May</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Funds were short by{' '}
              <strong className='font-medium text-foreground'>$12.40</strong>. Top up your Everyday
              account to retry on Friday.
            </CardContent>
            <CardFooter>
              <Button variant='ghost' size='sm'>
                Change account
              </Button>
              <Button size='sm'>Top up</Button>
            </CardFooter>
          </Card>

          <Card variant='interactive' tabIndex={0}>
            <CardHeader>
              <div>
                <CardEyebrow>Tip</CardEyebrow>
                <CardTitle>Set up a goal</CardTitle>
                <CardDescription>Save for something specific in under a minute</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Note>
        <b>Card-grid responsiveness.</b> The variant galleries above use{' '}
        <code className='font-mono text-[12px]'>minmax(min(100%, 300px), 1fr)</code> so cards never
        overflow on narrow screens and never stretch past their target on wide ones — drop cards in
        and forget about media queries.
      </Note>

      {/* ═══════════ B · DIALOG ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        B · Dialog
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        A modal interrupts the page to demand a single decision or capture one piece of input. If
        the user can finish without it, it shouldn&rsquo;t exist.{' '}
        <b className='font-medium text-foreground'>Two-button rule:</b> one Primary (the recommended
        action) and one Secondary or Ghost (the way out).
      </p>

      {/* B·1 Confirm */}
      <SubHead title='Confirm' hint='primary commits · secondary cancels' />
      <DialogStage>
        <Panel>
          <PClose />
          <DialogHeader>
            <StageTitle>Send $1,250.00 to Sarah Chen?</StageTitle>
            <StageDesc>
              From your Everyday account ending 567. Sent via direct credit and settles in seconds —
              once sent, it can&rsquo;t be reversed.
            </StageDesc>
          </DialogHeader>
          <DialogFooter>
            <Button variant='secondary'>Cancel</Button>
            <Button>Send transfer</Button>
          </DialogFooter>
        </Panel>
      </DialogStage>

      {/* B·2 Destructive alert */}
      <SubHead title='Destructive alert' hint='icon-led · ghost cancel + destructive commit' />
      <DialogStage>
        <Panel size='alert'>
          <div className='flex items-start gap-3.5 px-6 pt-6'>
            <AlertBubble tone='danger'>
              <TriangleAlertIcon />
            </AlertBubble>
            <div className='flex flex-col gap-1.5'>
              <StageTitle>Close your Saver account?</StageTitle>
              <StageDesc>
                Your balance of <strong>$28,450.00</strong> will be transferred to your Everyday
                account. This action can&rsquo;t be undone.
              </StageDesc>
            </div>
          </div>
          <DialogFooter>
            <Button variant='ghost'>Keep account</Button>
            <Button variant='destructive'>Close account</Button>
          </DialogFooter>
        </Panel>
      </DialogStage>

      {/* B·3 Form dialog */}
      <SubHead title='Form dialog' hint='lg · never more than three fields' />
      <DialogStage>
        <Panel size='lg'>
          <PClose />
          <DialogHeader>
            <DialogEyebrow>Add a payee</DialogEyebrow>
            <StageTitle>Who are you sending to?</StageTitle>
            <StageDesc>
              Pop in their account number and we&rsquo;ll confirm the name with their bank before
              saving.
            </StageDesc>
          </DialogHeader>
          <DialogBody className='gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-foreground'>
                Account name <span className='text-destructive'>*</span>
              </label>
              <Input placeholder='e.g. Sarah Chen' />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-foreground'>
                Account number <span className='text-destructive'>*</span>
              </label>
              <Input className='font-mono' placeholder='00-0000-0000000-00' />
              <span className='text-[12.5px] text-foreground-muted'>
                We&rsquo;ll match this to the registered name before saving.
              </span>
            </div>
            <label className='flex items-center gap-2.5 text-sm text-foreground'>
              <Checkbox /> Save this payee for next time
            </label>
          </DialogBody>
          <DialogFooter>
            <Button variant='ghost'>Cancel</Button>
            <Button>Continue</Button>
          </DialogFooter>
        </Panel>
      </DialogStage>

      {/* B·4 Success */}
      <SubHead title='Success' hint='single dismiss · the icon does the celebrating' />
      <DialogStage>
        <Panel size='alert'>
          <div className='flex items-start gap-3.5 px-6 pt-6'>
            <AlertBubble tone='success'>
              <CircleCheckIcon />
            </AlertBubble>
            <div className='flex flex-col gap-1.5'>
              <StageTitle>Transfer on its way</StageTitle>
              <StageDesc>
                <strong>$1,250.00</strong> sent to Sarah Chen. She&rsquo;ll see it in her ANZ account
                within a few seconds.
              </StageDesc>
            </div>
          </div>
          <DialogFooter>
            <Button block>Done</Button>
          </DialogFooter>
        </Panel>
      </DialogStage>

      {/* B·5 Live */}
      <SubHead title='Live' hint='the real components — click to open' />
      <Demo>
        <div className='flex flex-wrap gap-3'>
          <Dialog>
            <DialogTrigger render={<Button variant='outline' />}>Open confirm dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send $1,250.00 to Sarah Chen?</DialogTitle>
                <DialogDescription>
                  From your Everyday account ending 567. Once sent, it can&rsquo;t be reversed.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant='secondary' />}>Cancel</DialogClose>
                <DialogClose render={<Button />}>Send transfer</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger render={<Button variant='outline' />}>
              Open destructive alert
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia variant='danger'>
                  <TriangleAlertIcon />
                </AlertDialogMedia>
                <AlertDialogTitle>Close your Saver account?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your balance of $28,450.00 will be transferred to your Everyday account. This
                  can&rsquo;t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep account</AlertDialogCancel>
                <AlertDialogAction variant='destructive'>Close account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Demo>

      {/* B·6 Anatomy & sizes */}
      <SubHead title='Anatomy & sizes' hint='one container · four widths' />
      <div className='overflow-hidden rounded-xl border border-border'>
        <div className='grid grid-cols-[120px_120px_1fr] bg-surface font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
          <div className='px-4 py-3'>API</div>
          <div className='border-l border-border px-4 py-3'>Max-width</div>
          <div className='border-l border-border px-4 py-3'>Use</div>
        </div>
        {[
          ['size="sm"', '400px', 'One-question confirms · single-line copy.'],
          ['size="default"', '480px', 'Default · standard confirms and short forms.'],
          ['size="lg"', '640px', 'Multi-field forms · side-by-side layout.'],
          ['<AlertDialog>', '420px', 'Icon-led destructive / warning / success alerts.'],
        ].map(([token, width, use]) => (
          <div key={token} className='grid grid-cols-[120px_120px_1fr] border-t border-border'>
            <div className='px-4 py-3 font-mono text-[12px] text-foreground'>{token}</div>
            <div className='border-l border-border px-4 py-3 font-mono text-[12px] text-foreground-muted'>
              {width}
            </div>
            <div className='border-l border-border px-4 py-3 text-[13px] leading-snug text-foreground-muted'>
              {use}
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════ C · DO / DON'T ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        C · Do &amp; don&rsquo;t
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        Three patterns that matter across both components.
      </p>

      <DoDont>
        <DoDontCard
          kind='do'
          visualClassName='block bg-surface p-4'
          visual={
            <div className='flex w-full flex-col gap-2'>
              <Card size='sm' className='w-full'>
                <CardHeader>
                  <div>
                    <CardTitle className='text-sm'>Saver</CardTitle>
                    <CardDescription className='font-mono'>
                      12-3401-0871244-00 · $28,450.00
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card size='sm' className='w-full'>
                <CardHeader>
                  <div>
                    <CardTitle className='text-sm'>Everyday</CardTitle>
                    <CardDescription className='font-mono'>
                      12-3401-0234567-00 · $4,182.14
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          }
        >
          <b>One variant per stack.</b> A column of three outlined cards reads as one list — same
          shadow, same border, same padding.
        </DoDontCard>

        <DoDontCard
          kind='dont'
          visualClassName='block bg-surface p-4'
          visual={
            <div className='flex w-full flex-col gap-2'>
              <Card size='sm' variant='elevated' className='w-full'>
                <CardHeader>
                  <div>
                    <CardTitle className='text-sm'>Saver</CardTitle>
                    <CardDescription className='font-mono'>12-3401-0871244-00</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card size='sm' accent='primary' className='w-full'>
                <CardHeader>
                  <div>
                    <CardTitle className='text-sm'>Everyday</CardTitle>
                    <CardDescription className='font-mono'>12-3401-0234567-00</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          }
        >
          <b>Don&rsquo;t mix variants in a list.</b> Different elevations and accents read as
          different categories — the eye asks &ldquo;why is this one different?&rdquo;
        </DoDontCard>

        <DoDontCard
          kind='do'
          visualClassName='block bg-transparent p-0'
          visual={
            <Panel className='max-w-full shadow-[var(--shadow-md)]'>
              <DialogHeader>
                <StageTitle>Send $250 to Sarah?</StageTitle>
                <StageDesc>From Everyday · ending 567.</StageDesc>
              </DialogHeader>
              <DialogFooter>
                <Button variant='secondary' size='sm'>
                  Cancel
                </Button>
                <Button size='sm'>Send</Button>
              </DialogFooter>
            </Panel>
          }
        >
          <b>Two buttons, one decision.</b> Primary commits, Secondary or Ghost backs out — the user
          knows what to do without reading the whole dialog.
        </DoDontCard>

        <DoDontCard
          kind='dont'
          visualClassName='block bg-transparent p-0'
          visual={
            <Panel className='max-w-full shadow-[var(--shadow-md)]'>
              <DialogHeader>
                <StageTitle>Send $250 to Sarah?</StageTitle>
                <StageDesc>From Everyday · ending 567.</StageDesc>
              </DialogHeader>
              <DialogFooter>
                <Button variant='secondary' size='sm'>
                  Cancel
                </Button>
                <Button variant='outline' size='sm'>
                  Save for later
                </Button>
                <Button size='sm'>Send</Button>
              </DialogFooter>
            </Panel>
          }
        >
          <b>Don&rsquo;t pile actions in a footer.</b> Three or more buttons turn a confirm into a
          menu — move the alternatives back to the page that preceded the dialog.
        </DoDontCard>

        <DoDontCard
          kind='do'
          visualClassName='block bg-transparent p-0'
          visual={
            <Panel size='alert' className='max-w-full shadow-[var(--shadow-md)]'>
              <div className='flex items-start gap-3.5 px-6 pt-6'>
                <AlertBubble tone='danger'>
                  <TriangleAlertIcon />
                </AlertBubble>
                <div className='flex flex-col gap-1.5'>
                  <StageTitle>Close your Saver?</StageTitle>
                  <StageDesc>$28,450.00 moves to Everyday.</StageDesc>
                </div>
              </div>
              <DialogFooter>
                <Button variant='ghost' size='sm'>
                  Keep
                </Button>
                <Button variant='destructive' size='sm'>
                  Close
                </Button>
              </DialogFooter>
            </Panel>
          }
        >
          <b>Destructive primary, Ghost cancel.</b> The action is loud; the way out is quiet. Both
          are present.
        </DoDontCard>

        <DoDontCard
          kind='dont'
          visualClassName='block bg-transparent p-0'
          visual={
            <Panel size='alert' className='max-w-full shadow-[var(--shadow-md)]'>
              <div className='flex items-start gap-3.5 px-6 pt-6'>
                <AlertBubble tone='danger'>
                  <TriangleAlertIcon />
                </AlertBubble>
                <div className='flex flex-col gap-1.5'>
                  <StageTitle>Close your Saver?</StageTitle>
                  <StageDesc>$28,450.00 moves to Everyday.</StageDesc>
                </div>
              </div>
              <DialogFooter>
                <Button variant='destructive' size='sm'>
                  Cancel
                </Button>
                <Button variant='destructive' size='sm'>
                  Close
                </Button>
              </DialogFooter>
            </Panel>
          }
        >
          <b>Don&rsquo;t use Destructive twice.</b> Two danger buttons force the user to slow down and
          read every word — the wrong move on a critical decision.
        </DoDontCard>
      </DoDont>
    </Section>
  )
}
