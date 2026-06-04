import { Fragment, type ReactNode } from 'react'
import {
  InfoIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
  CircleAlertIcon,
  BellIcon,
  LockIcon,
  StarIcon,
  CheckIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertClose,
} from '@/components/ui/alert'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Section } from '../_components/section'
import { Note, SubHead } from '../_components/showcase'

/* ── Local helpers ── */

function AlertLink({ children }: { children: ReactNode }) {
  return (
    <button
      type='button'
      className='text-[13px] font-medium text-current underline-offset-4 outline-none hover:underline focus-visible:underline'
    >
      {children}
    </button>
  )
}

/** Notification-bell host for the counter demo. */
function BellHost({ size = 40, children }: { size?: number; children: ReactNode }) {
  return (
    <span
      className='relative inline-flex items-center justify-center rounded-md border border-border bg-surface text-foreground-muted'
      style={{ width: size, height: size }}
    >
      <BellIcon className='size-5' />
      {children}
    </span>
  )
}

const badgeRows = [
  { v: 'neutral', label: 'Idle' },
  { v: 'primary', label: 'Active' },
  { v: 'success', label: 'Sent' },
  { v: 'warning', label: 'Pending' },
  { v: 'danger', label: 'Failed' },
  { v: 'info', label: 'Draft' },
] as const

const headCell =
  'bg-surface font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'

const activity = [
  { initials: 'SC', tone: 'from-fcu-primary-400 to-fcu-primary-700', name: 'Sarah Chen', sub: 'June groceries', badge: ['success', 'Sent'], amount: '−$1,250.00', pos: false },
  { initials: 'AC', tone: 'from-neutral-400 to-neutral-600', name: 'Auckland Council · Rates', sub: 'Direct debit', badge: ['danger', 'Failed'], amount: '−$184.00', pos: false },
  { initials: 'SI', tone: 'from-neutral-500 to-neutral-700', name: 'Spark NZ', sub: 'Card payment', badge: ['warning', 'Pending'], amount: '−$65.00', pos: false },
  { initials: 'PA', tone: 'from-fcu-primary-600 to-fcu-primary-900', name: 'Payroll · Acme Ltd', sub: 'Salary', badge: ['success', 'Received'], amount: '+$3,842.50', pos: true },
] as const

export function AlertBadge() {
  return (
    <Section
      id='alert-badge'
      num='Component'
      title='Alert & Badge'
      description={
        <>
          Two ways to communicate state. <b className='font-medium text-foreground'>Alert</b> blocks
          a region of the page to say something happened — a failed payment, a successful update, a
          new disclosure. <b className='font-medium text-foreground'>Badge</b> is the tiny inline
          label that marks a row&rsquo;s status without interrupting anything. Same status colours,
          different ambition.
        </>
      }
    >
      {/* ═══════════ A · ALERT ═══════════ */}
      <h3 className='mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        A · Alert
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        Use the four statuses honestly — <b className='font-medium text-foreground'>danger</b> means
        money was lost or access denied; <b className='font-medium text-foreground'>warning</b> means
        an action is needed but not urgent; <b className='font-medium text-foreground'>success</b>{' '}
        confirms; <b className='font-medium text-foreground'>info</b> is everything else.
      </p>

      <SubHead title='Variants' hint='icon · title · message · optional actions' />
      <div className='flex flex-col gap-3'>
        <Alert variant='info'>
          <AlertIcon>
            <InfoIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Statement period ends Friday</AlertTitle>
            <AlertDescription>
              Your May statement covers transactions up to 11:59 pm Friday 30 May. We&rsquo;ll email
              it the following business day.
            </AlertDescription>
          </AlertContent>
        </Alert>

        <Alert variant='success'>
          <AlertIcon>
            <CircleCheckIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Transfer sent</AlertTitle>
            <AlertDescription>
              <strong>$1,250.00</strong> on its way to Sarah Chen. Should arrive within a few
              seconds.
            </AlertDescription>
          </AlertContent>
        </Alert>

        <Alert variant='warning'>
          <AlertIcon>
            <TriangleAlertIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Verify your email</AlertTitle>
            <AlertDescription>
              We sent a confirmation link to <strong>m.te.awa@gmail.com</strong> two days ago. Some
              features stay locked until you click it.
            </AlertDescription>
            <AlertActions>
              <AlertLink>Resend email</AlertLink>
            </AlertActions>
          </AlertContent>
        </Alert>

        <Alert variant='danger'>
          <AlertIcon>
            <CircleAlertIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Direct debit didn&rsquo;t go through</AlertTitle>
            <AlertDescription>
              Auckland Council · Rates · <strong>$184.00</strong>. Funds were short by $12.40 —
              we&rsquo;ll retry on Friday.
            </AlertDescription>
            <AlertActions>
              <AlertLink>Change account</AlertLink>
              <AlertLink>Top up</AlertLink>
            </AlertActions>
          </AlertContent>
        </Alert>

        <Alert variant='neutral'>
          <AlertIcon>
            <InfoIcon />
          </AlertIcon>
          <AlertContent>
            <AlertDescription>
              First Credit Union is closed for Matariki on Friday 21 June. Anything scheduled for
              that day will settle Monday morning.
            </AlertDescription>
          </AlertContent>
        </Alert>
      </div>

      <SubHead title='Dismissible' hint='never on danger · persist the dismissal' />
      <Alert variant='info'>
        <AlertIcon>
          <InfoIcon />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>New: scheduled transfers</AlertTitle>
          <AlertDescription>
            You can now line up recurring transfers up to 12 months in advance from the Transfer
            screen.
          </AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>

      <SubHead title='Inline' hint='short status inside a card or form' />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Two-factor authentication</CardTitle>
            <CardDescription>An extra layer of security on sign-in.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <Alert variant='success' display='inline'>
            <AlertIcon>
              <CircleCheckIcon />
            </AlertIcon>
            <AlertContent>
              <AlertDescription>Authenticator app paired and verified.</AlertDescription>
            </AlertContent>
          </Alert>
          <p className='m-0 text-sm leading-relaxed text-foreground-muted'>
            You&rsquo;ll be asked for a 6-digit code from your authenticator app on every sign-in
            from a new device.
          </p>
        </CardContent>
      </Card>

      <SubHead title='Banner' hint='full-bleed · flush to a region edge' />
      <div className='overflow-hidden rounded-xl border border-border'>
        <Alert variant='warning' display='banner'>
          <AlertIcon>
            <TriangleAlertIcon />
          </AlertIcon>
          <AlertContent>
            <AlertDescription>
              <strong>Scheduled maintenance</strong> · Online banking will be briefly unavailable
              from 2:00–2:30 am Sunday.
            </AlertDescription>
          </AlertContent>
          <AlertActions>
            <AlertLink>Learn more</AlertLink>
          </AlertActions>
          <AlertClose />
        </Alert>
        <div className='bg-card px-7 py-7 text-sm text-foreground-muted'>
          App content sits here — the banner anchors to the top edge of this region.
        </div>
      </div>

      {/* ═══════════ B · BADGE ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        B · Badge
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        The status label that lives in table rows, card headers, and nav. Two emphasis levels —{' '}
        <b className='font-medium text-foreground'>subtle</b> (tinted, the default) and{' '}
        <b className='font-medium text-foreground'>solid</b> (filled). Never more than one solid
        badge per row — the eye lands on one &ldquo;look at me&rdquo; at a time.
      </p>

      <SubHead title='Variants' hint='six statuses × two emphasis levels' />
      <div className='grid grid-cols-[100px_1fr_1fr] overflow-hidden rounded-xl border border-border bg-card [&>*]:flex [&>*]:min-w-0 [&>*]:items-center [&>*]:gap-3 [&>*]:border-t [&>*]:border-l [&>*]:border-border [&>*]:px-4 [&>*]:py-3.5 [&>*:nth-child(-n+3)]:border-t-0 [&>*:nth-child(3n+1)]:border-l-0'>
        <div className={headCell}>Status</div>
        <div className={headCell}>Subtle</div>
        <div className={headCell}>Solid</div>
        {badgeRows.map((b) => (
          <Fragment key={b.v}>
            <div className='font-mono text-[11px] font-medium text-foreground'>{b.v}</div>
            <div>
              <Badge variant={b.v} dot>
                {b.label}
              </Badge>
            </div>
            <div>
              <Badge variant={b.v} solid>
                {b.label}
              </Badge>
            </div>
          </Fragment>
        ))}
      </div>

      <SubHead title='Sizes' hint='sm · md · lg' />
      <div className='flex flex-wrap items-center gap-3.5 rounded-lg border border-border bg-card px-[18px] py-4'>
        <Badge size='sm' variant='success' dot>
          Sent
        </Badge>
        <Badge variant='success' dot>
          Sent
        </Badge>
        <Badge size='lg' variant='success' dot>
          Sent
        </Badge>
        <span className='ml-auto font-mono text-[11px] text-foreground-subtle'>
          sm · md · lg
        </span>
      </div>

      <SubHead title='Composition' hint='dot · icon · label' />
      <div className='flex flex-wrap items-center gap-3.5 rounded-lg border border-border bg-card px-[18px] py-4'>
        <Badge variant='success'>Sent</Badge>
        <Badge variant='success' dot>
          Sent
        </Badge>
        <Badge variant='success'>
          <CheckIcon />
          Sent
        </Badge>
        <Badge variant='primary'>
          <StarIcon />
          Pro member
        </Badge>
        <Badge variant='neutral'>
          <LockIcon />
          Locked
        </Badge>
        <span className='ml-auto font-mono text-[11px] text-foreground-subtle'>
          label · dot · icon
        </span>
      </div>

      <SubHead title='Counter' hint='unread / notification counts' />
      <div className='flex flex-wrap items-center gap-5 rounded-lg border border-border bg-card px-[18px] py-4'>
        <BellHost>
          <Badge counter solid variant='primary' className='absolute -top-1 -right-1 border-2 border-card'>
            3
          </Badge>
        </BellHost>
        <BellHost>
          <Badge counter solid variant='danger' className='absolute -top-1 -right-1 border-2 border-card'>
            9+
          </Badge>
        </BellHost>
        <Badge counter variant='primary'>
          12
        </Badge>
        <Badge counter solid variant='neutral'>
          128
        </Badge>
        <span className='ml-auto font-mono text-[11px] text-foreground-subtle'>counter</span>
      </div>

      {/* ═══════════ C · IN CONTEXT ═══════════ */}
      <h3 className='mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        C · In context
      </h3>
      <p className='mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        A dashboard moment where Alerts surface page-level messages and Badges live quietly inside
        data rows.
      </p>
      <Card className='overflow-hidden'>
        <Alert variant='warning' display='banner'>
          <AlertIcon>
            <TriangleAlertIcon />
          </AlertIcon>
          <AlertContent>
            <AlertDescription>
              <strong>Action needed</strong> · Your Auckland Council direct debit failed yesterday —
              top up to retry.
            </AlertDescription>
          </AlertContent>
          <AlertActions>
            <AlertLink>Resolve</AlertLink>
          </AlertActions>
          <AlertClose />
        </Alert>
        <div className='p-6'>
          <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
            <h4 className='m-0 flex items-center gap-2 text-[17px] font-semibold tracking-[-0.012em] text-foreground'>
              Recent activity
              <Badge variant='neutral'>128 total</Badge>
            </h4>
            <div className='inline-flex items-center gap-2'>
              <BellHost size={36}>
                <Badge
                  counter
                  solid
                  variant='primary'
                  className='absolute -top-1 -right-1 border-2 border-card'
                >
                  3
                </Badge>
              </BellHost>
              <Button variant='outline' size='sm'>
                View all
              </Button>
            </div>
          </div>
          <div className='flex flex-col'>
            {activity.map((a) => (
              <div
                key={a.name}
                className='flex items-center gap-3.5 border-t border-border py-3 first:border-t-0'
              >
                <span
                  className={cn(
                    'inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-semibold text-white',
                    a.tone
                  )}
                >
                  {a.initials}
                </span>
                <div className='min-w-0 flex-1'>
                  <div className='text-sm font-medium text-foreground'>{a.name}</div>
                  <div className='font-mono text-[11.5px] text-foreground-subtle'>{a.sub}</div>
                </div>
                <Badge variant={a.badge[0]} dot>
                  {a.badge[1]}
                </Badge>
                <span
                  className={cn(
                    'min-w-[84px] text-right font-mono text-[13px] font-medium',
                    a.pos ? 'text-status-success-700' : 'text-foreground'
                  )}
                >
                  {a.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Note>
        <b>Rule of one.</b> One Alert per region, one solid Badge per row. Both are loud by design —
        letting them stack turns the screen into a colour test.
      </Note>
    </Section>
  )
}
