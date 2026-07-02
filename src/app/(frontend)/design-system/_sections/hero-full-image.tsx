import { Button } from "@/components/ui/button"
import { HeroFullImage } from "@/components/marketing/hero"
import { Section } from "../_components/section"
import { Demo, Note, SubHead } from "../_components/showcase"

const JUMP_LINKS = [
  { label: "Rates & fees", anchor: "rates" },
  { label: "How it works", anchor: "how-it-works" },
  { label: "Common questions", anchor: "faq" },
]

export function HeroFullImageSection() {
  return (
    <Section
      id="hero-full-image"
      num="Component"
      title="Hero — full image"
      description={
        <>
          The full-bleed hero panel for campaign and product pages: a 560px rounded panel
          with the copy column over a brand-950 scrim (photo background) or the primary
          gradient. The photo slot renders the placeholder treatment until marketing
          uploads imagery; an optional feature slot floats a transparent product shot
          beside the copy, and the Jump-To bar docks underneath.
        </>
      }
    >
      <SubHead title="Photo background" hint="no image yet — placeholder treatment under the scrim" />
      <Demo className="p-0">
        <HeroFullImage
          background="photo"
          eyebrow="Our cards"
          title="Accessing your money, made simple."
          lede="A Mastercard debit card with every Everyday Account."
          feature="placeholder"
          actions={
            <>
              <Button size="lg" className="bg-white text-fcu-primary-900 hover:bg-white/90 active:bg-white/80">
                Open an account
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white active:bg-white/15">
                Compare cards
              </Button>
            </>
          }
        />
      </Demo>

      <SubHead title="Gradient background" hint="fcu-primary-800 → 950 panel, no photography needed" />
      <Demo className="p-0">
        <HeroFullImage
          background="gradient"
          eyebrow="Term deposits"
          title="Lock in a rate that actually means something."
          lede="Six-month to five-year terms, with profits that come back to members."
          jumpTo={JUMP_LINKS}
          actions={
            <Button size="lg" className="bg-white text-fcu-primary-900 hover:bg-white/90 active:bg-white/80">
              See term deposit rates
            </Button>
          }
        />
      </Demo>

      <Note>
        Mirrors the kit&rsquo;s <code>Hero / Full Image</code> set (100:74, approved surface)
        and the <code>Jump To</code> bar (109:6). Action buttons are styled per use — the
        white-inverted primary shown here is the kit&rsquo;s dark-panel treatment.
      </Note>
    </Section>
  )
}
