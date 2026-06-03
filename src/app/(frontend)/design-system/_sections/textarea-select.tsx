import { AlertCircleIcon, InfoIcon, WalletIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldHelper, FieldLabel } from '@/components/ui/field-control'
import { Section } from '../_components/section'
import { Demo, DemoRow, DoDont, DoDontCard, Pill, SubHead } from '../_components/showcase'

function Matrix({ cols, children }: { cols: string[]; children: ReactNode }) {
  const grid =
    cols.length === 3
      ? 'grid-cols-[120px_1fr_1fr]'
      : 'grid-cols-[120px_1fr_1fr_1fr]'
  return (
    <div className='overflow-x-auto'>
      <div className={`grid min-w-[640px] ${grid} gap-px overflow-hidden rounded-xl border border-border bg-border`}>
        {cols.map((c) => (
          <div
            key={c}
            className='flex items-center bg-surface px-4 py-3 font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'
          >
            {c}
          </div>
        ))}
        {children}
      </div>
    </div>
  )
}

function MRow({ label, cells }: { label: string; cells: (ReactNode | 'n/a')[] }) {
  return (
    <div className='contents'>
      <div className='flex items-center bg-surface px-4 py-4 font-mono text-[11px] text-foreground'>
        {label}
      </div>
      {cells.map((c, i) => (
        <div key={i} className='flex items-center bg-card px-4 py-4'>
          {c === 'n/a' ? (
            <span className='font-mono text-[11px] text-foreground-subtle'>n/a</span>
          ) : (
            c
          )}
        </div>
      ))}
    </div>
  )
}

export function TextareaSelect() {
  return (
    <Section
      id='textarea-select'
      num='Component'
      title='Textarea & Select'
      description='Two more members of the field family. Both share the Input chassis — same border, focus ring, and md height — so they drop into a form alongside text inputs without alignment work.'
    >
      {/* ── A · TEXTAREA ── */}
      <h3 className='mt-2 mb-1 text-base font-semibold tracking-[-0.01em] text-foreground'>
        A · Textarea
      </h3>
      <p className='mb-2 max-w-[70ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        For free-form text longer than a sentence — transfer notes, support messages, complaint
        descriptions. Closed height matches the Input md size; it grows natively as the user types.
      </p>

      <SubHead title='Variants' hint='auto-grow is native' />
      <Demo>
        <DemoRow name='Default' sub='min-height ~96px'>
          <Field className='w-full max-w-md'>
            <FieldLabel optional>Note</FieldLabel>
            <Textarea placeholder="Add a note for your records — only you'll see this." />
          </Field>
        </DemoRow>
        <DemoRow name='With counter' sub='helper + counter'>
          <Field className='w-full max-w-md'>
            <FieldLabel>Message to support</FieldLabel>
            <Textarea
              maxLength={500}
              defaultValue="Hi team — last Friday's direct debit to Auckland Council didn't go through even though the funds were sitting in the account. Could you take a look?"
            />
            <FieldHelper>
              We aim to respond within one business day.
              <span className='ml-auto font-mono text-foreground-subtle'>186 / 500</span>
            </FieldHelper>
          </Field>
        </DemoRow>
        <DemoRow name='Auto-grow' sub='field-sizing-content'>
          <Field className='w-full max-w-md'>
            <FieldLabel>
              Reply to Sarah <Pill>live</Pill>
            </FieldLabel>
            <Textarea defaultValue={'Type in here — the field expands as you add lines.\n\nPress Enter a few times to watch it grow without scrollbars.'} />
          </Field>
        </DemoRow>
      </Demo>

      <SubHead title='States' />
      <Matrix cols={['State', 'Empty', 'With content']}>
        <MRow
          label='Default'
          cells={[
            <Textarea key='e' placeholder='Add a note…' className='min-h-16' />,
            <Textarea key='c' defaultValue='Direct debit failed — please investigate.' className='min-h-16' />,
          ]}
        />
        <MRow
          label='Focus'
          cells={[
            <Textarea
              key='e'
              placeholder='Add a note…'
              className='min-h-16 border-ring shadow-[var(--shadow-focus)]'
            />,
            <Textarea
              key='c'
              defaultValue='Direct debit failed — please investigate.'
              className='min-h-16 border-ring shadow-[var(--shadow-focus)]'
            />,
          ]}
        />
        <MRow
          label='Disabled'
          cells={[
            <Textarea key='e' placeholder='Add a note…' disabled className='min-h-16' />,
            <Textarea key='c' defaultValue='Direct debit failed — please investigate.' disabled className='min-h-16' />,
          ]}
        />
        <MRow
          label='Error'
          cells={[
            <Field key='e' state='error' className='w-full'>
              <Textarea placeholder='Add a note…' aria-invalid className='min-h-16' />
              <FieldHelper>
                <AlertCircleIcon /> Tell us what happened.
              </FieldHelper>
            </Field>,
            <Field key='c' state='error' className='w-full'>
              <Textarea
                aria-invalid
                defaultValue='This message is far longer than fifty characters allow it to be'
                className='min-h-16'
              />
              <FieldHelper>
                <AlertCircleIcon /> Trim to under 50 characters.
                <span className='ml-auto font-mono'>59 / 50</span>
              </FieldHelper>
            </Field>,
          ]}
        />
      </Matrix>

      <SubHead title='In context' hint='support form · transfer note' />
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-xs)]'>
          <div className='px-6 pt-5 font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
            Support · contact us
          </div>
          <div className='flex-1 px-6 pt-2 pb-4'>
            <h4 className='mb-3 text-lg font-semibold tracking-[-0.01em] text-foreground'>
              What can we help with?
            </h4>
            <Field>
              <FieldLabel required>Describe what happened</FieldLabel>
              <Textarea placeholder='Include dates, amounts, and any reference numbers.' />
              <FieldHelper>
                <InfoIcon /> We never ask for your password or PIN.
                <span className='ml-auto font-mono text-foreground-subtle'>0 / 1000</span>
              </FieldHelper>
            </Field>
          </div>
          <div className='flex justify-between gap-2 border-t border-border bg-surface-muted px-6 py-4'>
            <Button variant='ghost'>Save draft</Button>
            <Button>Send message</Button>
          </div>
        </div>

        <div className='flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-xs)]'>
          <div className='px-6 pt-5 font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
            Transfer · add a note
          </div>
          <div className='flex-1 px-6 pt-2 pb-4'>
            <h4 className='mb-3 text-lg font-semibold tracking-[-0.01em] text-foreground'>
              Sending $1,250.00 to Sarah Chen
            </h4>
            <Field>
              <FieldLabel optional>Private note</FieldLabel>
              <Textarea maxLength={200} defaultValue='June groceries split — Sarah, Pip, Tama' />
              <FieldHelper>
                This stays on your history. Sarah only sees the reference field.
                <span className='ml-auto font-mono text-foreground-subtle'>37 / 200</span>
              </FieldHelper>
            </Field>
          </div>
          <div className='flex justify-end gap-2 border-t border-border bg-surface-muted px-6 py-4'>
            <Button variant='secondary'>Cancel</Button>
            <Button>Confirm transfer</Button>
          </div>
        </div>
      </div>

      {/* ── B · SELECT ── */}
      <h3 className='mt-12 mb-1 text-base font-semibold tracking-[-0.01em] text-foreground'>
        B · Select
      </h3>
      <p className='mb-2 max-w-[70ch] text-[13.5px] leading-relaxed text-foreground-muted'>
        For a single choice from a known set. The <b>native</b> select renders the platform popup
        (best on mobile and short lists); the <b>custom</b> popover supports rich rows with secondary
        metadata once an option needs more than a label.
      </p>

      <SubHead title='Native select' hint='<NativeSelect>' />
      <Demo>
        <DemoRow name='Default' sub='platform popup · best on mobile'>
          <div className='w-full max-w-xs'>
            <Field>
              <FieldLabel>Statement period</FieldLabel>
              <NativeSelect defaultValue='30'>
                <NativeSelectOption value='30'>Last 30 days</NativeSelectOption>
                <NativeSelectOption value='90'>Last 90 days</NativeSelectOption>
                <NativeSelectOption value='fy'>This financial year</NativeSelectOption>
                <NativeSelectOption value='custom'>Custom range…</NativeSelectOption>
              </NativeSelect>
            </Field>
          </div>
        </DemoRow>
        <DemoRow name='Placeholder' sub='unset option'>
          <div className='w-full max-w-xs'>
            <Field>
              <FieldLabel required>Reason for closing</FieldLabel>
              <NativeSelect defaultValue=''>
                <NativeSelectOption value='' disabled>
                  Choose one…
                </NativeSelectOption>
                <NativeSelectOption>Switching to another bank</NativeSelectOption>
                <NativeSelectOption>No longer needed</NativeSelectOption>
                <NativeSelectOption>Opening a different account type</NativeSelectOption>
              </NativeSelect>
              <FieldHelper>We use this to improve — your answer doesn&rsquo;t affect closing.</FieldHelper>
            </Field>
          </div>
        </DemoRow>
      </Demo>

      <SubHead title='States' hint='closed control' />
      <Matrix cols={['State', 'Unset', 'Selected']}>
        <MRow
          label='Default'
          cells={[
            <NativeSelect key='u' defaultValue=''>
              <NativeSelectOption value='' disabled>
                Choose one…
              </NativeSelectOption>
              <NativeSelectOption>Weekly</NativeSelectOption>
            </NativeSelect>,
            <NativeSelect key='s' defaultValue='fortnightly'>
              <NativeSelectOption value='weekly'>Weekly</NativeSelectOption>
              <NativeSelectOption value='fortnightly'>Fortnightly</NativeSelectOption>
            </NativeSelect>,
          ]}
        />
        <MRow
          label='Disabled'
          cells={[
            <NativeSelect key='u' defaultValue='' disabled>
              <NativeSelectOption value='' disabled>
                Not available
              </NativeSelectOption>
            </NativeSelect>,
            <NativeSelect key='s' defaultValue='fortnightly' disabled>
              <NativeSelectOption value='fortnightly'>Fortnightly</NativeSelectOption>
            </NativeSelect>,
          ]}
        />
        <MRow
          label='Error'
          cells={[
            <Field key='u' state='error' className='w-full'>
              <NativeSelect defaultValue='' aria-invalid>
                <NativeSelectOption value='' disabled>
                  Choose one…
                </NativeSelectOption>
              </NativeSelect>
              <FieldHelper>
                <AlertCircleIcon /> Pick a frequency to continue.
              </FieldHelper>
            </Field>,
            'n/a',
          ]}
        />
      </Matrix>

      <SubHead title='Custom select' hint='popover · rich two-line rows' />
      <Demo>
        <DemoRow name='Account picker' sub='two-line rows + trailing balance'>
          <div className='w-full max-w-sm'>
            <Field>
              <FieldLabel>From account</FieldLabel>
              <Select defaultValue='everyday'>
                <SelectTrigger>
                  <WalletIcon className='text-foreground-subtle' />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='min-w-[var(--anchor-width)]'>
                  {[
                    { v: 'everyday', name: 'Everyday', sub: 'ending 567', bal: '$2,847.50' },
                    { v: 'savings', name: 'Savings', sub: 'ending 891', bal: '$14,200.00' },
                    { v: 'bills', name: 'Bills', sub: 'ending 042', bal: '$612.18' },
                  ].map((a) => (
                    <SelectItem key={a.v} value={a.v}>
                      <span className='flex w-full items-center justify-between gap-6'>
                        <span className='flex flex-col'>
                          <span className='font-medium text-foreground'>{a.name}</span>
                          <span className='font-mono text-[11px] text-foreground-subtle'>{a.sub}</span>
                        </span>
                        <span className='font-mono text-[12px] text-foreground-muted'>{a.bal}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldHelper>Click to choose which account the money comes from.</FieldHelper>
            </Field>
          </div>
        </DemoRow>
      </Demo>

      {/* ── C · Do & don't ── */}
      <SubHead title="Do & don't" />
      <DoDont>
        <DoDontCard
          kind='do'
          visual={
            <div className='w-full max-w-xs'>
              <NativeSelect defaultValue='30'>
                <NativeSelectOption value='30'>Last 30 days</NativeSelectOption>
              </NativeSelect>
            </div>
          }
        >
          <b>Native for short, simple lists.</b> It uses the platform picker — familiar, accessible,
          and perfect on a phone keypad.
        </DoDontCard>
        <DoDontCard
          kind='dont'
          visual={
            <div className='w-full max-w-xs'>
              <Select defaultValue='30'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='30'>Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        >
          <b>Don&rsquo;t reach for the custom select</b> when a plain label list will do — you take on
          a popover, keyboard handling, and mobile quirks for no gain.
        </DoDontCard>
      </DoDont>
    </Section>
  )
}
