'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'

const stats = [
  { prefix: '$', value: 0, label: 'Monthly fees', suffix: '' },
  { prefix: '', value: 24, label: 'Hour access', suffix: '/7' },
  { prefix: '$', value: 0, label: 'NZ transfer fees', suffix: '' },
]

export function StatsBar() {
  return (
    <section className='px-6 py-12 sm:py-16 lg:px-8'>
      <div className='mx-auto max-w-2xl lg:max-w-7xl'>
        <div className='grid grid-cols-3 gap-3 md:gap-5'>
          {stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={0.1 + i * 0.1} inView>
              <div className='rounded-2xl border border-fcu-primary-200/40 bg-white px-3 py-4 text-center shadow-sm ring-1 ring-fcu-primary-900/5 sm:px-6 sm:py-5'>
                <div className='font-mono text-xl font-semibold tabular-nums text-fcu-primary-950 sm:text-2xl md:text-3xl'>
                  {stat.prefix}
                  <NumberTicker
                    value={stat.value}
                    delay={0.2 + i * 0.1}
                    className='text-fcu-primary-950'
                  />
                  {stat.suffix}
                </div>
                <div className='mt-1 text-[10px] font-medium text-fcu-primary-800/60 sm:mt-1.5 sm:text-xs'>
                  {stat.label}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
