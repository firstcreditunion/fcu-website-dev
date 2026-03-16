'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'What is a Special Purpose Account for?',
    answer:
      "It's designed for short-term savings goals where you want to keep money separate from your everyday account but need it to stay accessible. Common uses include holiday savings, big purchases, seasonal costs, and emergency buffers.",
  },
  {
    question: 'Can I access my money at any time?',
    answer:
      'Yes — unlike a term deposit, there are no lock-in periods. Your funds remain fully accessible via internet banking, mobile banking, or at a branch whenever you need them.',
  },
  {
    question: 'How is this different from a savings account?',
    answer:
      'The Special Purpose Account earns a lower interest rate (0.05% p.a.) but is debit card eligible and has no staff-assisted withdrawal fees. Savings accounts like the Money Maker earn a higher rate (up to 3.00% p.a.) but are better suited to longer-term or higher-balance saving.',
  },
  {
    question: 'Are there any fees?',
    answer:
      'No monthly account fees and no joining fees. If you choose to link a Mastercard Debit Card, card-specific fees apply — see the Rates & Fees page for full details.',
  },
  {
    question: 'How do I open a Special Purpose Account?',
    answer:
      'Existing members can open a Special Purpose Account by contacting us by phone or visiting your nearest branch. New to First Credit Union? Apply online to become a member first.',
  },
  {
    question: 'Can I have more than one Special Purpose Account?',
    answer:
      'Talk to us about your needs — we can help you find the right setup. Many members use one Special Purpose Account alongside their Everyday, Bill Pay, or Expense accounts to manage different financial goals.',
  },
]

export function SpecialPurposeFaqSection() {
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
