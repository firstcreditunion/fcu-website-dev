import { type ReactNode } from "react"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Cta,
  CtaContent,
  CtaEyebrow,
  CtaTitle,
  CtaMessage,
  CtaActions,
  CtaImage,
  CtaImagePlaceholder,
} from "@/components/ui/cta"
import { Section } from "../_components/section"

function VarHead({
  label,
  title,
  children,
}: {
  label: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="mt-10 mb-4 flex flex-col gap-2 first:mt-0">
      <span className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-foreground-subtle">
        {label}
      </span>
      <h3 className="text-[17px] font-semibold tracking-[-0.012em] text-foreground">{title}</h3>
      {children ? (
        <p className="m-0 max-w-[64ch] text-[13.5px] leading-relaxed text-pretty text-foreground-muted">
          {children}
        </p>
      ) : null}
    </div>
  )
}

export function CtaBannerSection() {
  return (
    <Section
      id="cta-banner"
      num="Component · CTA banner"
      title="CTA banner"
      description={
        <>
          The full-width &ldquo;do something next&rdquo; block. Sits between content sections, at the
          bottom of an article, or in a sidebar as a quiet invitation. One title, one supporting
          line, one primary action — never a list of competing choices.
        </>
      }
    >
      {/* ─── A · Variants ─── */}
      <VarHead label="A · 1" title="Default">
        Card-style background, used between content sections. Title on the left, action on the right.
      </VarHead>
      <Cta>
        <CtaContent>
          <CtaEyebrow>Open an account</CtaEyebrow>
          <CtaTitle>Three minutes to membership.</CtaTitle>
          <CtaMessage>
            Got your driver&rsquo;s licence and IRD number handy? That&rsquo;s all you need to start.
            We&rsquo;ll verify the rest electronically.
          </CtaMessage>
        </CtaContent>
        <CtaActions>
          <Button variant="ghost">Learn more</Button>
          <Button>
            Open an account <ArrowRightIcon />
          </Button>
        </CtaActions>
      </Cta>

      <VarHead label="A · 2" title="Primary">
        Filled brand gradient. White text, white-pill primary button. The loudest variant — use once
        per page, max.
      </VarHead>
      <Cta tone="primary">
        <CtaContent>
          <CtaEyebrow>Members earn more</CtaEyebrow>
          <CtaTitle>Earn 4.85% p.a. on your first $10,000.</CtaTitle>
          <CtaMessage>
            No teaser rates, no fees, no balance tiers that punish you for being normal.
          </CtaMessage>
        </CtaContent>
        <CtaActions>
          <Button variant="ghost">Read the disclosure</Button>
          <Button>
            Open a Saver <ArrowRightIcon />
          </Button>
        </CtaActions>
      </Cta>

      <VarHead label="A · 3" title="Subtle">
        Tinted primary-subtle background. For secondary CTAs further down the page.
      </VarHead>
      <Cta tone="subtle">
        <CtaContent>
          <CtaEyebrow>Already a member?</CtaEyebrow>
          <CtaTitle>Refer a friend, both get $50.</CtaTitle>
          <CtaMessage>
            When your referral opens an Everyday account and makes their first deposit, you both get
            a $50 credit. No catch.
          </CtaMessage>
        </CtaContent>
        <CtaActions>
          <Button>Get your link</Button>
        </CtaActions>
      </Cta>

      <VarHead label="A · 4" title="Split">
        Two-column with imagery. Use the left for the message, the right for a hero image or
        illustration.
      </VarHead>
      <Cta layout="split">
        <CtaContent>
          <CtaEyebrow>First-home buyers</CtaEyebrow>
          <CtaTitle>Borrow smarter, with people who get it.</CtaTitle>
          <CtaMessage>
            Talk to a real mortgage lender who&rsquo;s been doing this in Auckland for fifteen years —
            not a chatbot pretending to be one.
          </CtaMessage>
        </CtaContent>
        <CtaActions>
          <Button>Book a chat</Button>
          <Button variant="ghost">See rates</Button>
        </CtaActions>
        <CtaImage>
          <CtaImagePlaceholder>PLACEHOLDER · LIFESTYLE IMAGE</CtaImagePlaceholder>
        </CtaImage>
      </Cta>

      <VarHead label="A · 5" title="Slim">
        Inline / in-card variant. For footer CTAs, sidebar invitations, or stacking between dense
        content blocks.
      </VarHead>
      <div className="flex flex-col gap-4">
        <Cta layout="slim">
          <CtaContent>
            <CtaTitle>Want our weekly summary?</CtaTitle>
            <CtaMessage>A short Monday email — last week&rsquo;s spending, what&rsquo;s coming up.</CtaMessage>
          </CtaContent>
          <CtaActions>
            <Button size="sm">Subscribe</Button>
          </CtaActions>
        </Cta>
        <Cta tone="subtle" layout="slim">
          <CtaContent>
            <CtaTitle>Not seeing what you need?</CtaTitle>
            <CtaMessage>Our team&rsquo;s in the chat right now.</CtaMessage>
          </CtaContent>
          <CtaActions>
            <Button variant="outline" size="sm">
              Start a chat
            </Button>
          </CtaActions>
        </Cta>
      </div>

      <VarHead label="A · 6" title="Centered">
        For the end-of-page hero close. Same anatomy, vertical stack, centred type.
      </VarHead>
      <Cta tone="primary" layout="centered">
        <CtaContent>
          <CtaEyebrow>Open an account today</CtaEyebrow>
          <CtaTitle>
            It&rsquo;s three minutes.
            <br />
            You&rsquo;ll wonder why you waited.
          </CtaTitle>
          <CtaMessage>First Credit Union — owned by our members since 1962.</CtaMessage>
        </CtaContent>
        <CtaActions>
          <Button size="lg">
            Open an account <ArrowRightIcon />
          </Button>
        </CtaActions>
      </Cta>

      {/* ─── B · In context ─── */}
      <VarHead label="B · 1" title="In context">
        A mock article showing how CTAs interleave with content — never too close together, always
        serving the reader who&rsquo;s already engaged.
      </VarHead>
      <article className="mx-auto flex max-w-[760px] flex-col gap-8 rounded-xl border border-border bg-card p-6 md:p-10">
        <header>
          <p className="m-0 mb-2 font-mono text-[11.5px] tracking-[0.06em] uppercase text-foreground-subtle">
            Member stories
          </p>
          <h2 className="m-0 mb-3 text-[clamp(28px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.025em] text-foreground">
            Why we joined First Credit Union
          </h2>
          <p className="m-0 max-w-[60ch] text-[16px] leading-[1.6] text-foreground-muted">
            Three short stories from members about what made them switch — and what kept them here.
          </p>
        </header>

        <div className="flex flex-col gap-3 text-[15px] leading-[1.7] text-foreground-muted">
          <p className="m-0">
            For most of us, choosing a bank is an inheritance. You go where your parents went, and you
            stay there until something forces a move. Sarah, Dion, and Mereana didn&rsquo;t all start
            with FCU — but they ended up here for the same reason.
          </p>
          <p className="m-0">
            &ldquo;The rates are honest,&rdquo; Sarah told us. &ldquo;But more than that, the people
            are honest about the rates. I can read the fine print without needing a lawyer.&rdquo;
          </p>
        </div>

        <Cta tone="subtle">
          <CtaContent>
            <CtaTitle>Open an Everyday account.</CtaTitle>
            <CtaMessage>
              No fees, no minimum balance, instant transfers between FCU accounts.
            </CtaMessage>
          </CtaContent>
          <CtaActions>
            <Button>
              Get started <ArrowRightIcon />
            </Button>
          </CtaActions>
        </Cta>

        <div className="flex flex-col gap-3 text-[15px] leading-[1.7] text-foreground-muted">
          <p className="m-0">
            Dion&rsquo;s been a member since 1998 — long enough that his branch manager has retired
            twice. &ldquo;What hasn&rsquo;t changed is that I still get a real person on the phone in
            under a minute. The technology has caught up, but the people haven&rsquo;t gone
            anywhere.&rdquo;
          </p>
          <p className="m-0">
            That continuity matters. A credit union isn&rsquo;t just a place to keep your money —
            it&rsquo;s a place where decisions about your money are made by people who know your name.
          </p>
        </div>

        <Cta tone="primary" layout="centered">
          <CtaContent>
            <CtaEyebrow>Ready when you are</CtaEyebrow>
            <CtaTitle>
              Join 52,000 New Zealanders
              <br />
              who chose to own their bank.
            </CtaTitle>
          </CtaContent>
          <CtaActions>
            <Button size="lg">
              Open an account <ArrowRightIcon />
            </Button>
            <Button variant="ghost" size="lg">
              Talk to us first
            </Button>
          </CtaActions>
        </Cta>
      </article>

      {/* ─── C · Do / Don't ─── */}
      <VarHead label="C · 1" title="Do & don't">
        Two patterns that come up over and over.
      </VarHead>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3.5 rounded-xl border border-[color-mix(in_oklch,var(--status-success-500)_25%,var(--border))] bg-card p-5">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-status-success-50 px-2 py-[3px] font-mono text-[10.5px] tracking-[0.04em] uppercase text-status-success-700">
            Do
          </span>
          <Cta tone="subtle" layout="slim">
            <CtaContent>
              <CtaTitle>Open an Everyday account.</CtaTitle>
              <CtaMessage>3 minutes, no fees.</CtaMessage>
            </CtaContent>
            <CtaActions>
              <Button size="sm">Get started</Button>
            </CtaActions>
          </Cta>
          <p className="m-0 text-[13px] leading-[1.5] text-foreground-muted">
            <b className="font-medium text-foreground">One primary action.</b> The user knows what to
            do, and the page guides them to it.
          </p>
        </div>
        <div className="flex flex-col gap-3.5 rounded-xl border border-[color-mix(in_oklch,var(--status-danger-500)_25%,var(--border))] bg-card p-5">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-status-danger-50 px-2 py-[3px] font-mono text-[10.5px] tracking-[0.04em] uppercase text-status-danger-700">
            Don&rsquo;t
          </span>
          <Cta tone="subtle" layout="slim">
            <CtaContent>
              <CtaTitle>Make a decision.</CtaTitle>
            </CtaContent>
            <CtaActions>
              <Button size="sm">Everyday</Button>
              <Button size="sm">Saver</Button>
              <Button size="sm">Term</Button>
              <Button size="sm">Lending</Button>
            </CtaActions>
          </Cta>
          <p className="m-0 text-[13px] leading-[1.5] text-foreground-muted">
            <b className="font-medium text-foreground">
              Don&rsquo;t ask the user to choose from a menu of products.
            </b>{" "}
            If they need to compare, send them to a comparison page — not a CTA.
          </p>
        </div>
      </div>
    </Section>
  )
}
