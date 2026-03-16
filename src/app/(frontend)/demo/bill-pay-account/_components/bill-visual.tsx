'use client'

import { AnimatedList } from '@/components/ui/animated-list'

const bills = [
  { name: 'Mortgage / rent', freq: 'Fortnightly AP', amount: '$900', color: 'bg-fcu-primary-900' },
  { name: 'Power & gas', freq: 'Monthly DD', amount: '$160', color: 'bg-fcu-primary-600' },
  { name: 'Phone & internet', freq: 'Monthly DD', amount: '$110', color: 'bg-fcu-primary-700' },
  { name: 'Insurance', freq: 'Monthly DD', amount: '$85', color: 'bg-fcu-secondary-500' },
  { name: 'Water rates', freq: 'Monthly DD', amount: '$65', color: 'bg-fcu-primary-800' },
  { name: 'Car registration', freq: 'Annual AP', amount: '$45', color: 'bg-fcu-primary-400' },
  { name: 'Gym membership', freq: 'Fortnightly DD', amount: '$30', color: 'bg-fcu-primary-500' },
  { name: 'Streaming services', freq: 'Monthly DD', amount: '$25', color: 'bg-fcu-secondary-500' },
]

function BillRow({ name, freq, amount, color }: (typeof bills)[number]) {
  return (
    <div className='flex items-center justify-between rounded-xl border border-fcu-primary-100 bg-white px-3.5 py-2.5 shadow-sm'>
      <div className='flex items-center gap-2.5'>
        <div className={`size-2 shrink-0 rounded-full ${color}`} />
        <div>
          <div className='text-[13px] font-medium leading-tight text-fcu-primary-950'>{name}</div>
          <div className='text-[10px] leading-tight text-fcu-primary-800/50'>{freq}</div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <span className='rounded-md bg-fcu-primary-100 px-1.5 py-0.5 text-[9px] font-semibold text-fcu-primary-900'>
          Auto
        </span>
        <span className='font-mono text-[13px] font-semibold tabular-nums text-fcu-primary-950'>
          {amount}
        </span>
      </div>
    </div>
  )
}

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative mx-auto w-[300px]'>
      <div className='rounded-[44px] border-[3px] border-fcu-primary-900/10 bg-fcu-primary-950 p-[6px] shadow-2xl shadow-fcu-primary-900/15'>
        <div className='relative flex h-[580px] flex-col overflow-hidden rounded-[38px] bg-gradient-to-b from-fcu-primary-50 to-white'>
          {/* Status bar */}
          <div className='flex items-center justify-between px-7 pt-3.5 pb-1'>
            <span className='font-mono text-[11px] font-semibold text-fcu-primary-950'>9:41</span>
            <div className='flex items-center gap-1.5'>
              <svg width='14' height='10' viewBox='0 0 14 10' fill='none' className='text-fcu-primary-950'>
                <rect x='0' y='6' width='2.5' height='4' rx='0.5' fill='currentColor' />
                <rect x='3.8' y='4' width='2.5' height='6' rx='0.5' fill='currentColor' />
                <rect x='7.6' y='2' width='2.5' height='8' rx='0.5' fill='currentColor' />
                <rect x='11.4' y='0' width='2.5' height='10' rx='0.5' fill='currentColor' />
              </svg>
              <svg width='13' height='10' viewBox='0 0 13 10' fill='none' className='text-fcu-primary-950'>
                <path d='M6.5 9.5a1 1 0 100-2 1 1 0 000 2z' fill='currentColor' />
                <path d='M3.8 7a3.8 3.8 0 015.4 0' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' />
                <path d='M1.5 4.5a7 7 0 0110 0' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' />
              </svg>
              <svg width='22' height='10' viewBox='0 0 22 10' fill='none' className='text-fcu-primary-950'>
                <rect x='0.5' y='0.5' width='18' height='9' rx='2' stroke='currentColor' strokeWidth='1' />
                <rect x='2' y='2' width='13' height='6' rx='1' fill='currentColor' />
                <rect x='19.5' y='3' width='2' height='4' rx='1' fill='currentColor' opacity='0.4' />
              </svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div className='mx-auto mb-3 h-[24px] w-[100px] rounded-full bg-fcu-primary-950' />

          {/* App content */}
          <div className='flex min-h-0 flex-1 flex-col px-5 pb-4'>
            {children}
          </div>

          {/* Home indicator */}
          <div className='flex justify-center pb-2.5'>
            <div className='h-[5px] w-[110px] rounded-full bg-fcu-primary-950/20' />
          </div>
        </div>
      </div>
    </div>
  )
}

export function BillVisual() {
  return (
    <IPhoneFrame>
      <p className='mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-fcu-primary-800/40'>
        Scheduled bills
      </p>
      <p className='mb-4 text-base font-semibold text-fcu-primary-950'>
        Bill Pay Account
      </p>

      <div className='relative min-h-0 flex-1 overflow-hidden'>
        <AnimatedList delay={800} className='gap-2.5'>
          {bills.map((bill) => (
            <BillRow key={bill.name} {...bill} />
          ))}
        </AnimatedList>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent' />
      </div>

      <div className='mt-3 shrink-0 border-t border-fcu-primary-200/60 pt-3'>
        <div className='flex justify-between text-sm font-semibold text-fcu-primary-950'>
          <span>Committed</span>
          <span className='font-mono'>$1,420</span>
        </div>
      </div>
    </IPhoneFrame>
  )
}
