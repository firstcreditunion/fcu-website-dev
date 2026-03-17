'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { AnimatedList } from '@/components/ui/animated-list'

const bills = [
  {
    name: 'Mortgage / rent',
    freq: 'Fortnightly AP',
    amount: '$900',
    color: 'bg-fcu-primary-900',
  },
  {
    name: 'Power & gas',
    freq: 'Monthly DD',
    amount: '$160',
    color: 'bg-fcu-primary-600',
  },
  {
    name: 'Phone & internet',
    freq: 'Monthly DD',
    amount: '$110',
    color: 'bg-fcu-primary-700',
  },
  {
    name: 'Insurance',
    freq: 'Monthly DD',
    amount: '$85',
    color: 'bg-fcu-secondary-500',
  },
  {
    name: 'Water rates',
    freq: 'Monthly DD',
    amount: '$65',
    color: 'bg-fcu-primary-800',
  },
  {
    name: 'Car registration',
    freq: 'Annual AP',
    amount: '$45',
    color: 'bg-fcu-primary-400',
  },
  {
    name: 'Gym membership',
    freq: 'Fortnightly DD',
    amount: '$30',
    color: 'bg-fcu-primary-500',
  },
  {
    name: 'Streaming services',
    freq: 'Monthly DD',
    amount: '$25',
    color: 'bg-fcu-secondary-500',
  },
]

function BillRow({ name, freq, amount, color }: (typeof bills)[number]) {
  return (
    <div className='flex items-center justify-between rounded-xl border border-fcu-mint-100 bg-white/80 px-3.5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'>
      <div className='flex items-center gap-2.5'>
        <div className={`size-2 shrink-0 rounded-full ${color}`} />
        <div>
          <div className='text-[13px] font-medium leading-tight text-fcu-primary-950'>
            {name}
          </div>
          <div className='text-[10px] leading-tight text-fcu-primary-800/50'>
            {freq}
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <span className='rounded-md bg-fcu-green-faded-200 px-1.5 py-0.5 text-[9px] font-semibold text-fcu-green-faded-800'>
          Auto
        </span>
        <span className='font-mono text-[13px] font-semibold tabular-nums text-fcu-primary-950'>
          {amount}
        </span>
      </div>
    </div>
  )
}

function useLiveClock() {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
  })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`)
    }
    let intervalId: ReturnType<typeof setInterval> | undefined
    const ms = (60 - new Date().getSeconds()) * 1000
    const timeoutId = setTimeout(() => {
      tick()
      intervalId = setInterval(tick, 60_000)
    }, ms)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return time
}

const TILT_MAX = 8

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  const clock = useLiveClock()
  const frameRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rawX = ((e.clientX - cx) / (rect.width / 2)) * TILT_MAX
    const rawY = ((e.clientY - cy) / (rect.height / 2)) * -TILT_MAX
    setTilt({
      x: Math.max(-TILT_MAX, Math.min(TILT_MAX, rawX)),
      y: Math.max(-TILT_MAX, Math.min(TILT_MAX, rawY)),
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const parent = el.closest('section') ?? el.parentElement?.parentElement
    if (!parent) return

    const parentEl = parent as HTMLElement
    parentEl.addEventListener('mousemove', handleMouseMove)
    parentEl.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      parentEl.removeEventListener('mousemove', handleMouseMove)
      parentEl.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div ref={frameRef} className='relative mx-auto w-[300px]'>
      {/* Surface shadow */}
      <div
        className='pointer-events-none absolute -bottom-8 left-1/2 h-20 w-[75%] -translate-x-1/2 rounded-full opacity-40 blur-2xl'
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)',
        }}
      />

      {/* Ambient glow behind the device */}
      <div className='absolute -inset-10 rounded-full bg-black/10 blur-3xl' />
      <div className='absolute -inset-5 rounded-[60px] bg-black/5 blur-xl' />

      {/* Outer frame — interactive 3D tilt */}
      <div
        className='relative rounded-[44px] p-[10px]'
        style={{
          background:
            'linear-gradient(145deg, #1a2a3e 0%, #0f1f32 50%, #0a1525 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.08)',
            '0 25px 60px -12px rgba(0,0,0,0.5)',
            '0 40px 80px -20px rgba(0,0,0,0.2)',
            'inset 0 1px 0 rgba(255,255,255,0.1)',
            'inset 0 -1px 0 rgba(0,0,0,0.3)',
          ].join(', '),
          transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Dynamic Island */}
        <div
          className='absolute top-[12px] left-1/2 z-20 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black'
          style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}
        >
          <div
            className='absolute top-1/2 right-[18px] size-2 -translate-y-1/2 rounded-full'
            style={{
              background:
                'radial-gradient(circle, #1a2a3e 30%, #0d1520 70%)',
              boxShadow: 'inset 0 0 2px rgba(100,180,220,0.3)',
            }}
          />
        </div>

        {/* Power button (right) */}
        <div
          className='absolute -right-[2px] top-[120px] h-[55px] w-[3px] rounded-r-sm'
          style={{
            background: 'linear-gradient(180deg, #2a3a4e, #1a2a3e)',
            boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
          }}
        />
        {/* Volume up (left) */}
        <div
          className='absolute -left-[2px] top-[100px] h-[28px] w-[3px] rounded-l-sm'
          style={{
            background: 'linear-gradient(180deg, #2a3a4e, #1a2a3e)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
          }}
        />
        {/* Volume down (left) */}
        <div
          className='absolute -left-[2px] top-[140px] h-[45px] w-[3px] rounded-l-sm'
          style={{
            background: 'linear-gradient(180deg, #2a3a4e, #1a2a3e)',
            boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
          }}
        />

        {/* Screen */}
        <div className='relative flex h-[570px] flex-col overflow-hidden rounded-[36px] bg-linear-to-b from-fcu-mint-100 to-fcu-mint-50'>
          {/* Status bar */}
          <div className='flex items-center justify-between px-7 pt-3.5 pb-1'>
            <span className='font-mono text-[11px] font-semibold text-fcu-primary-950' suppressHydrationWarning>
              {clock}
            </span>
            <div className='flex items-center gap-1.5'>
              <svg
                width='14'
                height='10'
                viewBox='0 0 14 10'
                fill='none'
                className='text-fcu-primary-950'
              >
                <rect x='0' y='6' width='2.5' height='4' rx='0.5' fill='currentColor' />
                <rect x='3.8' y='4' width='2.5' height='6' rx='0.5' fill='currentColor' />
                <rect x='7.6' y='2' width='2.5' height='8' rx='0.5' fill='currentColor' />
                <rect x='11.4' y='0' width='2.5' height='10' rx='0.5' fill='currentColor' />
              </svg>
              <svg
                width='13'
                height='10'
                viewBox='0 0 13 10'
                fill='none'
                className='text-fcu-primary-950'
              >
                <path d='M6.5 9.5a1 1 0 100-2 1 1 0 000 2z' fill='currentColor' />
                <path d='M3.8 7a3.8 3.8 0 015.4 0' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' />
                <path d='M1.5 4.5a7 7 0 0110 0' stroke='currentColor' strokeWidth='1.2' strokeLinecap='round' />
              </svg>
              <svg
                width='22'
                height='10'
                viewBox='0 0 22 10'
                fill='none'
                className='text-fcu-primary-950'
              >
                <rect x='0.5' y='0.5' width='18' height='9' rx='2' stroke='currentColor' strokeWidth='1' />
                <rect x='2' y='2' width='13' height='6' rx='1' fill='currentColor' />
                <rect x='19.5' y='3' width='2' height='4' rx='1' fill='currentColor' opacity='0.4' />
              </svg>
            </div>
          </div>

          {/* Spacer for Dynamic Island */}
          <div className='mx-auto mb-3 h-[24px] w-[100px]' />

          {/* App content */}
          <div className='flex min-h-0 flex-1 flex-col px-5 pb-4'>
            {children}
          </div>

          {/* Bottom tab bar */}
          <div className='shrink-0 px-4 pb-2'>
            <div
              className='flex items-center justify-around rounded-2xl px-2 py-2'
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                boxShadow:
                  '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
              }}
            >
              {[
                { label: 'Home', active: false, icon: (
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z' />
                    <path d='M9 21V12h6v9' />
                  </svg>
                )},
                { label: 'Bills', active: true, icon: (
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <rect x='5' y='2' width='14' height='20' rx='2' />
                    <path d='M9 7h6M9 11h6M9 15h3' />
                  </svg>
                )},
                { label: 'Cards', active: false, icon: (
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <rect x='2' y='5' width='20' height='14' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                )},
                { label: 'More', active: false, icon: (
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <circle cx='12' cy='12' r='1' /><circle cx='12' cy='5' r='1' /><circle cx='12' cy='19' r='1' />
                  </svg>
                )},
              ].map((tab) => (
                <div
                  key={tab.label}
                  className='flex flex-col items-center gap-0.5'
                >
                  <div
                    className={`flex size-8 items-center justify-center rounded-xl transition-colors ${
                      tab.active
                        ? 'bg-fcu-primary-900 text-white'
                        : 'text-fcu-primary-800/40'
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className={`text-[8px] font-semibold ${
                      tab.active ? 'text-fcu-primary-900' : 'text-fcu-primary-800/40'
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Home indicator */}
            <div className='mt-1.5 flex justify-center'>
              <div className='h-[4px] w-[100px] rounded-full bg-fcu-primary-950/15' />
            </div>
          </div>
        </div>

        {/* Reflection / glass overlay */}
        <div
          className='pointer-events-none absolute inset-0 z-10 rounded-[44px]'
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
          }}
        />
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
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-fcu-mint-50 to-transparent' />
      </div>

      <div className='mt-3 shrink-0 border-t border-fcu-green-faded-300/60 pt-3'>
        <div className='flex justify-between text-sm font-semibold text-fcu-primary-950'>
          <span>Committed</span>
          <span className='font-mono'>$1,420</span>
        </div>
      </div>
    </IPhoneFrame>
  )
}
