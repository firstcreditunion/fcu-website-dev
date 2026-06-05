'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Wrap } from '@/components/marketing'

const faqItems = [
  {
    q: 'What is a Bill Pay Account for?',
    a: "It keeps recurring bill payments — rent, power, phone — completely separate from savings and everyday spending, so you always know what's committed and what's free to spend.",
  },
  {
    q: 'How is this different from an Expense Account?',
    a: 'The Bill Pay Account is specifically for committed recurring bills (direct debits, automatic payments). The Expense Account is broader — for setting aside money for any kind of outgoing. Many members use both alongside an Everyday Account.',
  },
  {
    q: 'Are there any fees?',
    a: 'No monthly account fees and no joining fees. If you link a Mastercard Debit Card, standard card fees apply — see the Rates & Fees section above for full details.',
  },
  {
    q: 'What is the interest rate?',
    a: 'Credit balances earn 0.05% p.a. Overdrawn balances attract 20.00% p.a. and must be repaid promptly. For higher rates, see our savings accounts or term deposits.',
  },
  {
    q: 'How do I open one?',
    a: "Existing members can open a Bill Pay Account by phone or in-branch. New to First Credit Union? You'll need to become a member first — apply online to get started.",
  },
  {
    q: 'Can I have multiple transactional accounts?',
    a: 'Yes. Many members hold an Everyday Account for spending, a Bill Pay Account for committed bills, and an Expense Account for other outgoings.',
  },
  {
    q: 'Can my account go overdrawn?',
    a: "It may become overdrawn if a direct debit or AP processes when funds are insufficient. We don't offer arranged overdrafts — any overdrawn balance must be repaid promptly and attracts 20% p.a. interest plus a $10 unarranged overdraft fee.",
  },
]

export function FaqSection() {
  return (
    <section className='py-[clamp(48px,7vw,96px)]'>
      <Wrap narrow>
        <BlurFade inView>
          <h2 className='mb-10 text-center text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em] text-foreground'>
            Common questions
          </h2>
        </BlurFade>
        <BlurFade delay={0.08} inView>
          <Accordion>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </Wrap>
    </section>
  )
}
