import { WidgetPlaceholder } from "@/components/marketing/widget-placeholder"
import { Section } from "../_components/section"
import { Demo, Note } from "../_components/showcase"

export function WidgetPlaceholderSection() {
  return (
    <Section
      id="widget-placeholder"
      num="Component"
      title="Widget placeholder"
      description={
        <>
          A recipes-only stand-in for interactive widgets. In the page builder the widget
          registry renders the real component (v1: the repayment calculator) — this dashed
          panel appears wherever a widget name has no registered renderer, in Studio
          previews, and in design docs. Do not design inside it.
        </>
      }
    >
      <Demo>
        <WidgetPlaceholder widget="repaymentCalculator" />
      </Demo>
      <Note>
        Mirrors the Figma kit&rsquo;s <code>Widget Placeholder</code> (86:5): dashed
        border-strong on surface, 40px glyph, Poppins semibold title, mono widget name.
      </Note>
    </Section>
  )
}
