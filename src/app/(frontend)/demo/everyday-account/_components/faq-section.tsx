'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'What is the interest rate on an Everyday Account?',
    answer:
      'Credit balances earn 0.05% p.a. Overdrawn balances attract interest at 20.00% p.a. and must be repaid promptly — we do not offer arranged overdraft facilities.',
  },
  {
    question: 'Are there any account fees?',
    answer:
      'No monthly account fees, no joining fees. Standard Mastercard Debit Card fees apply if you choose to get a debit card.',
  },
  {
    question: 'Can my account go overdrawn?',
    answer:
      "Your account may become overdrawn if direct debits or debit card payments are processed when there are insufficient funds. We don't offer arranged overdrafts — any overdrawn balance must be repaid promptly and attracts a 20% p.a. interest rate plus a $10 unarranged overdraft fee.",
  },
  {
    question: 'How do I apply?',
    answer:
      'New members can apply online to become a member and open an Everyday Account. Existing members can contact us or visit a branch to open an additional account.',
  },
  {
    question: 'Is this account covered by the Depositor Compensation Scheme?',
    answer:
      'Yes. From 1 July 2025, the Everyday Account is covered by the Depositor Compensation Scheme. See our Important Information page for details.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      className='rounded-lg border border-border overflow-hidden bg-card'
      aria-label='Common questions'
    >
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className='border-b border-border last:border-b-0'>
            <button
              type='button'
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className='w-full flex justify-between items-center gap-4 px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors'
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {item.question}
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 opacity-40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role='region'
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
              <p className='px-5 pb-4 pt-0 text-[13px] text-muted-foreground leading-relaxed'>
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
