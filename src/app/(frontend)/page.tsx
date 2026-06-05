import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  UsersIcon,
  DollarSignIcon,
  MapPinIcon,
  SmartphoneIcon,
  LifeBuoyIcon,
  LandmarkIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Hero,
  Section,
  SectionHead,
  ProductTile,
  FeatureItem,
  Split,
} from "@/components/marketing"
import {
  Testimonial,
  TestimonialMark,
  TestimonialQuote,
  TestimonialAttribution,
  TestimonialAvatar,
  TestimonialMeta,
  TestimonialName,
  TestimonialRole,
} from "@/components/ui/testimonial"
import {
  Cta,
  CtaContent,
  CtaEyebrow,
  CtaTitle,
  CtaMessage,
  CtaActions,
} from "@/components/ui/cta"

export const metadata: Metadata = {
  title: "Banking that belongs to you",
  description:
    "First Credit Union is owned by our members across Aotearoa — fairer rates, no monthly fees, and profits that return to the community.",
}

export default function HomePage() {
  return (
    <main id="main">
      <Hero
        priority
        eyebrow="Owned by members, not shareholders"
        title="Banking that belongs to you."
        lede="First Credit Union is built around our members — real people across Aotearoa, not investors offshore. Fairer rates, no sneaky fees, and profits that come back to the community we share."
        image={{
          src: "/illustrations/online-banking.png",
          alt: "A small-business owner with a tray of baking and a person on a laptop, celebrating their growth.",
        }}
        meta={[
          { value: "52,000+", label: "members nationwide" },
          {
            value: (
              <>
                4.85%
                <span className="ml-1 text-[13px] font-normal text-foreground-muted">p.a.</span>
              </>
            ),
            label: "top saver rate",
          },
          { value: "$0", label: "monthly account fees" },
        ]}
        actions={
          <>
            <Button render={<Link href="#" />} nativeButton={false} size="lg">
              Become a member <ArrowRightIcon />
            </Button>
            <Button render={<Link href="/accounts/everyday" />} nativeButton={false} variant="outline" size="lg">
              Explore accounts
            </Button>
          </>
        }
      />

      {/* Products */}
      <Section variant="surface" id="products">
        <SectionHead
          eyebrow="Everyday banking"
          title="Accounts and loans for real life."
          lede="Whatever you're saving for or working towards, there's a home for it here — opened in minutes, managed from your phone."
        />
        <div className="grid grid-cols-3 gap-[18px] max-[920px]:grid-cols-2 max-[560px]:grid-cols-1">
          <ProductTile
            href="/accounts/everyday"
            kicker="Account"
            title="Everyday Account"
            description="Your day-to-day spending account. No fees, debit card included, instant transfers."
            image={{
              src: "/illustrations/everyday-account.png",
              alt: "A multigenerational family sharing a picnic together outdoors.",
            }}
          />
          <ProductTile
            href="/loans/home"
            kicker="Lending"
            title="Home Loan"
            description="Talk to a local lender who's been doing this in your region for years. Real advice, fair rates."
            image={{
              src: "/illustrations/home-loan.png",
              alt: "A sustainable home with solar panels, wind turbines and an electric car charging.",
            }}
          />
          <ProductTile
            href="#"
            kicker="Lending"
            title="Car Loan"
            description="Get on the road sooner. Fixed rates from 8.95% p.a. and no early-repayment penalties."
            image={{
              src: "/illustrations/car-loan.png",
              alt: "A person cycling beside a car, surrounded by eco-energy icons.",
            }}
          />
          <ProductTile
            href="#"
            kicker="Account"
            title="Kids Account"
            description="Help tamariki learn to save with a no-fee account and bonus interest on regular deposits."
            image={{
              src: "/illustrations/kids-account.png",
              alt: "A parent helping their child climb upwards, with learning and growth icons.",
            }}
          />
          <ProductTile
            href="#"
            kicker="Lending"
            title="Debt Consolidation"
            description="Roll multiple repayments into one manageable loan, often at a lower rate. Breathe easier."
            image={{
              src: "/illustrations/debt-consolidation.png",
              alt: "A family helping each other climb a hill together.",
            }}
          />
          <ProductTile
            href="#"
            kicker="Account"
            title="Travel Account"
            description="Save towards the big trip and spend overseas with low fees when you get there."
            image={{
              src: "/illustrations/travel-account.png",
              alt: "A member setting off to travel, suitcase in hand.",
            }}
          />
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <SectionHead center eyebrow="Why First Credit Union" title="The difference is who we answer to." />
        <div className="grid grid-cols-3 gap-x-7 gap-y-6 max-[880px]:grid-cols-2 max-[880px]:gap-6 max-[560px]:grid-cols-1">
          <FeatureItem icon={<UsersIcon />} title="Member-owned">
            Every member is a part-owner. Decisions get made for people, not shareholder returns.
          </FeatureItem>
          <FeatureItem icon={<DollarSignIcon />} title="Fairer on fees">
            No monthly account fees, no balance tiers, and rates we&rsquo;d happily explain to our own
            whānau.
          </FeatureItem>
          <FeatureItem icon={<MapPinIcon />} title="Local and human">
            Real people on the phone who know your name — and branches in the communities we serve.
          </FeatureItem>
          <FeatureItem icon={<SmartphoneIcon />} title="Banking on your phone">
            Open accounts, move money, and freeze a card in seconds — verified electronically, no
            paperwork.
          </FeatureItem>
          <FeatureItem icon={<LifeBuoyIcon />} title="Here in hard times">
            Hit a rough patch? Our hardship team works with you, not against you, to find a way
            through.
          </FeatureItem>
          <FeatureItem icon={<LandmarkIcon />} title="Protected deposits">
            Supervised by the Reserve Bank, with deposits protected under the Deposit Takers Act 2023.
          </FeatureItem>
        </div>
      </Section>

      {/* Community */}
      <Section variant="surface" id="community">
        <Split
          image={{
            src: "/illustrations/community.png",
            alt: "Three people planting and tending seedlings together in their community.",
          }}
        >
          <SectionHead
            className="mb-0"
            eyebrow="Community"
            title="Profit with a purpose."
            lede="Because we don't pay dividends to investors, our surplus goes back where it belongs — into better rates for members and grants for the communities we're part of."
          />
          <div className="mt-7 grid grid-cols-2 gap-3.5">
            <Card>
              <CardContent className="flex flex-col gap-1.5 px-5 py-[18px]">
                <span className="text-[13px] font-medium text-foreground-muted">
                  Returned to members &amp; community
                </span>
                <span className="font-mono text-[28px] leading-none font-semibold tracking-[-0.02em] text-foreground tabular-nums">
                  $2.4m
                </span>
                <span className="font-mono text-[12px] text-status-success-700">in the past year</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-1.5 px-5 py-[18px]">
                <span className="text-[13px] font-medium text-foreground-muted">
                  Local grants funded
                </span>
                <span className="font-mono text-[28px] leading-none font-semibold tracking-[-0.02em] text-foreground tabular-nums">
                  180+
                </span>
                <span className="font-mono text-[12px] text-status-success-700">since 2020</span>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Button render={<Link href="#" />} nativeButton={false} variant="outline">
              See our community impact
            </Button>
          </div>
        </Split>
      </Section>

      {/* Testimonial */}
      <Section narrow>
        <Testimonial variant="featured">
          <TestimonialMark />
          <TestimonialQuote>
            <p>
              I joined expecting modest, friendly, a bit dated. What I got was an app that&rsquo;s{" "}
              <em>better than my old bank&rsquo;s</em>, a saver rate that actually means something, and
              people who pick up the phone. I&rsquo;m not a customer here — I&rsquo;m an owner.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar>MT</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Mereana Te Awa</TestimonialName>
              <TestimonialRole>Member since 2018 · Tāmaki Makaurau</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>
      </Section>

      {/* Closing CTA */}
      <Section variant="sunken">
        <Cta tone="primary" layout="centered">
          <CtaContent>
            <CtaEyebrow>Three minutes to join</CtaEyebrow>
            <CtaTitle>
              Ready to bank with people,
              <br />
              not shareholders?
            </CtaTitle>
            <CtaMessage>
              Grab your driver&rsquo;s licence and IRD number — we&rsquo;ll verify the rest
              electronically.
            </CtaMessage>
          </CtaContent>
          <CtaActions>
            <Button render={<Link href="#" />} nativeButton={false} size="lg">
              Become a member <ArrowRightIcon />
            </Button>
            <Button render={<Link href="#" />} nativeButton={false} variant="ghost" size="lg">
              Talk to us first
            </Button>
          </CtaActions>
        </Cta>
      </Section>
    </main>
  )
}
