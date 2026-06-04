import { type ReactNode } from "react"

import {
  Testimonial,
  TestimonialMark,
  TestimonialRating,
  TestimonialQuote,
  TestimonialAttribution,
  TestimonialAvatar,
  TestimonialMeta,
  TestimonialName,
  TestimonialRole,
  TestimonialGrid,
} from "@/components/ui/testimonial"
import { Section } from "../_components/section"
import { Demo, Note } from "../_components/showcase"

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
        <p className="m-0 max-w-[64ch] text-[13.5px] leading-relaxed text-pretty text-foreground-muted [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground">
          {children}
        </p>
      ) : null}
    </div>
  )
}

export function TestimonialSection() {
  return (
    <Section
      id="testimonial"
      num="Component · Testimonial"
      title="Testimonial"
      description={
        <>
          A member&rsquo;s words, given proper space. The credit union story is built on this — quiet
          voices from real people, told without the marketing department&rsquo;s polish. The
          component keeps the chrome calm so the quote does the talking.
        </>
      }
    >
      {/* ─── A · Variants ─── */}
      <VarHead label="A · 1" title="Default">
        A card-bordered quote with a quotation-mark watermark — for the body of marketing pages.
      </VarHead>
      <Demo className="bg-surface">
        <Testimonial>
          <TestimonialMark />
          <TestimonialQuote>
            <p>
              I joined FCU expecting credit-union-style — modest, friendly, a bit dated. What I got
              was an app that&rsquo;s <em>better than my old bank&rsquo;s</em>, and a saver rate that
              means I&rsquo;m actually getting somewhere.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar>MT</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Mereana Te Awa</TestimonialName>
              <TestimonialRole>Member since 2018 · Auckland</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>
      </Demo>

      <VarHead label="A · 2" title="Featured">
        Larger quote, gradient brand-blue background, no card border — a hero block on a
        member-stories landing page.
      </VarHead>
      <Testimonial variant="featured">
        <TestimonialMark />
        <TestimonialQuote>
          <p>
            Our family has banked with FCU for three generations. Two years ago when my workshop
            flooded, they had me an emergency overdraft sorted by the end of the day — no
            manager-approval theatre, just a real person on the phone who knew what mattered.
          </p>
        </TestimonialQuote>
        <TestimonialAttribution>
          <TestimonialAvatar colorway="mint">DM</TestimonialAvatar>
          <TestimonialMeta>
            <TestimonialName>Dion Mahuika</TestimonialName>
            <TestimonialRole>Cabinet maker · Member since 1998</TestimonialRole>
          </TestimonialMeta>
        </TestimonialAttribution>
      </Testimonial>

      <VarHead label="A · 3" title="Compact">
        Narrower, less padding, smaller avatar — for sidebar pull-quotes alongside content.
      </VarHead>
      <Demo className="bg-surface">
        <div className="grid gap-4 md:grid-cols-2">
          <Testimonial variant="compact">
            <TestimonialQuote>
              <p>
                Switched my mortgage to FCU in 2023 — half a percent better than what I had, and the
                broker was honest about when it wasn&rsquo;t.
              </p>
            </TestimonialQuote>
            <TestimonialAttribution>
              <TestimonialAvatar colorway="sage">PI</TestimonialAvatar>
              <TestimonialMeta>
                <TestimonialName>Pip Ihaka</TestimonialName>
                <TestimonialRole>Hamilton</TestimonialRole>
              </TestimonialMeta>
            </TestimonialAttribution>
          </Testimonial>
          <Testimonial variant="compact">
            <TestimonialQuote>
              <p>
                The app is a pleasure to use. Splitting groceries with flatmates used to be a chore —
                now it&rsquo;s two taps.
              </p>
            </TestimonialQuote>
            <TestimonialAttribution>
              <TestimonialAvatar colorway="slate">TR</TestimonialAvatar>
              <TestimonialMeta>
                <TestimonialName>Tama Rangi</TestimonialName>
                <TestimonialRole>Student · Wellington</TestimonialRole>
              </TestimonialMeta>
            </TestimonialAttribution>
          </Testimonial>
        </div>
      </Demo>

      <VarHead label="A · 4" title="Ghost">
        No card, no border, no shadow. Just the quote and attribution — for use inside other surfaces
        (a Card, a Dialog body) where a card-in-card would crowd.
      </VarHead>
      <Demo className="bg-surface">
        <Testimonial variant="ghost">
          <TestimonialQuote className="text-[17px]">
            <p>
              Honest rates, honest people. I don&rsquo;t think about my bank much — and that&rsquo;s
              exactly the point.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar>RS</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Rangi Smith</TestimonialName>
              <TestimonialRole>Member since 2014</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>
      </Demo>

      {/* ─── B · Composition ─── */}
      <VarHead label="B · 1" title="With rating">
        For review-driven testimonials (Google reviews, App Store). The star colour uses{" "}
        <code>--brand-accent</code> — one of the few places the FCU yellow earns its place.
      </VarHead>
      <Demo className="bg-surface">
        <Testimonial>
          <TestimonialRating value={5} />
          <TestimonialQuote>
            <p>
              The membership share threw me at first — &ldquo;I have to <em>buy in</em>?&rdquo; — but
              when I read the disclosure, it clicked. I&rsquo;m not a customer here, I&rsquo;m an
              owner. That changes the conversation.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar>JT</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Joel Tukerangi</TestimonialName>
              <TestimonialRole>Google review · Apr 2026</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>
      </Demo>

      <VarHead label="B · 2" title="Highlighted phrase">
        Wrap a key phrase in <code>&lt;em&gt;</code> or <code>&lt;strong&gt;</code> to draw the eye
        to the most quotable line.
      </VarHead>
      <Demo className="bg-surface">
        <Testimonial>
          <TestimonialMark />
          <TestimonialQuote>
            <p>
              <strong>I&rsquo;ve never been on hold once.</strong> Whoever picks up either solves it
              themselves, or warm-transfers me to someone who can. The difference from my last bank
              is night and day.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar colorway="sage">SC</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Sarah Chen</TestimonialName>
              <TestimonialRole>Member since 2021</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>
      </Demo>

      {/* ─── C · In context ─── */}
      <VarHead label="C · 1" title="Homepage grid">
        A three-up grid for the &ldquo;what our members say&rdquo; section of the homepage.
      </VarHead>
      <TestimonialGrid>
        <Testimonial>
          <TestimonialRating value={5} />
          <TestimonialQuote>
            <p>
              The Everyday Saver has done what their marketing said it would. I&rsquo;m earning{" "}
              <em>actual</em> interest for the first time in a decade.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar>AR</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Ana Rua</TestimonialName>
              <TestimonialRole>Auckland</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>

        <Testimonial>
          <TestimonialRating value={5} />
          <TestimonialQuote>
            <p>
              Joined for the rates, stayed for the service. Three accounts later and I still
              recognise the name on every email.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar colorway="mint">LV</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Leilani Va&rsquo;a</TestimonialName>
              <TestimonialRole>Wellington</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>

        <Testimonial>
          <TestimonialRating value={5} />
          <TestimonialQuote>
            <p>
              The app feels like it was built by people who actually use banking apps. That used to
              be rare.
            </p>
          </TestimonialQuote>
          <TestimonialAttribution>
            <TestimonialAvatar colorway="slate">NK</TestimonialAvatar>
            <TestimonialMeta>
              <TestimonialName>Niko Kelly</TestimonialName>
              <TestimonialRole>Member since 2024</TestimonialRole>
            </TestimonialMeta>
          </TestimonialAttribution>
        </Testimonial>
      </TestimonialGrid>

      <Note>
        <b>Real names, real consent.</b> Always source testimonials directly from members with their
        explicit permission to use the quote, the name, and the role. Stock photography and invented
        quotes are off-limits for a credit union — trust is the product.
      </Note>
    </Section>
  )
}
