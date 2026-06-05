import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  CreditCardIcon,
  SendIcon,
  ClockIcon,
  BellIcon,
  DollarSignIcon,
  PieChartIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
  DescriptionDetail,
} from "@/components/ui/description-list"
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
  ProductTile,
  FeatureItem,
  Split,
} from "@/components/marketing"

export const metadata: Metadata = {
  title: "Everyday Account",
  description:
    "The no-fuss First Credit Union account for day-to-day spending — no monthly fees, a contactless debit card, and instant transfers.",
}

const RATES = [
  { term: "Monthly account fee", value: "$0.00" },
  { term: "Interest on balance", value: "0.10% p.a." },
  { term: "Debit card", value: "Free" },
  { term: "FCU transfers", value: "Free · instant" },
  { term: "Overseas card payments", value: "1.5%" },
]

export default function EverydayAccountPage() {
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
              <BreadcrumbLink href="#">Accounts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Everyday Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Wrap>

      <Hero
        priority
        compact
        eyebrow="Everyday Account"
        title="Your money, sorted for everyday life."
        lede="The no-fuss account for day-to-day spending and getting paid. No monthly fees, a contactless debit card, and instant transfers between First Credit Union accounts."
        image={{
          src: "/illustrations/everyday-account.png",
          alt: "A multigenerational family sharing a picnic together outdoors.",
        }}
        meta={[
          { value: "$0", label: "monthly fees" },
          { value: "~3 min", label: "to open" },
          { value: "Instant", label: "FCU transfers" },
        ]}
        actions={
          <>
            <Button render={<Link href="#open" />} nativeButton={false} size="lg">
              Open an account
            </Button>
            <Button render={<Link href="#features" />} nativeButton={false} variant="outline" size="lg">
              See what&rsquo;s included
            </Button>
          </>
        }
      />

      {/* Features */}
      <Section variant="surface" id="features">
        <SectionHead eyebrow="What's included" title="Everything you need, nothing you don't." />
        <div className="grid grid-cols-3 gap-x-7 gap-y-6 max-[880px]:grid-cols-2 max-[880px]:gap-6 max-[560px]:grid-cols-1">
          <FeatureItem icon={<CreditCardIcon />} title="Contactless debit card">
            Tap to pay anywhere, add it to Apple Pay or Google Pay, and freeze it instantly if it goes
            missing.
          </FeatureItem>
          <FeatureItem icon={<SendIcon />} title="Instant transfers">
            Move money between your FCU accounts in seconds, and to other banks within one business
            day.
          </FeatureItem>
          <FeatureItem icon={<ClockIcon />} title="Scheduled payments">
            Set up rent, bills and savings transfers up to 12 months ahead. Set it once, forget about
            it.
          </FeatureItem>
          <FeatureItem icon={<BellIcon />} title="Real-time alerts">
            Get a tap on your phone the moment money comes in or goes out. No more nasty surprises.
          </FeatureItem>
          <FeatureItem icon={<DollarSignIcon />} title="No monthly fees">
            No account-keeping fees, no minimum balance, and no fee for being a normal human being.
          </FeatureItem>
          <FeatureItem icon={<PieChartIcon />} title="Spending insights">
            See where your money goes each month, automatically sorted into categories you can rename.
          </FeatureItem>
        </div>
      </Section>

      {/* Rates */}
      <Section>
        <Split
          reverse
          image={{
            src: "/illustrations/bill-pay.png",
            alt: "A person managing their bills and payments with ease.",
          }}
        >
          <SectionHead
            className="mb-0"
            eyebrow="Rates & fees"
            title="Plain numbers, no fine print."
            lede="Here's exactly what an Everyday Account costs and earns. That's the whole table — there isn't a hidden one."
          />
          <DescriptionList className="mt-7">
            {RATES.map((r) => (
              <DescriptionRow key={r.term} className="grid-cols-[1fr_auto] gap-4">
                <DescriptionTerm className="text-[14px]">{r.term}</DescriptionTerm>
                <DescriptionDetail mono className="justify-end font-semibold">
                  {r.value}
                </DescriptionDetail>
              </DescriptionRow>
            ))}
          </DescriptionList>
          <p className="mt-3 text-[12.5px] text-foreground-subtle">
            Rates shown are illustrative for this design preview. See the disclosure statement for
            current rates and full terms.
          </p>
        </Split>
      </Section>

      {/* Pairs well with */}
      <Section variant="surface">
        <SectionHead eyebrow="Pairs well with" title="Build the set that fits your life." />
        <div className="grid grid-cols-3 gap-[18px] max-[920px]:grid-cols-2 max-[560px]:grid-cols-1">
          <ProductTile
            href="#"
            kicker="Account"
            title="Kids Account"
            description="Teach the kids to save with bonus interest on regular deposits."
            image={{
              src: "/illustrations/kids-account.png",
              alt: "A parent helping their child up a hill.",
            }}
          />
          <ProductTile
            href="#"
            kicker="Account"
            title="Travel Account"
            description="Stash away for the trip and spend with low fees overseas."
            image={{
              src: "/illustrations/travel-account.png",
              alt: "A member setting off to travel, suitcase in hand.",
            }}
          />
          <ProductTile
            href="/loans/home"
            kicker="Lending"
            title="Home Loan"
            description="Real advice from a local lender when you're ready to buy."
            image={{
              src: "/illustrations/home-loan.png",
              alt: "A sustainable home with solar panels and an electric car.",
            }}
          />
        </div>
      </Section>

      {/* CTA */}
      <Section id="open">
        <Cta tone="primary">
          <CtaContent>
            <CtaEyebrow>Open an Everyday Account</CtaEyebrow>
            <CtaTitle>Three minutes and you&rsquo;re sorted.</CtaTitle>
            <CtaMessage>
              You&rsquo;ll need your driver&rsquo;s licence or passport and your IRD number. We verify
              the rest electronically — no branch visit, no paperwork.
            </CtaMessage>
          </CtaContent>
          <CtaActions>
            <Button render={<Link href="#" />} nativeButton={false} size="lg">
              Open an account <ArrowRightIcon />
            </Button>
            <Button render={<Link href="#" />} nativeButton={false} variant="ghost" size="lg">
              Compare accounts
            </Button>
          </CtaActions>
        </Cta>
      </Section>
    </main>
  )
}
