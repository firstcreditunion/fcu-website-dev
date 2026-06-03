import { type ReactNode } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Section } from '../_components/section'
import { Demo, DoDont, DoDontCard, Note, SubHead } from '../_components/showcase'

/** A control row: indicator + label (+ optional description). */
function Opt({
  control,
  label,
  desc,
}: {
  control: ReactNode
  label: ReactNode
  desc?: string
}) {
  return (
    <div className='flex items-start gap-2.5 py-1.5'>
      <div className='mt-0.5'>{control}</div>
      <div className='flex min-w-0 flex-col'>
        <span className='text-sm leading-snug font-medium text-foreground'>{label}</span>
        {desc ? <span className='text-[12.5px] leading-snug text-foreground-muted'>{desc}</span> : null}
      </div>
    </div>
  )
}

function MatrixCell({ children }: { children: ReactNode }) {
  return <div className='flex items-center justify-center bg-card px-4 py-5'>{children}</div>
}

export function Selection() {
  return (
    <Section
      id='selection'
      num='Component'
      title='Checkbox · Radio · Switch'
      description='Three selection controls on one shared chassis — 18px indicator, 1.5px border, a 28px hit-row, and a 500-weight label with an optional description line. The difference is intent: checkbox = many independent choices, radio = one from a set, switch = a setting that applies instantly.'
    >
      {/* ── A · Checkbox ── */}
      <h3 className='mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        A · Checkbox
      </h3>

      <SubHead title='Variants' hint='label + optional description' />
      <Demo>
        <div className='flex flex-col gap-1'>
          <Opt control={<Checkbox defaultChecked />} label='Email me about new features' />
          <Opt
            control={<Checkbox defaultChecked />}
            label='Paperless statements'
            desc='We’ll email your monthly statement instead of posting it.'
          />
          <Opt control={<Checkbox />} label='Round up purchases to save the change' />
        </div>
      </Demo>

      <SubHead title='States' hint='checked · indeterminate · error' />
      <div className='overflow-x-auto'>
        <div className='grid min-w-[640px] grid-cols-[repeat(5,1fr)] gap-px overflow-hidden rounded-xl border border-border bg-border'>
          {['Unchecked', 'Checked', 'Indeterminate', 'Disabled', 'Error'].map((h) => (
            <div
              key={h}
              className='bg-surface px-4 py-3 text-center font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'
            >
              {h}
            </div>
          ))}
          <MatrixCell>
            <Checkbox />
          </MatrixCell>
          <MatrixCell>
            <Checkbox defaultChecked />
          </MatrixCell>
          <MatrixCell>
            <Checkbox indeterminate />
          </MatrixCell>
          <MatrixCell>
            <Checkbox defaultChecked disabled />
          </MatrixCell>
          <MatrixCell>
            <Checkbox aria-invalid />
          </MatrixCell>
        </div>
      </div>

      <SubHead title='Sizes' hint='sm 16 · md 18 · lg 20' />
      <Demo>
        <div className='flex items-center gap-8'>
          <Opt control={<Checkbox size='sm' defaultChecked />} label='Small' />
          <Opt control={<Checkbox defaultChecked />} label='Medium' />
          <Opt control={<Checkbox size='lg' defaultChecked />} label='Large' />
        </div>
      </Demo>

      <SubHead title='Card group' hint='bordered, selectable' />
      <div className='grid gap-2 sm:grid-cols-3'>
        {[
          { t: 'Everyday', d: 'No fees · instant transfers', checked: true },
          { t: 'Savings', d: '4.85% p.a. · 90-day notice', checked: false },
          { t: 'Term deposit', d: 'Lock in for 6–24 months', checked: false },
        ].map((c) => (
          <label
            key={c.t}
            className='flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-strong hover:bg-surface has-data-checked:border-primary has-data-checked:bg-primary-subtle'
          >
            <Checkbox defaultChecked={c.checked} className='mt-0.5' />
            <span className='flex flex-col'>
              <span className='text-sm font-medium text-foreground'>{c.t}</span>
              <span className='text-[12.5px] leading-snug text-foreground-muted'>{c.d}</span>
            </span>
          </label>
        ))}
      </div>

      {/* ── B · Radio ── */}
      <h3 className='mt-12 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        B · Radio
      </h3>

      <SubHead title='Inline group' hint='one choice from a set' />
      <Demo>
        <RadioGroup defaultValue='fortnightly' className='gap-1'>
          <Opt control={<RadioGroupItem value='weekly' />} label='Weekly' />
          <Opt
            control={<RadioGroupItem value='fortnightly' />}
            label='Fortnightly'
            desc='Most members choose this — it matches a typical pay cycle.'
          />
          <Opt control={<RadioGroupItem value='monthly' />} label='Monthly' />
          <Opt control={<RadioGroupItem value='paused' disabled />} label='Paused (unavailable)' />
        </RadioGroup>
      </Demo>

      <SubHead title='Card group' hint='radio, one selected' />
      <RadioGroup defaultValue='instant' className='grid gap-2 sm:grid-cols-3'>
        {[
          { v: 'instant', t: 'Instant', d: 'Arrives in seconds' },
          { v: 'standard', t: 'Standard', d: 'Same business day' },
          { v: 'scheduled', t: 'Scheduled', d: 'Pick a future date' },
        ].map((c) => (
          <label
            key={c.v}
            className='flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-border-strong hover:bg-surface has-data-checked:border-primary has-data-checked:bg-primary-subtle'
          >
            <RadioGroupItem value={c.v} className='mt-0.5' />
            <span className='flex flex-col'>
              <span className='text-sm font-medium text-foreground'>{c.t}</span>
              <span className='text-[12.5px] leading-snug text-foreground-muted'>{c.d}</span>
            </span>
          </label>
        ))}
      </RadioGroup>

      {/* ── C · Switch ── */}
      <h3 className='mt-12 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground'>
        C · Switch
      </h3>

      <SubHead title='Sizes' hint='sm 30×18 · md 36×20 · lg 44×24' />
      <Demo>
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <Switch size='sm' defaultChecked />
            <span className='text-sm text-foreground-muted'>sm</span>
          </div>
          <div className='flex items-center gap-2'>
            <Switch defaultChecked />
            <span className='text-sm text-foreground-muted'>md</span>
          </div>
          <div className='flex items-center gap-2'>
            <Switch size='lg' defaultChecked />
            <span className='text-sm text-foreground-muted'>lg</span>
          </div>
          <div className='flex items-center gap-2'>
            <Switch />
            <span className='text-sm text-foreground-muted'>off</span>
          </div>
          <div className='flex items-center gap-2'>
            <Switch defaultChecked disabled />
            <span className='text-sm text-foreground-muted'>disabled</span>
          </div>
        </div>
      </Demo>

      <SubHead title='Settings row' hint='label left · switch right · applies instantly' />
      <div className='rounded-xl border border-border bg-card px-5'>
        {[
          { t: 'Card freeze', d: 'Instantly block all transactions on your debit card.', on: false },
          { t: 'Large transaction alerts', d: 'Push a notification for any payment over $500.', on: true },
          { t: 'Overseas transactions', d: 'Allow your card to be used outside New Zealand.', on: true },
        ].map((r, i) => (
          <div
            key={r.t}
            className={`flex items-start justify-between gap-4 py-4 ${i > 0 ? 'border-t border-border' : ''}`}
          >
            <div className='min-w-0'>
              <p className='m-0 text-sm font-medium text-foreground'>{r.t}</p>
              <p className='m-0 text-[12.5px] leading-snug text-foreground-muted'>{r.d}</p>
            </div>
            <Switch defaultChecked={r.on} className='mt-0.5' />
          </div>
        ))}
      </div>
      <Note>
        <b>Switch = applies instantly.</b> No Save button. If a change needs confirmation or a Save
        step, use a checkbox instead — a switch implies the setting takes effect the moment it flips.
      </Note>

      {/* ── Do & don't ── */}
      <SubHead title="Do & don't" />
      <DoDont>
        <DoDontCard
          kind='do'
          visual={
            <div className='flex items-center gap-3'>
              <Switch defaultChecked />
              <span className='text-sm text-foreground'>Card freeze</span>
            </div>
          }
        >
          <b>Switch for instant, reversible settings.</b> Freeze a card, toggle alerts — it takes
          effect the moment it flips.
        </DoDontCard>
        <DoDontCard
          kind='dont'
          visual={
            <div className='flex items-center gap-3'>
              <Switch />
              <span className='text-sm text-foreground'>I accept the terms</span>
            </div>
          }
        >
          <b>Don&rsquo;t use a switch for consent.</b> Agreeing to terms is a deliberate, submitted
          choice — that&rsquo;s a checkbox tied to a Save/Submit action.
        </DoDontCard>
      </DoDont>
    </Section>
  )
}
