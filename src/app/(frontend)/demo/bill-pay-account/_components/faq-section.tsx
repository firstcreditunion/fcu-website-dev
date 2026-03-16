'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const faqItems = [
  {
    q: 'What is a Bill Pay Account for?',
    a: 'It keeps recurring bill payments \u2014 rent, power, phone \u2014 completely separate from savings and everyday spending, so you always know what\u2019s committed and what\u2019s free to spend.',
  },
  {
    q: 'How is this different from an Expense Account?',
    a: 'The Bill Pay Account is specifically for committed recurring bills (direct debits, automatic payments). The Expense Account is broader \u2014 for setting aside money for any kind of outgoing. Many members use both alongside an Everyday Account.',
  },
  {
    q: 'Are there any fees?',
    a: 'No monthly account fees and no joining fees. If you link a Mastercard Debit Card, standard card fees apply \u2014 see the Rates & Fees section above for full details.',
  },
  {
    q: 'What is the interest rate?',
    a: 'Credit balances earn 0.05% p.a. Overdrawn balances attract 20.00% p.a. and must be repaid promptly. For higher rates, see our savings accounts or term deposits.',
  },
  {
    q: 'How do I open one?',
    a: 'Existing members can open a Bill Pay Account by phone or in-branch. New to First Credit Union? You\u2019ll need to become a member first \u2014 apply online to get started.',
  },
  {
    q: 'Can I have multiple transactional accounts?',
    a: 'Yes. Many members hold an Everyday Account for spending, a Bill Pay Account for committed bills, and an Expense Account for other outgoings.',
  },
  {
    q: 'Can my account go overdrawn?',
    a: 'It may become overdrawn if a direct debit or AP processes when funds are insufficient. We don\u2019t offer arranged overdrafts \u2014 any overdrawn balance must be repaid promptly and attracts 20% p.a. interest plus a $10 unarranged overdraft fee.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className='mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8'>
      <h2 className='mb-10 text-center text-2xl font-semibold tracking-tight text-fcu-primary-950 md:text-3xl'>
        Common questions
      </h2>

      <div className='mx-auto max-w-3xl'>
        <div className='overflow-hidden rounded-2xl border border-border bg-background'>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className={index < faqItems.length - 1 ? 'border-b border-border' : ''}>
                <button
                  type='button'
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className='flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/30'
                  aria-expanded={isOpen}
                >
                  <span className='text-sm font-semibold text-foreground'>
                    {item.q}
                  </span>
                  <ChevronDown
                    aria-hidden='true'
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className='overflow-hidden motion-reduce:transition-none'
                    >
                      <div className='px-6 pb-5 text-sm leading-relaxed text-muted-foreground'>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
