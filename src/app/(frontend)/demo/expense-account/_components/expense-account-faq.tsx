'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'What is an Expense Account for?',
    answer:
      'The Expense Account is designed to help you manage your budget by keeping money set aside for regular expenses — like rent, power, and insurance — completely separate from your everyday spending money.',
  },
  {
    question: 'Are there any fees?',
    answer:
      'No monthly account fees and no joining fees. If you choose to link a Mastercard Debit Card, card-specific fees apply — see the Rates & Fees page for full details.',
  },
  {
    question: 'What is the interest rate?',
    answer:
      'The Expense Account earns 0.05% p.a. on credit balances. Overdrawn balances attract 20.00% p.a. and must be repaid promptly. For higher interest rates, see our savings accounts or term deposits.',
  },
  {
    question: 'How do I open an Expense Account?',
    answer:
      "Existing members can open an Expense Account by contacting us by phone or visiting your nearest branch. New to First Credit Union? You'll need to become a member first — apply online to get started.",
  },
  {
    question: 'Can I have multiple transactional accounts?',
    answer:
      'Yes. Many members hold an Everyday Account for day-to-day spending alongside an Expense Account for bills and a Bill Pay Account for other outgoings. Multiple accounts make it easier to manage different parts of your budget.',
  },
  {
    question: 'Can my account go overdrawn?',
    answer:
      'Your account may become overdrawn if direct debits or debit card payments are processed when there are insufficient funds. We do not offer arranged overdrafts — any overdrawn balance must be repaid promptly and attracts 20% p.a. interest plus a $10 unarranged overdraft fee.',
  },
];

export function ExpenseAccountFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border-b border-border last:border-b-0 ${index === FAQ_ITEMS.length - 1 ? '' : ''}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-5 py-4 flex justify-between items-center gap-4 text-left hover:bg-muted/50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className="text-sm font-medium text-foreground">
                {item.question}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground opacity-60 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-80' : 'max-h-0'}`}
            >
              <div className="px-5 pb-4 pt-0">
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
