import { type ReactNode } from "react"

import {
  Stat,
  StatRow,
  StatEyebrow,
  StatLabel,
  StatValue,
  StatUnit,
  StatTrend,
  StatHelp,
} from "@/components/ui/stat"
import { Section } from "../_components/section"
import { Demo, Note } from "../_components/showcase"

/** Per-variant heading: mono label · title · descriptive sub (mirrors `.subhead-row`). */
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

export function StatBlockSection() {
  return (
    <Section
      id="stat-block"
      num="Component · Stat block"
      title="Stat block"
      description={
        <>
          A single number, told well. Used to anchor marketing claims (<i>4.85% p.a.</i>,{" "}
          <i>$0 fees</i>, <i>50,000 members</i>) and to summarise dashboard data. Tabular figures,
          generous tracking, and one consistent emphasis level — every stat on the page should weigh
          roughly the same.
        </>
      }
    >
      {/* ─── A · Variants ─── */}
      <VarHead label="A · 1" title={<>Small &mdash; dense dashboard rows</>}>
        Three to six stats in a row. 20&nbsp;px value, 12&nbsp;px label.
      </VarHead>
      <Demo>
        <StatRow>
          <Stat size="sm" bordered>
            <StatLabel>Everyday</StatLabel>
            <StatValue mono>$4,182</StatValue>
          </Stat>
          <Stat size="sm" bordered>
            <StatLabel>Saver</StatLabel>
            <StatValue mono>$28,450</StatValue>
          </Stat>
          <Stat size="sm" bordered>
            <StatLabel>Holiday fund</StatLabel>
            <StatValue mono>$1,205</StatValue>
          </Stat>
          <Stat size="sm" bordered>
            <StatLabel>Term deposit</StatLabel>
            <StatValue mono>$15,000</StatValue>
          </Stat>
        </StatRow>
      </Demo>

      <VarHead label="A · 2" title={<>Medium &mdash; the default</>}>
        28&ndash;40&nbsp;px value, with an optional trend indicator below.
      </VarHead>
      <Demo>
        <StatRow>
          <Stat bordered>
            <StatLabel>Total balance · all accounts</StatLabel>
            <StatValue mono>$48,837.54</StatValue>
            <StatTrend direction="up">+$1,204.50 this month</StatTrend>
          </Stat>
          <Stat bordered>
            <StatLabel>Interest earned · 2026</StatLabel>
            <StatValue mono>$432.18</StatValue>
            <StatTrend direction="up">+$112.40 last month</StatTrend>
          </Stat>
        </StatRow>
      </Demo>

      <VarHead label="A · 3" title={<>Hero &mdash; marketing anchor</>}>
        For landing pages — one statement that anchors the page.
      </VarHead>
      <Demo>
        <div className="overflow-hidden rounded-2xl border border-border bg-[linear-gradient(165deg,var(--color-fcu-primary-50),var(--card)_70%)] px-[clamp(28px,4vw,56px)] py-[clamp(40px,6vw,72px)]">
          <h2 className="mb-3 max-w-[22ch] text-[clamp(28px,4vw,44px)] leading-[1.1] font-semibold tracking-[-0.028em] text-balance text-foreground">
            Earn more on every dollar you save.
          </h2>
          <p className="mb-8 max-w-[56ch] text-[clamp(15px,1.4vw,17px)] leading-[1.6] text-foreground-muted">
            Our Everyday Saver tops out at 4.85% p.a. on the first $10,000 — calculated daily, paid
            monthly, with no fees and no minimum balance.
          </p>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
            <Stat size="hero">
              <StatEyebrow>Headline rate</StatEyebrow>
              <StatValue>
                4.85<StatUnit>% p.a.</StatUnit>
              </StatValue>
            </Stat>
            <Stat size="hero">
              <StatEyebrow>Monthly fee</StatEyebrow>
              <StatValue>$0</StatValue>
            </Stat>
            <Stat size="hero">
              <StatEyebrow>Members</StatEyebrow>
              <StatValue>50k+</StatValue>
            </Stat>
          </div>
        </div>
      </Demo>

      {/* ─── B · Composition ─── */}
      <VarHead label="B · 1" title="Value with unit">
        A small superscript-style unit keeps the headline clean while still labelling the figure.
      </VarHead>
      <Demo>
        <StatRow>
          <Stat bordered>
            <StatLabel>Variable rate</StatLabel>
            <StatValue>
              4.85<StatUnit>% p.a.</StatUnit>
            </StatValue>
          </Stat>
          <Stat bordered>
            <StatLabel>Average response</StatLabel>
            <StatValue>
              3<StatUnit>min</StatUnit>
            </StatValue>
          </Stat>
          <Stat bordered>
            <StatLabel>In Auckland</StatLabel>
            <StatValue>
              12<StatUnit>branches</StatUnit>
            </StatValue>
          </Stat>
        </StatRow>
      </Demo>

      <VarHead label="B · 2" title="Trend indicators">
        Up / down / flat — colour follows the success / danger / muted hierarchy.
      </VarHead>
      <Demo>
        <StatRow>
          <Stat bordered>
            <StatLabel>Spending this month</StatLabel>
            <StatValue mono>$2,184.50</StatValue>
            <StatTrend direction="down">$284 less than April</StatTrend>
          </Stat>
          <Stat bordered>
            <StatLabel>Saved so far</StatLabel>
            <StatValue mono>$12,400</StatValue>
            <StatTrend direction="up">$1,200 ahead of pace</StatTrend>
          </Stat>
          <Stat bordered>
            <StatLabel>Active members</StatLabel>
            <StatValue mono>52,184</StatValue>
            <StatTrend direction="flat">Steady this quarter</StatTrend>
          </Stat>
        </StatRow>
      </Demo>

      <VarHead label="B · 3" title="With help text">
        A short explanatory sentence under the value — for stats that need context (a rate, a
        percentile, a calculation).
      </VarHead>
      <Demo>
        <div className="grid gap-4 md:grid-cols-2">
          <Stat bordered accent>
            <StatEyebrow>Featured</StatEyebrow>
            <StatLabel>Savings rate (≤ $10,000)</StatLabel>
            <StatValue>
              4.85<StatUnit>% p.a.</StatUnit>
            </StatValue>
            <StatHelp>
              Calculated daily, paid monthly. After-tax return depends on your RWT rate.
            </StatHelp>
          </Stat>
          <Stat bordered>
            <StatLabel>Lending rate (12mo)</StatLabel>
            <StatValue>
              7.95<StatUnit>% p.a.</StatUnit>
            </StatValue>
            <StatHelp>
              Indicative — your final rate depends on credit assessment and security.
            </StatHelp>
          </Stat>
        </div>
      </Demo>

      {/* ─── C · In context ─── */}
      <VarHead label="C · 1" title="Divided dashboard row">
        One card, vertical dividers between stats — reads as a single summary band.
      </VarHead>
      <StatRow divided>
        <Stat>
          <StatLabel>Net worth</StatLabel>
          <StatValue mono>$48,837.54</StatValue>
          <StatTrend direction="up">+2.4% MoM</StatTrend>
        </Stat>
        <Stat>
          <StatLabel>Income (May)</StatLabel>
          <StatValue mono>$7,685.00</StatValue>
          <StatTrend direction="flat">Flat</StatTrend>
        </Stat>
        <Stat>
          <StatLabel>Spending (May)</StatLabel>
          <StatValue mono>$2,184.50</StatValue>
          <StatTrend direction="down">−$284 vs Apr</StatTrend>
        </Stat>
        <Stat>
          <StatLabel>Saved (May)</StatLabel>
          <StatValue mono>$5,500.00</StatValue>
          <StatTrend direction="up">+$284</StatTrend>
        </Stat>
      </StatRow>

      <VarHead label="C · 2" title="Marketing trio">
        A three-stat strip for the &ldquo;About FCU&rdquo; page — community-focused numbers.
      </VarHead>
      <StatRow divided className="bg-surface [&>[data-slot=stat]]:p-8">
        <Stat>
          <StatEyebrow>Members</StatEyebrow>
          <StatValue>52k+</StatValue>
          <StatHelp>Across Tāmaki Makaurau Auckland and the wider region.</StatHelp>
        </Stat>
        <Stat>
          <StatEyebrow>Established</StatEyebrow>
          <StatValue>1962</StatValue>
          <StatHelp>Founded as a community credit union for Auckland workers.</StatHelp>
        </Stat>
        <Stat>
          <StatEyebrow>Returned to members</StatEyebrow>
          <StatValue>$2.4m</StatValue>
          <StatHelp>In rate boosts and community grants over the past year.</StatHelp>
        </Stat>
      </StatRow>

      <Note>
        <b>Tabular numerals.</b> Every value uses tabular figures so digits line up column-wise
        across rows. The eye reads{" "}
        <span className="font-mono text-foreground">$4,182</span> and{" "}
        <span className="font-mono text-foreground">$28,450</span> as comparable amounts because the
        columns physically align.
      </Note>
    </Section>
  )
}
