import {
  AlertCircleIcon,
  CheckIcon,
  CopyIcon,
  EyeIcon,
  InfoIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  SearchIcon,
} from 'lucide-react'
import { type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldAffix,
  FieldControl,
  FieldHelper,
  FieldIcon,
  FieldInput,
} from '@/components/ui/field-control'
import { Section } from '../_components/section'
import { Demo, DemoRow, DoDont, DoDontCard, Note, SpecTable, SubHead, VariantCard } from '../_components/showcase'

/* ── States matrix ─────────────────────────────────────────────── */

type Row = { label: string; cells: (ReactNode | 'n/a')[] }

function MiniField({
  state,
  controlClassName,
  children,
  helper,
}: {
  state?: 'default' | 'error' | 'success' | 'loading'
  controlClassName?: string
  children: ReactNode
  helper?: ReactNode
}) {
  return (
    <Field state={state} className='w-full'>
      <FieldControl className={controlClassName}>{children}</FieldControl>
      {helper ? <FieldHelper>{helper}</FieldHelper> : null}
    </Field>
  )
}

export function Inputs() {
  return (
    <Section
      id='inputs'
      num='Component'
      title='Input'
      description='Every variant shares one control chassis — the same border, focus ring, and height — and differs only in what sits inside. That keeps a form full of mixed inputs feeling like one object instead of seven.'
    >
      {/* 01 — Variants */}
      <SubHead title='Variants' hint='one chassis, different contents' />

      <VariantCard
        name='Default'
        token='<FieldInput />'
        example={
          <Field className='w-full'>
            <FieldControl>
              <FieldInput placeholder='e.g. Mereana Te Awa' />
            </FieldControl>
          </Field>
        }
      >
        <b>The base case.</b> Single-line text entry with a label above. Placeholder shows an example,
        never a description — the label carries the meaning.
      </VariantCard>

      <VariantCard
        name='With leading icon'
        token='<FieldIcon> + input'
        example={
          <Field className='w-full'>
            <FieldControl>
              <FieldIcon>
                <SearchIcon />
              </FieldIcon>
              <FieldInput type='search' placeholder='Search transactions' />
            </FieldControl>
          </Field>
        }
      >
        <b>Iconography reinforces purpose</b> — search, mail, lock, person. Use sparingly: an icon on
        every field becomes visual noise and slows the form down.
      </VariantCard>

      <VariantCard
        name='With affix'
        token='<FieldAffix> · side="trailing"'
        example={
          <div className='flex w-full flex-col gap-3'>
            <Field className='w-full'>
              <FieldControl>
                <FieldAffix>NZ$</FieldAffix>
                <FieldInput mono inputMode='decimal' defaultValue='1,250.00' />
              </FieldControl>
            </Field>
            <Field className='w-full'>
              <FieldControl>
                <FieldInput mono inputMode='decimal' defaultValue='4.85' />
                <FieldAffix side='trailing'>% p.a.</FieldAffix>
              </FieldControl>
            </Field>
          </div>
        }
      >
        <b>For units that never change</b> — currency, percentages, domains. Affixes sit in the
        control so the user can&rsquo;t tab into them; the input still owns the focus ring.
      </VariantCard>

      <VariantCard
        name='With action'
        token='<FieldIcon as="button">'
        example={
          <div className='flex w-full flex-col gap-3'>
            <Field className='w-full'>
              <FieldControl>
                <FieldIcon>
                  <LockIcon />
                </FieldIcon>
                <FieldInput type='password' defaultValue='hunter2-secret' />
                <FieldIcon side='trailing' as='button' aria-label='Show password'>
                  <EyeIcon />
                </FieldIcon>
              </FieldControl>
            </Field>
            <Field className='w-full'>
              <FieldControl>
                <FieldInput mono readOnly defaultValue='FCU-0048-12873' />
                <FieldIcon side='trailing' as='button' aria-label='Copy member number'>
                  <CopyIcon />
                </FieldIcon>
              </FieldControl>
            </Field>
          </div>
        }
      >
        <b>Click-through utilities</b> — toggle password visibility, copy a value, clear the field.
        Always an icon, always with an <code>aria-label</code>, never wider than the icon itself.
      </VariantCard>

      <VariantCard
        name='Monospace value'
        token='<FieldInput mono>'
        example={
          <Field className='w-full'>
            <FieldControl>
              <FieldInput mono defaultValue='12-3401-0234567-00' />
            </FieldControl>
          </Field>
        }
      >
        <b>For data the eye scans column-wise</b> — account numbers, IRD, NHI, verification codes.
        Geist Mono with tabular figures so digits line up.
      </VariantCard>

      <VariantCard
        name='Required & optional'
        token='required · optional'
        example={
          <div className='flex w-full flex-col gap-3'>
            <Field className='w-full'>
              <FieldControl>
                <FieldIcon>
                  <MailIcon />
                </FieldIcon>
                <FieldInput type='email' placeholder='you@example.co.nz' />
              </FieldControl>
            </Field>
          </div>
        }
      >
        <b>Mark whichever is rarer.</b> If most fields are required, only mark the optional ones; if
        most are optional, mark the required ones. Don&rsquo;t make the user count.
      </VariantCard>

      {/* 02 — Sizes */}
      <SubHead title='Sizes' hint='sm 32 · md 40 · lg 48 — match Button' />
      <Demo>
        <DemoRow name='size="sm"' sub='32px · text 13 · radius md'>
          <div className='flex w-full max-w-md items-end gap-2'>
            <Field className='flex-1'>
              <FieldControl size='sm'>
                <FieldIcon>
                  <SearchIcon />
                </FieldIcon>
                <FieldInput type='search' placeholder='Find a payee' />
              </FieldControl>
            </Field>
            <Button size='sm'>Search</Button>
          </div>
        </DemoRow>
        <DemoRow name='size="default"' sub='40px · text 14 · radius lg'>
          <div className='flex w-full max-w-md items-end gap-2'>
            <Field className='flex-1'>
              <FieldControl>
                <FieldInput type='email' placeholder='you@example.co.nz' />
              </FieldControl>
            </Field>
            <Button>Send link</Button>
          </div>
        </DemoRow>
        <DemoRow name='size="lg"' sub='48px · text 15 · radius lg'>
          <div className='flex w-full max-w-md items-end gap-2.5'>
            <Field className='flex-1'>
              <FieldControl size='lg'>
                <FieldAffix>NZ$</FieldAffix>
                <FieldInput mono inputMode='decimal' placeholder='0.00' />
              </FieldControl>
            </Field>
            <Button size='lg'>Send</Button>
          </div>
        </DemoRow>
      </Demo>
      <Note>
        <b>Same size = aligned baselines.</b> Put an input and a button shoulder-to-shoulder at the
        same size and they line up automatically — no special alignment CSS. Default to md on mobile
        keypads for taller hit targets.
      </Note>

      {/* 03 — States */}
      <SubHead title='States' hint='validation appears only after a try' />
      <div className='overflow-x-auto'>
        <div className='grid min-w-[720px] grid-cols-[120px_1fr_1fr_1fr] gap-px overflow-hidden rounded-xl border border-border bg-border'>
          {['State', 'Empty', 'Filled', 'With message'].map((h) => (
            <div
              key={h}
              className='flex items-center bg-surface px-4 py-3 font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'
            >
              {h}
            </div>
          ))}
          {(
            [
              {
                label: 'Default',
                cells: [
                  <MiniField key='e'>
                    <FieldInput placeholder='you@example.co.nz' />
                  </MiniField>,
                  <MiniField key='f'>
                    <FieldInput defaultValue='m.te.awa@gmail.com' />
                  </MiniField>,
                  <MiniField
                    key='m'
                    helper={
                      <>
                        <InfoIcon /> We&rsquo;ll send statements here.
                      </>
                    }
                  >
                    <FieldInput defaultValue='m.te.awa@gmail.com' />
                  </MiniField>,
                ],
              },
              {
                label: 'Hover',
                cells: [
                  <MiniField key='e' controlClassName='border-border-strong'>
                    <FieldInput placeholder='you@example.co.nz' />
                  </MiniField>,
                  <MiniField key='f' controlClassName='border-border-strong'>
                    <FieldInput defaultValue='m.te.awa@gmail.com' />
                  </MiniField>,
                  'n/a',
                ],
              },
              {
                label: 'Focus',
                cells: [
                  <MiniField key='e' controlClassName='border-ring shadow-[var(--shadow-focus)]'>
                    <FieldInput placeholder='you@example.co.nz' />
                  </MiniField>,
                  'n/a',
                  'n/a',
                ],
              },
              {
                label: 'Disabled',
                cells: [
                  <MiniField key='e'>
                    <FieldInput placeholder='you@example.co.nz' disabled />
                  </MiniField>,
                  <MiniField key='f'>
                    <FieldInput defaultValue='m.te.awa@gmail.com' disabled />
                  </MiniField>,
                  'n/a',
                ],
              },
              {
                label: 'Read-only',
                cells: [
                  'n/a',
                  <MiniField key='f'>
                    <FieldInput mono readOnly defaultValue='FCU-0048-12873' />
                  </MiniField>,
                  <MiniField key='m' helper="Can't be changed — issued at signup.">
                    <FieldInput mono readOnly defaultValue='FCU-0048-12873' />
                  </MiniField>,
                ],
              },
              {
                label: 'Error',
                cells: [
                  <MiniField key='e' state='error'>
                    <FieldInput placeholder='you@example.co.nz' />
                  </MiniField>,
                  <MiniField key='f' state='error'>
                    <FieldInput defaultValue='m.te.awa@gmail' />
                  </MiniField>,
                  <MiniField
                    key='m'
                    state='error'
                    helper={
                      <>
                        <AlertCircleIcon /> Add the bit after the @ — e.g. gmail.com.
                      </>
                    }
                  >
                    <FieldInput defaultValue='m.te.awa@gmail' />
                  </MiniField>,
                ],
              },
              {
                label: 'Success',
                cells: [
                  'n/a',
                  <MiniField key='f' state='success'>
                    <FieldInput mono defaultValue='12-3401-0234567-00' />
                    <FieldIcon side='trailing' className='text-status-success-700'>
                      <CheckIcon />
                    </FieldIcon>
                  </MiniField>,
                  <MiniField
                    key='m'
                    state='success'
                    helper={
                      <>
                        <CheckIcon /> Verified — Sarah Chen.
                      </>
                    }
                  >
                    <FieldInput mono defaultValue='12-3401-0234567-00' />
                    <FieldIcon side='trailing' className='text-status-success-700'>
                      <CheckIcon />
                    </FieldIcon>
                  </MiniField>,
                ],
              },
              {
                label: 'Loading',
                cells: [
                  'n/a',
                  <MiniField key='f' state='loading'>
                    <FieldInput mono defaultValue='12-3401-02345' />
                    <FieldIcon side='trailing'>
                      <Loader2Icon className='animate-spin' />
                    </FieldIcon>
                  </MiniField>,
                  <MiniField key='m' state='loading' helper='Checking with the receiving bank…'>
                    <FieldInput mono defaultValue='12-3401-02345' />
                    <FieldIcon side='trailing'>
                      <Loader2Icon className='animate-spin' />
                    </FieldIcon>
                  </MiniField>,
                ],
              },
            ] as Row[]
          ).map((row) => (
            <div key={row.label} className='contents'>
              <div className='flex items-center bg-surface px-4 py-4 font-mono text-[11px] text-foreground'>
                {row.label}
              </div>
              {row.cells.map((c, i) => (
                <div key={i} className='flex items-center bg-card px-4 py-4'>
                  {c === 'n/a' ? (
                    <span className='font-mono text-[11px] text-foreground-subtle'>n/a</span>
                  ) : (
                    c
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Note variant='warning'>
        <b>Error messages are sentences, not stamps.</b> Tell the user what to do next, not just what
        went wrong. <i>&ldquo;Add the bit after the @&rdquo;</i> beats <i>&ldquo;Invalid email&rdquo;</i>
        every time. And never show validation on load — only after a user has tried.
      </Note>

      {/* 04 — Helpers & counters */}
      <SubHead title='Helpers & counters' hint='guidance lives below, always' />
      <Demo>
        <DemoRow name='helper' sub='persistent guidance'>
          <Field className='w-full max-w-md'>
            <FieldControl>
              <FieldInput type='tel' placeholder='021 234 5678' />
            </FieldControl>
            <FieldHelper>We only use this to confirm large transfers.</FieldHelper>
          </Field>
        </DemoRow>
        <DemoRow name='counter' sub='x / max, mono'>
          <Field className='w-full max-w-md'>
            <FieldControl>
              <FieldInput defaultValue='Holiday savings' />
            </FieldControl>
            <FieldHelper>
              Give this account a nickname.
              <span className='ml-auto font-mono text-foreground-subtle'>15 / 30</span>
            </FieldHelper>
          </Field>
        </DemoRow>
      </Demo>

      {/* 05 — Anatomy & spec */}
      <SubHead title='Anatomy & spec' hint='token-driven, matches Button' />
      <SpecTable
        columns={['Token', 'sm', 'md', 'lg']}
        rows={[
          { token: '--field-h', values: ['32px', '40px', '48px'] },
          { token: '--field-px', values: ['10px', '12px', '14px'] },
          { token: 'font-size', values: ['13px', '14px', '15px'] },
          { token: 'icon-size', values: ['16px', '18px', '20px'] },
          { token: 'radius', values: ['--radius-md', '--radius-lg', '--radius-lg'] },
        ]}
      />

      {/* 06 — In context */}
      <SubHead title='In context' hint='a real form bar' />
      <div className='rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-xs)] md:p-8'>
        <div className='mb-1 font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
          Add a payee
        </div>
        <h4 className='mb-5 text-lg font-semibold tracking-[-0.01em] text-foreground'>New payee</h4>
        <div className='grid gap-4 sm:grid-cols-2'>
          <Field>
            <FieldLabelLite required>Account name</FieldLabelLite>
            <FieldControl>
              <FieldInput placeholder='e.g. Sarah Chen' />
            </FieldControl>
          </Field>
          <Field>
            <FieldLabelLite required>Account number</FieldLabelLite>
            <FieldControl>
              <FieldInput mono placeholder='00-0000-0000000-00' />
            </FieldControl>
          </Field>
          <Field className='sm:col-span-2'>
            <FieldLabelLite optional>Reference</FieldLabelLite>
            <FieldControl>
              <FieldInput placeholder='Appears on their statement' />
            </FieldControl>
            <FieldHelper>Up to 12 characters.</FieldHelper>
          </Field>
        </div>
        <div className='mt-6 flex justify-end gap-2'>
          <Button variant='secondary'>Cancel</Button>
          <Button>Add payee</Button>
        </div>
      </div>

      {/* 07 — Do & don't */}
      <SubHead title="Do & don't" />
      <DoDont>
        <DoDontCard
          kind='do'
          visual={
            <Field className='w-full max-w-xs'>
              <FieldControl>
                <FieldInput defaultValue='m.te.awa@gmail.com' />
              </FieldControl>
              <FieldHelper>We&rsquo;ll send statements here.</FieldHelper>
            </Field>
          }
        >
          <b>Guidance below the field.</b> Helper text persists while the user types — exactly when
          they need it.
        </DoDontCard>
        <DoDontCard
          kind='dont'
          visual={
            <Field className='w-full max-w-xs'>
              <FieldControl>
                <FieldInput placeholder='Enter the email for your statements' />
              </FieldControl>
            </Field>
          }
        >
          <b>Don&rsquo;t hide guidance in the placeholder.</b> It vanishes the moment they start
          typing, and screen readers treat it inconsistently.
        </DoDontCard>
      </DoDont>
    </Section>
  )
}

/* Lightweight label used inside the in-context form (avoids a separate import). */
function FieldLabelLite({
  required,
  optional,
  children,
}: {
  required?: boolean
  optional?: boolean
  children: ReactNode
}) {
  return (
    <span className='flex items-center gap-1.5 text-[13px] leading-tight font-medium text-foreground'>
      {children}
      {required ? <span className='text-destructive'>*</span> : null}
      {optional ? (
        <span className='ml-auto font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase'>
          Optional
        </span>
      ) : null}
    </span>
  )
}
