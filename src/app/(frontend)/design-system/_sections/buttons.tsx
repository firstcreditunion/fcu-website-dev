import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  XIcon,
} from 'lucide-react'
import { type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Section } from '../_components/section'
import {
  Demo,
  DemoRow,
  DoDont,
  DoDontCard,
  Note,
  Pill,
  SpecTable,
  Stage,
  SubHead,
  VariantCard,
} from '../_components/showcase'

/* ── States matrix ─────────────────────────────────────────────── */

const STATE_COLS = ['Default', 'Hover', 'Focus', 'Active', 'Disabled', 'Loading', 'Error'] as const

type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'

// Forced-state classes mirror each variant's :hover / :active / :focus-visible look.
const FORCE: Record<Variant, { hover: string; active: string; focus: string }> = {
  default: {
    hover: 'bg-primary-hover',
    active: 'bg-primary-active',
    focus: 'shadow-[var(--shadow-focus)]',
  },
  secondary: {
    hover: 'bg-fcu-secondary-600',
    active: 'bg-fcu-secondary-700 text-neutral-0',
    focus: 'shadow-[var(--shadow-focus)]',
  },
  outline: {
    hover: 'bg-surface-muted border-neutral-400',
    active: 'bg-surface-sunken',
    focus: 'shadow-[var(--shadow-focus)]',
  },
  ghost: {
    hover: 'bg-surface-sunken text-foreground',
    active: 'bg-neutral-200',
    focus: 'shadow-[var(--shadow-focus)]',
  },
  destructive: {
    hover: 'bg-status-danger-700',
    active: 'bg-status-danger-700',
    focus: 'shadow-[0_0_0_3px_color-mix(in_oklch,var(--destructive)_35%,transparent)]',
  },
}

function StateMatrix({
  variant,
  name,
  token,
  hint,
  label,
  na = [],
}: {
  variant: Variant
  name: string
  token: string
  hint: string
  label: string
  na?: string[]
}) {
  const f = FORCE[variant]
  const cell = (state: string): ReactNode => {
    if (na.includes(state))
      return <span className='font-mono text-[11px] text-foreground-subtle'>n/a</span>
    switch (state) {
      case 'Hover':
        return (
          <Button variant={variant} className={f.hover}>
            {label}
          </Button>
        )
      case 'Focus':
        return (
          <Button variant={variant} className={f.focus}>
            {label}
          </Button>
        )
      case 'Active':
        return (
          <Button variant={variant} className={f.active}>
            {label}
          </Button>
        )
      case 'Disabled':
        return (
          <Button variant={variant} disabled>
            {label}
          </Button>
        )
      case 'Loading':
        return (
          <Button variant={variant} loading>
            {label}
          </Button>
        )
      case 'Error':
        return (
          <Button variant={variant} error>
            {label}
          </Button>
        )
      default:
        return <Button variant={variant}>{label}</Button>
    }
  }
  return (
    <>
      <SubHead title={name} hint={hint} />
      <div className='overflow-x-auto'>
        <div className='grid min-w-[860px] grid-cols-[110px_repeat(7,1fr)] gap-px overflow-hidden rounded-xl border border-border bg-border'>
          <div className='flex items-center bg-surface px-3.5 py-3 font-mono text-[10.5px] uppercase tracking-[0.04em] text-foreground-subtle'>
            State
          </div>
          {STATE_COLS.map((s) => (
            <div
              key={s}
              className='flex items-center bg-surface px-3.5 py-3 font-mono text-[10.5px] uppercase tracking-[0.04em] text-foreground-subtle'
            >
              {s}
            </div>
          ))}
          <div className='flex items-center bg-surface px-3.5 py-4 font-mono text-[11px] text-foreground'>
            {token}
          </div>
          {STATE_COLS.map((s) => (
            <div key={s} className='flex items-center justify-center bg-card px-3.5 py-4'>
              {cell(s)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Anatomy callout ───────────────────────────────────────────── */

/* ── In-context mockups ────────────────────────────────────────── */

function ContextCard({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-xs)] ${className ?? ''}`}
    >
      <div className='px-6 pt-5 font-mono text-[10.5px] uppercase tracking-[0.04em] text-foreground-subtle'>
        {label}
      </div>
      {children}
    </div>
  )
}

function PayeeRow({ name, detail }: { name: string; detail: string }) {
  return (
    <div className='flex items-center gap-4 border-t border-border px-6 py-3 first:border-t-0'>
      <div className='min-w-0 flex-1'>
        <div className='text-[13.5px] font-medium text-foreground'>{name}</div>
        <div className='truncate font-mono text-[11px] text-foreground-subtle'>{detail}</div>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm'>
          Edit
        </Button>
        <Button size='sm'>Send money</Button>
      </div>
    </div>
  )
}

export function Buttons() {
  return (
    <Section
      id='buttons'
      num='Component'
      title='Button'
      description='How members commit to an action. Every flow — from opening an account to confirming a transfer — pivots on a single, clearly-ranked button. Eight variants for eight jobs on the 32 / 40 / 48 size scale; the right one is almost always obvious.'
    >
      {/* 01 — Variants */}
      <SubHead title='Variants' hint='hierarchy, not colour' />
      <p className='mb-5 max-w-[70ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        Variant choice is a hierarchy decision, not a colour one. Pick the variant that matches how
        loud the action should be. A screen should usually have exactly one Primary; everything else
        falls in line behind it.
      </p>

      <VariantCard
        name='Primary'
        token={'variant="default"  ·  bg --primary'}
        example={
          <>
            <Button>Open account</Button>
            <Button size='sm'>Continue</Button>
          </>
        }
      >
        <b>One per screen.</b> The single most important action — submit a form, complete a transfer,
        open an account. If you find yourself wanting two primaries on one screen, you almost
        certainly want a Secondary alongside instead.
      </VariantCard>

      <VariantCard
        name='Secondary'
        token={'variant="secondary"  ·  bg --fcu-secondary-500'}
        example={
          <>
            <Button variant='secondary'>Save draft</Button>
            <Button variant='secondary' size='sm'>
              Cancel
            </Button>
          </>
        }
      >
        <b>Pairs with Primary.</b> The &ldquo;and also&rdquo; action — Cancel, Save Draft, Go Back.
        Sits next to a Primary in modal footers and form bars. Reads as a real button without
        competing with the Primary for attention.
      </VariantCard>

      <VariantCard
        name='Outline'
        token={'variant="outline"  ·  border --border-strong'}
        example={
          <>
            <Button variant='outline'>Add account</Button>
            <Button variant='outline' size='sm'>
              Filter
            </Button>
          </>
        }
      >
        <b>Tertiary on a busy surface.</b> When you need more presence than Ghost but less than
        Secondary — typically toolbars, filter chips, or &ldquo;add new&rdquo; affordances inside
        cards.
      </VariantCard>

      <VariantCard
        name='Ghost'
        token={'variant="ghost"  ·  transparent'}
        example={
          <>
            <Button variant='ghost'>View details</Button>
            <Button variant='ghost' size='icon' aria-label='Settings'>
              <SettingsIcon />
            </Button>
          </>
        }
      >
        <b>Quiet actions.</b> Icon toolbars, table row actions, &ldquo;more&rdquo; menus. Disappears
        at rest and reveals on hover. Never use as a screen&rsquo;s main CTA — there&rsquo;s nothing
        for the eye to land on.
      </VariantCard>

      <VariantCard
        name='Destructive'
        token={'variant="destructive" / "destructive-outline"  ·  bg --destructive'}
        example={
          <>
            <Button variant='destructive'>Delete account</Button>
            <Button variant='destructive-outline' size='sm'>
              Remove
            </Button>
          </>
        }
      >
        <b>Irreversible only.</b> Deleting an account, cancelling a recurring payment, closing a
        session for all devices. The outline variant is for confirmable danger inside lists (e.g.
        removing a payee). Never use for &ldquo;Close&rdquo; or &ldquo;Cancel&rdquo; — those are
        Secondary.
      </VariantCard>

      <VariantCard
        name='Link'
        token={'variant="link"  ·  no chrome'}
        example={<Button variant='link'>Learn more about KiwiSaver</Button>}
      >
        <b>In-prose actions.</b> When a button needs to read as part of a paragraph or sit inline
        with body text. Acts like a hyperlink but participates in the button accessibility contract.
      </VariantCard>

      <VariantCard
        name='Brand'
        badge={<Pill>reserved</Pill>}
        token={'variant="brand"  ·  bg --brand-accent'}
        example={<Button variant='brand'>Join First Credit Union</Button>}
      >
        <b>For brand moments only.</b> Marketing landing pages, membership invitations, the welcome
        screen after sign-up — places where leaning on the FCU green/yellow is deliberate. Do not use
        inside the authenticated product.
      </VariantCard>

      {/* 02 — Sizes */}
      <SubHead title='Sizes' hint='sm 32 · md 40 · lg 48' />
      <Demo>
        <DemoRow name='size="sm"' sub='32px · text 13 · radius md'>
          <Button size='sm'>Continue</Button>
          <Button variant='secondary' size='sm'>
            Cancel
          </Button>
          <Button variant='outline' size='sm'>
            Filter
          </Button>
          <Button variant='ghost' size='sm'>
            Skip
          </Button>
        </DemoRow>
        <DemoRow name='size="default"' sub={<>40px · text 14 · radius lg&nbsp;&nbsp;· default</>}>
          <Button>Continue</Button>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='outline'>Filter</Button>
          <Button variant='ghost'>Skip</Button>
        </DemoRow>
        <DemoRow name='size="lg"' sub='48px · text 15 · radius lg'>
          <Button size='lg'>Open an account</Button>
          <Button variant='secondary' size='lg'>
            Maybe later
          </Button>
        </DemoRow>
      </Demo>
      <Note>
        <b>Hit target.</b> Even the small button keeps a 32px height — taller than its visual padding
        to preserve a comfortable touch target. <b>md (40px) matches input height</b>, so buttons and
        inputs align in form bars with no extra work. On mobile, default to md minimum.
      </Note>

      {/* 03 — States */}
      <SubHead title='States' hint='hover & focus are independent' />
      <p className='mb-2 max-w-[70ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        Every interactive variant carries the same states. Hover and focus are independent — a
        focused button that isn&rsquo;t hovered still shows its ring. Disabled is the only state that
        suppresses focus.
      </p>
      <StateMatrix variant='default' name='Primary' token='variant="default"' hint='filled brand blue' label='Continue' />
      <StateMatrix
        variant='secondary'
        name='Secondary'
        token='variant="secondary"'
        hint='brand green'
        label='Cancel'
        na={['Error']}
      />
      <StateMatrix
        variant='outline'
        name='Outline'
        token='variant="outline"'
        hint='1px border'
        label='Filter'
        na={['Error']}
      />
      <StateMatrix
        variant='ghost'
        name='Ghost'
        token='variant="ghost"'
        hint='no chrome at rest'
        label='Skip'
        na={['Loading', 'Error']}
      />
      <StateMatrix
        variant='destructive'
        name='Destructive'
        token='variant="destructive"'
        hint='irreversible actions'
        label='Delete'
        na={['Error']}
      />
      <Note variant='warning'>
        <b>Loading replaces, never appends.</b> When a button enters the loading state, the label is
        hidden in place and a centred spinner appears. Don&rsquo;t insert a spinner next to the label
        — it shifts layout and reads as two states stacked.
      </Note>

      {/* 04 — With icons */}
      <SubHead title='With icons' hint='leading clarifies · trailing signals transition' />
      <Demo>
        <DemoRow name='Leading icon' sub='clarifies the action'>
          <Button>
            <PlusIcon /> Add account
          </Button>
          <Button variant='secondary'>
            <DownloadIcon /> Download statement
          </Button>
          <Button variant='outline' size='sm'>
            <SendIcon /> Send
          </Button>
        </DemoRow>
        <DemoRow name='Trailing icon' sub='signals a transition'>
          <Button>
            Continue <ArrowRightIcon />
          </Button>
          <Button variant='link'>
            Read disclosure <ExternalLinkIcon />
          </Button>
        </DemoRow>
        <DemoRow name='Icon only' sub='aria-label required'>
          <Button size='icon' aria-label='Add'>
            <PlusIcon />
          </Button>
          <Button variant='secondary' size='icon' aria-label='Search'>
            <SearchIcon />
          </Button>
          <Button variant='outline' size='icon' aria-label='Filter'>
            <FilterIcon />
          </Button>
          <Button variant='ghost' size='icon' aria-label='More'>
            <MoreHorizontalIcon />
          </Button>
          <Button variant='ghost' size='icon-sm' aria-label='Close'>
            <XIcon />
          </Button>
        </DemoRow>
        <DemoRow name='Full width' sub='mobile / single-action'>
          <div className='flex w-full max-w-80 flex-col gap-2'>
            <Button block>Continue to verification</Button>
            <Button variant='ghost' block>
              Save and finish later
            </Button>
          </div>
        </DemoRow>
      </Demo>

      {/* 05 — Button group */}
      <SubHead title='Button group' hint='segmented · 2–4 options' />
      <Demo>
        <DemoRow name='segmented' sub='mutually exclusive · 1 selected'>
          <div
            role='group'
            aria-label='View'
            className='inline-flex items-stretch gap-0.5 rounded-lg border border-border bg-surface p-1 shadow-[var(--shadow-xs)]'
          >
            {['Day', 'Week', 'Month', 'Year'].map((opt, i) => (
              <button
                key={opt}
                aria-pressed={i === 0}
                className='cursor-pointer rounded-md px-3.5 py-1.5 text-[13px] font-medium text-foreground-muted transition-colors hover:bg-neutral-100 hover:text-foreground aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-[var(--shadow-xs)]'
              >
                {opt}
              </button>
            ))}
          </div>
        </DemoRow>
        <DemoRow name='action row' sub='independent buttons'>
          <Stage>
            <Button variant='outline' size='sm'>
              Export CSV
            </Button>
            <Button variant='outline' size='sm'>
              Print
            </Button>
            <Button variant='outline' size='sm'>
              Share
            </Button>
          </Stage>
        </DemoRow>
      </Demo>

      {/* 06 — Anatomy & spec */}
      <SubHead title='Anatomy & spec' hint='token-driven recipe' />
      <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
        <div
          className='grid min-h-72 place-items-center rounded-xl border border-border bg-surface p-20'
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--neutral-200) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        >
          <div className='relative inline-block'>
            <Button className='pointer-events-none'>
              <PlusIcon /> Add account
            </Button>
            <span className='absolute top-1/2 right-full mr-7 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] text-foreground-muted'>
              height · --btn-h
            </span>
            <span className='absolute bottom-full left-1/2 mb-7 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-foreground-muted'>
              padding · --btn-px
            </span>
            <span className='absolute top-full left-1/2 mt-7 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-foreground-muted'>
              icon · --btn-icon-size
            </span>
          </div>
        </div>
        <SpecTable
          columns={['Token', 'sm', 'md', 'lg']}
          rows={[
            { token: '--btn-h', values: ['32px', '40px', '48px'] },
            { token: '--btn-px', values: ['12px', '16px', '22px'] },
            { token: '--btn-gap', values: ['6px', '8px', '10px'] },
            { token: 'font-size', values: ['13px', '14px', '15px'] },
            { token: 'icon-size', values: ['16px', '18px', '20px'] },
            { token: 'radius', values: ['--radius-md', '--radius-lg', '--radius-lg'] },
          ]}
        />
      </div>

      {/* 07 — In context */}
      <SubHead title='In context' hint='real work' />
      <div className='grid gap-4 md:grid-cols-2'>
        <ContextCard label='Modal · confirm transfer'>
          <div className='flex-1 px-6 pt-1 pb-4'>
            <h4 className='mt-1 mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground'>
              Send $1,250.00 to Sarah Chen?
            </h4>
            <p className='m-0 text-[13.5px] leading-relaxed text-foreground-muted'>
              Transfers between First Credit Union accounts settle in seconds and can&rsquo;t be
              reversed once confirmed.
            </p>
          </div>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border bg-surface-muted px-6 py-4'>
            <Button variant='secondary'>Cancel</Button>
            <Button>Send transfer</Button>
          </div>
        </ContextCard>

        <ContextCard label='Modal · destructive confirm'>
          <div className='flex-1 px-6 pt-1 pb-4'>
            <h4 className='mt-1 mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground'>
              Close savings account?
            </h4>
            <p className='m-0 text-[13.5px] leading-relaxed text-foreground-muted'>
              Your balance of <b className='font-medium text-foreground'>$0.18</b> will be transferred
              to your everyday account. This action can&rsquo;t be undone.
            </p>
          </div>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border bg-surface-muted px-6 py-4'>
            <Button variant='ghost'>Keep account</Button>
            <Button variant='destructive'>Close account</Button>
          </div>
        </ContextCard>

        <ContextCard label='Table · payees' className='md:col-span-2'>
          <div className='pt-2'>
            <PayeeRow name='Sarah Chen' detail='12-3401-0234567-00 · last sent 2 days ago' />
            <PayeeRow name='Auckland Council · Rates' detail='02-1100-7842910-00 · scheduled monthly' />
            <PayeeRow name='Vector Energy' detail='03-0518-0044721-00 · last sent 12 days ago' />
          </div>
        </ContextCard>

        <ContextCard label='Form bar · membership application' className='md:col-span-2'>
          <div className='flex-1 px-6 pt-1 pb-4'>
            <h4 className='mt-1 mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground'>
              Step 3 of 5 — Identity
            </h4>
            <p className='m-0 text-[13.5px] leading-relaxed text-foreground-muted'>
              Upload a photo of your driver&rsquo;s licence or passport. We&rsquo;ll verify it
              through the Department of Internal Affairs.
            </p>
          </div>
          <div className='flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface-muted px-6 py-4'>
            <Button variant='ghost'>
              <ChevronLeftIcon /> Back
            </Button>
            <Stage>
              <Button variant='secondary'>Save &amp; continue later</Button>
              <Button>
                Continue <ChevronRightIcon />
              </Button>
            </Stage>
          </div>
        </ContextCard>
      </div>

      {/* 08 — Do & Don't */}
      <SubHead title="Do & don't" hint='five patterns' />
      <DoDont>
        <DoDontCard
          kind='do'
          visual={
            <>
              <Button variant='secondary'>Cancel</Button>
              <Button>Send transfer</Button>
            </>
          }
        >
          <b>One Primary, paired with Secondary.</b> The eye lands immediately on the action you
          intend the member to take.
        </DoDontCard>
        <DoDontCard
          kind='dont'
          visual={
            <>
              <Button>Cancel</Button>
              <Button>Send transfer</Button>
            </>
          }
        >
          <b>Two Primaries compete</b> for attention. The member has to read both before deciding, and
          the visual hierarchy disappears.
        </DoDontCard>

        <DoDontCard
          kind='do'
          visual={
            <>
              <Button variant='destructive'>Close account</Button>
              <Button variant='ghost'>Keep account</Button>
            </>
          }
        >
          <b>Destructive is the loud one.</b> When something irreversible is the right call, make it
          the most prominent button — never bury it behind a Ghost.
        </DoDontCard>
        <DoDontCard
          kind='dont'
          visual={
            <>
              <Button variant='ghost'>Close account</Button>
              <Button>Keep account</Button>
            </>
          }
        >
          <b>Don&rsquo;t disguise destructive actions</b> behind Ghost buttons. A serious action
          deserves a serious-looking button.
        </DoDontCard>

        <DoDontCard kind='do' visual={<Button loading>Sending…</Button>}>
          <b>Replace the label in place</b> when loading. Width is preserved, layout doesn&rsquo;t
          reflow, and the user knows their click landed.
        </DoDontCard>
        <DoDontCard
          kind='dont'
          visual={
            <Button>
              <SettingsIcon className='animate-spin' /> Sending… please wait
            </Button>
          }
        >
          <b>Don&rsquo;t append a spinner and grow the label.</b> The button reflows mid-click and
          reads as two states stacked.
        </DoDontCard>

        <DoDontCard kind='do' visual={<Button variant='brand'>Join First Credit Union</Button>}>
          <b>Save brand green for brand moments.</b> Marketing pages, the welcome screen, membership
          invitations — places where the FCU palette is the point.
        </DoDontCard>
        <DoDontCard kind='dont' visual={<Button variant='brand'>Send transfer</Button>}>
          <b>Don&rsquo;t use Brand inside the product.</b> It steals attention from real CTAs and
          quickly turns the interface noisy.
        </DoDontCard>

        <DoDontCard
          kind='do'
          visualClassName='bg-neutral-900'
          visual={
            <Button variant='ghost' size='icon' aria-label='Close' className='text-neutral-0 hover:bg-white/10 hover:text-neutral-0'>
              <XIcon />
            </Button>
          }
        >
          <b>Icon-only buttons must have an aria-label.</b> Screen readers read it aloud; without it,
          the button is silent.
        </DoDontCard>
        <DoDontCard
          kind='dont'
          visualClassName='bg-neutral-900'
          visual={
            <Button variant='ghost' size='icon' className='text-neutral-0 hover:bg-white/10 hover:text-neutral-0'>
              <XIcon />
            </Button>
          }
        >
          <b>Don&rsquo;t ship an icon button without a label.</b> A naked SVG is invisible to
          assistive tech and keyboard-only users.
        </DoDontCard>
      </DoDont>
    </Section>
  )
}
