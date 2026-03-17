'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const metrics = [
  {
    label: 'Monthly fees',
    display: '$0',
    progress: 100,
    isHighlighted: true,
    ringColor: 'text-fcu-primary-900',
  },
  {
    label: 'Access',
    display: '24/7',
    progress: 100,
    isHighlighted: true,
    ringColor: 'text-fcu-secondary-500',
  },
  {
    label: 'NZ transfers',
    display: '$0',
    progress: 100,
    isHighlighted: true,
    ringColor: 'text-fcu-mint-500',
  },
]

export function StatsBar() {
  return (
    <section className='px-6 py-16 sm:py-20 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm  sm:p-10 md:p-14'
      >
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Left — copy */}
          <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-bold text-fcu-primary-950 sm:text-3xl md:text-4xl'>
              Banking that doesn&apos;t cost you a cent
            </h2>
            <p className='max-w-md text-base leading-relaxed text-fcu-primary-800/70 sm:text-lg'>
              No monthly fees, no transfer charges, and round-the-clock access
              to your money. The Bill Pay Account keeps it simple so you can
              focus on what matters.
            </p>
            <Link
              href='/accounts'
              className='group inline-flex items-center gap-2 text-sm font-semibold text-fcu-primary-900 underline underline-offset-4 transition-colors hover:text-fcu-primary-700'
            >
              Compare all accounts
              <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </Link>
          </div>

          {/* Right — animated rings */}
          <div className='flex items-center justify-start gap-[min(3vw,2.5rem)] lg:justify-end'>
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className='flex flex-col items-center gap-3'
              >
                <div
                  className='relative'
                  style={{
                    width: 'min(22vw, 9rem)',
                    height: 'min(22vw, 9rem)',
                  }}
                >
                  <svg
                    className='size-full -rotate-90'
                    viewBox='0 0 100 100'
                    style={{ transform: 'scaleY(-1)' }}
                  >
                    <circle
                      cx='50'
                      cy='50'
                      r='45'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      className='text-fcu-primary-100'
                    />
                    <motion.circle
                      cx='50'
                      cy='50'
                      r='45'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                      className={metric.ringColor}
                      initial={{ strokeDashoffset: 283 }}
                      whileInView={{
                        strokeDashoffset: 283 - (283 * metric.progress) / 100,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.12 + 0.3,
                        ease: 'easeOut',
                      }}
                      style={{ strokeDasharray: '283' }}
                    />
                  </svg>

                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span
                      className='font-bold text-fcu-primary-950'
                      style={{ fontSize: 'min(8vw, 2.25rem)' }}
                    >
                      {metric.display}
                    </span>
                  </div>
                </div>

                <span
                  className='font-medium text-fcu-primary-800/70'
                  style={{ fontSize: 'min(3vw, 0.875rem)' }}
                >
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
