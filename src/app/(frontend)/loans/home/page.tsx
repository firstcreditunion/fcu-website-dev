import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Stepper, type StepItem } from "@/components/ui/stepper"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Cta,
  CtaContent,
  CtaEyebrow,
  CtaTitle,
  CtaMessage,
  CtaActions,
} from "@/components/ui/cta"
import {
  Wrap,
  Hero,
  Section,
  SectionHead,
  Split,
  Checklist,
  ChecklistItem,
} from "@/components/marketing"
import { RepaymentCalculator } from "./repayment-calculator"

export const metadata: Metadata = {
  title: "Home Loan",
  description:
    "A First Credit Union home loan with a local lending team — fair rates, $0 application fee, and decisions made by a person in your community.",
}

const STEPS: StepItem[] = [
  {
    title: "Get pre-approved",
    description: "A quick online application tells you what you can borrow — usually same day.",
  },
  {
    title: "Talk to a lender",
    description: "A real local lender reviews your situation and answers every question, honestly.",
  },
  {
    title: "Make an offer",
    description: "House-hunt with confidence, knowing your finance is sorted and your rate is locked.",
  },
  {
    title: "Settle & move in",
    description: "We handle the paperwork with your solicitor. You handle the moving boxes.",
  },
]

export default function HomeLoanPage() {
  return (
    <main id="main">
      <Wrap className="pt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Loans</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home Loan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Wrap>

      <Hero
        priority
        compact
        eyebrow="Home Loan"
        title="A home loan with a human on the other end."
        lede="Talk to a local lender who's been doing this in your region for years — not a chatbot pretending to be one. Fair rates, honest advice, and a yes or no without the run-around."
        image={{
          src: "/illustrations/home-loan.png",
          alt: "A sustainable home with solar panels, wind turbines and an electric car charging.",
        }}
        meta={[
          {
            value: (
              <>
                6.45%
                <span className="ml-1 text-[13px] font-normal text-foreground-muted">p.a.</span>
              </>
            ),
            label: "1-yr fixed, from",
          },
          { value: "$0", label: "application fee" },
          { value: "Local", label: "lending team" },
        ]}
        actions={
          <>
            <Button render={<Link href="#apply" />} nativeButton={false} size="lg">
              Apply online
            </Button>
            <Button render={<Link href="#calculator" />} nativeButton={false} variant="outline" size="lg">
              Estimate repayments
            </Button>
          </>
        }
      />

      {/* Repayment calculator */}
      <Section variant="surface" id="calculator">
        <SectionHead
          center
          eyebrow="Repayment estimator"
          title="See roughly what it costs."
          lede="Drag to explore. This is an indicative estimate for this design preview — your real rate depends on your deposit, income and the property."
        />
        <RepaymentCalculator />
      </Section>

      {/* How it works */}
      <Section>
        <SectionHead eyebrow="How it works" title="From first chat to keys in hand." />
        <Stepper steps={STEPS} current={1} />
      </Section>

      {/* Why borrow with us */}
      <Section variant="surface">
        <Split
          image={{
            src: "/illustrations/debt-consolidation.png",
            alt: "A family helping each other climb a hill, supporting one another up.",
          }}
        >
          <SectionHead
            className="mb-0"
            eyebrow="Why borrow with us"
            title="On your side, not just on your file."
          />
          <Checklist className="mt-6">
            <ChecklistItem title="No application or early-repayment fees.">
              Pay your loan off faster whenever you can, with no penalty.
            </ChecklistItem>
            <ChecklistItem title="Decisions made locally.">
              A person in your community reads your application — not an algorithm offshore.
            </ChecklistItem>
            <ChecklistItem title="Here if things get tough.">
              If your circumstances change, our hardship team works with you to find a way through.
            </ChecklistItem>
            <ChecklistItem title="Flexible structures.">
              Fixed, floating, or split — plus offset and extra repayments to suit how you live.
            </ChecklistItem>
          </Checklist>
        </Split>
      </Section>

      {/* FAQ */}
      <Section narrow>
        <SectionHead center eyebrow="Good to know" title="Home loan questions, answered." />
        <Accordion multiple defaultValue={["faq-0"]}>
          <AccordionItem value="faq-0">
            <AccordionTrigger>How much deposit do I need?</AccordionTrigger>
            <AccordionContent>
              <p>
                Usually <strong>20%</strong> of the purchase price, though we can sometimes lend with
                less depending on your situation and whether you qualify for a First Home Loan. Talk
                to a lender — it&rsquo;s a free chat, not a commitment.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-1">
            <AccordionTrigger>What&rsquo;s the difference between fixed and floating?</AccordionTrigger>
            <AccordionContent>
              <p>
                A <strong>fixed</strong> rate stays the same for a set term, so your repayments are
                predictable. A <strong>floating</strong> rate moves with the market but lets you make
                extra repayments freely. Many members split their loan across both.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Can I pay my loan off early?</AccordionTrigger>
            <AccordionContent>
              <p>
                Yes. There are no early-repayment penalties on floating loans. Fixed loans may have a
                break cost depending on rates at the time — your lender will always explain this up
                front.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>Do I need to be a member already?</AccordionTrigger>
            <AccordionContent>
              <p>
                No — you can apply and join at the same time. Membership is a one-off $20 share that
                makes you a part-owner of the credit union, refundable if you ever leave.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      {/* Apply CTA */}
      <Section variant="surface" id="apply">
        <Cta tone="primary" layout="centered">
          <CtaContent>
            <CtaEyebrow>Ready when you are</CtaEyebrow>
            <CtaTitle>Let&rsquo;s talk about your home.</CtaTitle>
            <CtaMessage>
              Start online for a fast pre-approval, or book a free chat with a local lending team
              member.
            </CtaMessage>
          </CtaContent>
          <CtaActions>
            <Button render={<Link href="#" />} nativeButton={false} size="lg">
              Apply online <ArrowRightIcon />
            </Button>
            <Button render={<Link href="#" />} nativeButton={false} variant="ghost" size="lg">
              Book a chat
            </Button>
          </CtaActions>
        </Cta>
      </Section>
    </main>
  )
}
