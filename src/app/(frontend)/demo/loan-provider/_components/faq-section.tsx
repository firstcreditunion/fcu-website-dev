'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'Do I have to open a Loan Provider Account if I get a personal loan?',
    answer:
      'Yes. If you get a personal loan with First Credit Union, you will need to open a Loan Provider Account and save a minimum of $5 per week for the duration of your loan.',
  },
  {
    question: 'Can I access my savings while the loan is active?',
    answer:
      'Your funds are frozen for the duration of the loan. If you need to withdraw, you must give 14 days notice. If you cannot wait, you can withdraw immediately for a $20 early withdrawal fee. All withdrawals must be made by contacting us directly.',
  },
  {
    question: 'What happens to my savings when my loan is paid off?',
    answer:
      "Once your loan is paid off in full, your Loan Provider Account is unfrozen and the savings are yours to keep. You come out of debt with savings — that's the whole idea.",
  },
  {
    question: 'Is this account covered by the Depositor Compensation Scheme?',
    answer:
      'Yes. From 1 July 2025, the Loan Provider Account is covered by the Depositor Compensation Scheme.',
  },
]

export function LoanProviderFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      className="rounded-lg border border-border overflow-hidden bg-card"
      aria-label="Common questions"
    >
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="border-b border-border last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex justify-between items-center gap-4 px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {item.question}
              <ChevronDown
                className={`w-4 h-4 shrink-0 opacity-40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
              <p className="px-5 pb-4 pt-0 text-[13px] text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
