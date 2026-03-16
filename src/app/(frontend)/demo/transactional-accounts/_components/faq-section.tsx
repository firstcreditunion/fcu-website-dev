'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'Are there any account fees?',
    answer:
      'No monthly account fees and no joining fees. If you have a Mastercard Debit Card, card-specific fees apply — see the Rates & Fees page for full details.',
  },
  {
    question: 'What are the interest rates?',
    answer:
      'All four transactional accounts earn 0.05% p.a. on credit balances. Overdrawn balances attract 20.00% p.a. and must be repaid promptly. For higher interest rates, see our savings accounts or term deposits.',
  },
  {
    question: 'Can my account go overdrawn?',
    answer:
      "Your account may become overdrawn if direct debits or debit card payments are processed when there are insufficient funds. We do not offer arranged overdrafts. Any overdrawn balance must be repaid promptly and attracts 20% p.a. interest plus a $10 unarranged overdraft fee.",
  },
  {
    question: 'What accounts can I link my debit card to?',
    answer:
      "You can link your Mastercard Debit Card to any of the four transactional accounts: Everyday, Special Purpose, Bill Pay, or Expense Account. Just let us know which account you'd like linked when ordering your card.",
  },
  {
    question: 'When will I receive my debit card?',
    answer:
      'Your physical card arrives by mail within 7–10 working days. In the meantime, you can use your digital card immediately for online payments via the FCU Mobile Banking app under Services > Manage Cards.',
  },
  {
    question: 'What are pending transactions?',
    answer:
      'Pending transactions appear when a payment has been authorised but not yet fully processed. This can happen with authorisations, pre-authorisations (e.g. fuel pumps, hotels), or card verifications. Most clear within 1–2 working days, though some can take up to 9 days depending on the merchant.',
  },
  {
    question: 'How do I dispute a transaction?',
    answer:
      "First, try to resolve the issue directly with the merchant. If unresolved, contact us within 60 days of the transaction date — we'll investigate and acknowledge your complaint within five working days. Transactions not reported within 60 days cannot be reversed.",
  },
]

export function TransactionalAccountsFaqSection() {
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
