'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    q: 'What is a Bill Pay Account for?',
    a: "The Bill Pay Account is designed to keep your regular bill payments — like rent, power, and phone — completely separate from your savings and everyday spending, making it easier to track what's committed and what's free to spend.",
  },
  {
    q: 'How is this different from an Expense Account?',
    a: 'Both accounts help with budgeting, but they serve slightly different purposes. The Bill Pay Account is specifically for recurring bills and committed payments (direct debits, automatic payments). The Expense Account is broader — for setting aside money for any type of expense. Many members use both alongside an Everyday Account.',
  },
  {
    q: 'Are there any fees?',
    a: 'No monthly account fees and no joining fees. If you choose to link a Mastercard Debit Card, card-specific fees apply — see the Rates & Fees page for full details.',
  },
  {
    q: 'What is the interest rate?',
    a: 'The Bill Pay Account earns 0.05% p.a. on credit balances. Overdrawn balances attract 20.00% p.a. and must be repaid promptly. For higher interest rates, see our savings accounts or term deposits.',
  },
  {
    q: 'How do I open a Bill Pay Account?',
    a: "Existing members can open a Bill Pay Account by contacting us by phone or visiting your nearest branch. New to First Credit Union? You'll need to become a member first — apply online to get started.",
  },
  {
    q: 'Can I have multiple transactional accounts?',
    a: 'Yes. Many members hold an Everyday Account for spending alongside a Bill Pay Account for committed bills and an Expense Account for other outgoings. Multiple accounts make it much easier to manage different parts of your budget.',
  },
  {
    q: 'Can my account go overdrawn?',
    a: "Your account may become overdrawn if direct debits or automatic payments are processed when there are insufficient funds. We do not offer arranged overdrafts — any overdrawn balance must be repaid promptly and attracts 20% p.a. interest plus a $10 unarranged overdraft fee.",
  },
]

export function BillPayAccountFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-background">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className={`border-b border-border last:border-b-0 ${index === faqItems.length - 1 ? '' : ''}`}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-5 py-4 flex justify-between items-center gap-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            {item.q}
            <ChevronDown
              className={`size-3.5 shrink-0 opacity-35 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            className={openIndex === index ? 'block' : 'hidden'}
          >
            <div className="px-5 pb-4 pt-0 text-[13px] text-muted-foreground leading-relaxed">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
