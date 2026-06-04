"use client"

import { type ReactNode } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel"
import {
  Testimonial,
  TestimonialRating,
  TestimonialQuote,
  TestimonialAttribution,
  TestimonialAvatar,
  TestimonialMeta,
  TestimonialName,
  TestimonialRole,
} from "@/components/ui/testimonial"
import { Section } from "../_components/section"
import { Note } from "../_components/showcase"

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

/** The hand-off controls bar: dots on the left, prev/next on the right, below the track. */
function Controls() {
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <CarouselDots />
      <div className="inline-flex gap-2">
        <CarouselPrevious className="static size-9 translate-y-0" />
        <CarouselNext className="static size-9 translate-y-0" />
      </div>
    </div>
  )
}

const testimonials: {
  quote: string
  name: string
  role: string
  initials: string
  colorway: "primary" | "mint" | "sage"
}[] = [
  {
    quote:
      "I joined for the rates, stayed for the service. Three accounts later and I still recognise the name on every email.",
    name: "Leilani Va'a",
    role: "Wellington",
    initials: "LV",
    colorway: "primary",
  },
  {
    quote:
      "The app feels like it was built by people who actually use banking apps. That used to be rare.",
    name: "Niko Kelly",
    role: "Member since 2024",
    initials: "NK",
    colorway: "mint",
  },
  {
    quote:
      "Switched my mortgage to FCU — half a percent better than what I had, and the broker was honest about when it wasn't.",
    name: "Pip Ihaka",
    role: "Hamilton",
    initials: "PI",
    colorway: "sage",
  },
]

const products = [
  { title: "Everyday Saver", sub: "4.85% p.a. · no fees" },
  { title: "Term Deposit", sub: "From 3 to 60 months" },
  { title: "Personal Loan", sub: "From 7.95% p.a." },
  { title: "Home Loan", sub: "Talk to a local lender" },
  { title: "KiwiSaver", sub: "Grow your retirement" },
]

export function CarouselSection() {
  return (
    <Section
      id="carousel"
      num="Component · Carousel"
      title="Carousel"
      description={
        <>
          A horizontally-scrolling track for browsing a set of cards — member stories, product
          highlights, help articles. The demos below are interactive: use the arrows or dots. Keep
          autoplay off by default; let members move at their own pace.
        </>
      }
    >
      {/* ─── A · Testimonial carousel ─── */}
      <VarHead label="A · Testimonial carousel" title="One card per view">
        Dots below, one card at a time — the classic &ldquo;what members say&rdquo; marquee.
      </VarHead>
      <div className="rounded-xl border border-border bg-surface p-5 md:p-7">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name}>
                <Testimonial>
                  <TestimonialRating value={5} />
                  <TestimonialQuote>
                    <p>{t.quote}</p>
                  </TestimonialQuote>
                  <TestimonialAttribution>
                    <TestimonialAvatar colorway={t.colorway}>{t.initials}</TestimonialAvatar>
                    <TestimonialMeta>
                      <TestimonialName>{t.name}</TestimonialName>
                      <TestimonialRole>{t.role}</TestimonialRole>
                    </TestimonialMeta>
                  </TestimonialAttribution>
                </Testimonial>
              </CarouselItem>
            ))}
          </CarouselContent>
          <Controls />
        </Carousel>
      </div>

      {/* ─── B · Multi-card ─── */}
      <VarHead label="B · Multi-card" title="Several cards per view">
        Cards that scroll as a group — product highlights, help articles. Peeks the next card to
        signal there&rsquo;s more.
      </VarHead>
      <div className="rounded-xl border border-border bg-surface p-5 md:p-7">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {products.map((p) => (
              <CarouselItem key={p.title} className="basis-1/2 md:basis-1/3">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="grid aspect-[16/10] place-items-center bg-[linear-gradient(135deg,var(--color-fcu-primary-200),var(--color-fcu-primary-100))] font-mono text-[11px] text-fcu-primary-900">
                    PRODUCT
                  </div>
                  <div className="px-4 py-4">
                    <h4 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                      {p.title}
                    </h4>
                    <p className="mt-0.5 text-[13px] text-foreground-muted">{p.sub}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <Controls />
        </Carousel>
      </div>

      <Note>
        <b>Don&rsquo;t autoplay, don&rsquo;t hide the controls.</b> Auto-advancing carousels are an
        accessibility headache and members miss content. Always show arrows + dots, and let people
        drive.
      </Note>
    </Section>
  )
}
