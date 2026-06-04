"use client"

import { type ReactNode } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceDot,
  XAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
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

function ChartCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>{children}</div>
  )
}

function ChartTitle({ children }: { children: ReactNode }) {
  return <h4 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">{children}</h4>
}

function ChartSub({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[13px] text-foreground-muted">{children}</p>
}

/* ─── Data ─── */

const balanceData = [
  { month: "Dec", balance: 42000 },
  { month: "Jan", balance: 43800 },
  { month: "Feb", balance: 42900 },
  { month: "Mar", balance: 45800 },
  { month: "Apr", balance: 47000 },
  { month: "May", balance: 48837 },
]
const balanceConfig = {
  balance: { label: "Balance", color: "var(--chart-1)" },
} satisfies ChartConfig

const flowData = [
  { month: "Dec", net: 1100 },
  { month: "Jan", net: 1400 },
  { month: "Feb", net: 900 },
  { month: "Mar", net: 1700 },
  { month: "Apr", net: 1200 },
  { month: "May", net: 1900 },
]
const flowConfig = {
  net: { label: "Net positive months", color: "var(--chart-1)" },
} satisfies ChartConfig

const spendData = [
  { category: "housing", amount: 830, fill: "var(--color-housing)" },
  { category: "groceries", amount: 568, fill: "var(--color-groceries)" },
  { category: "transport", amount: 393, fill: "var(--color-transport)" },
  { category: "other", amount: 393, fill: "var(--color-other)" },
]
const spendConfig = {
  amount: { label: "Spent" },
  housing: { label: "Housing", color: "var(--chart-1)" },
  groceries: { label: "Groceries", color: "var(--chart-2)" },
  transport: { label: "Transport", color: "var(--chart-3)" },
  other: { label: "Other", color: "var(--chart-4)" },
} satisfies ChartConfig

const saverSpark = [26, 28, 27, 32, 31, 36, 40].map((v, i) => ({ i, v }))
const spendSpark = [30, 26, 28, 21, 24, 18, 16].map((v, i) => ({ i, v }))
const saverSparkConfig = { v: { color: "var(--chart-1)" } } satisfies ChartConfig
const spendSparkConfig = {
  v: { color: "var(--color-status-success-700)" },
} satisfies ChartConfig

const spendLegend = [
  { label: "Housing", value: "$830", color: "bg-chart-1" },
  { label: "Groceries", value: "$568", color: "bg-chart-2" },
  { label: "Transport", value: "$393", color: "bg-chart-3" },
  { label: "Other", value: "$393", color: "bg-chart-4" },
]

export function ChartsSection() {
  return (
    <Section
      id="charts"
      num="Component · Charts"
      title="Charts"
      description={
        <>
          Lightweight data visualisations for the member dashboard — balance over time, spending by
          category, monthly cashflow. Built on the brand palette with restrained gridlines so the
          data reads first. Wired to Recharts on the FCU <code className="font-mono text-foreground">--chart-*</code> tokens.
        </>
      }
    >
      {/* ─── A · Line & area ─── */}
      <VarHead label="A · Line & area" title="Balance over time">
        The dashboard&rsquo;s hero chart. A soft filled area under a primary line, light gridlines,
        and an end-point dot.
      </VarHead>
      <ChartCard>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <ChartTitle>Total balance</ChartTitle>
            <ChartSub>Last 6 months</ChartSub>
          </div>
          <div className="text-right">
            <div className="font-mono text-[22px] font-semibold tracking-[-0.02em] text-foreground tabular-nums">
              $48,837
            </div>
            <div className="font-mono text-[12px] text-status-success-700">▲ 14% YTD</div>
          </div>
        </div>
        <ChartContainer config={balanceConfig} className="aspect-[3/1] w-full">
          <AreaChart data={balanceData} margin={{ left: 4, right: 10, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-balance)" stopOpacity={0.18} />
                <stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="balance"
              type="monotone"
              stroke="var(--color-balance)"
              strokeWidth={2.5}
              fill="url(#fillBalance)"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <ReferenceDot
              x="May"
              y={48837}
              r={4.5}
              fill="var(--color-balance)"
              stroke="var(--card)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </ChartCard>

      {/* ─── B · Bar & donut ─── */}
      <VarHead label="B · Bar & donut" title="Cashflow & spending breakdown">
        Monthly cashflow as bars; spending as a donut with a centred total. The donut uses the full
        brand palette — one of the rare places the secondary green earns a slice.
      </VarHead>
      <div className="grid gap-4 min-[900px]:grid-cols-[1.3fr_1fr]">
        <ChartCard>
          <div className="mb-4">
            <ChartTitle>Money in vs out</ChartTitle>
            <ChartSub>Last 6 months</ChartSub>
          </div>
          <ChartContainer config={flowConfig} className="aspect-[4/3] w-full">
            <BarChart data={flowData} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="net" fill="var(--color-net)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <div className="mt-3 flex items-center gap-1.5 text-[12.5px] text-foreground-muted">
            <span className="size-2 rounded-[2px] bg-chart-1" />
            Net positive months
          </div>
        </ChartCard>

        <ChartCard>
          <div className="mb-4">
            <ChartTitle>Spending</ChartTitle>
            <ChartSub>May 2026</ChartSub>
          </div>
          <ChartContainer config={spendConfig} className="mx-auto aspect-square max-h-[190px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={spendData}
                dataKey="amount"
                nameKey="category"
                innerRadius={56}
                outerRadius={82}
                strokeWidth={2}
                paddingAngle={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const cx = viewBox.cx ?? 0
                      const cy = viewBox.cy ?? 0
                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan
                            x={cx}
                            y={cy - 4}
                            className="fill-foreground font-mono text-[18px] font-semibold"
                          >
                            $2,184
                          </tspan>
                          <tspan x={cx} y={cy + 14} className="fill-foreground-subtle text-[11px]">
                            spent
                          </tspan>
                        </text>
                      )
                    }
                    return null
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12.5px] text-foreground-muted">
            {spendLegend.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5">
                <span className={cn("size-2 shrink-0 rounded-full", s.color)} />
                {s.label}
                <span className="ml-auto font-mono text-foreground">{s.value}</span>
              </span>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* ─── C · Sparkline ─── */}
      <VarHead label="C · Sparkline" title="Trend inside a stat tile">
        A tiny trend line inside a stat card — context without taking space. Use on dashboard summary
        tiles.
      </VarHead>
      <div className="grid gap-4 md:grid-cols-3">
        <ChartCard>
          <ChartSub>Saver balance</ChartSub>
          <div className="mb-3 font-mono text-[22px] font-semibold tracking-[-0.02em] text-foreground tabular-nums">
            $28,450
          </div>
          <ChartContainer config={saverSparkConfig} className="aspect-auto h-10 w-full">
            <LineChart data={saverSpark} margin={{ left: 2, right: 2, top: 4, bottom: 0 }}>
              <Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </ChartCard>
        <ChartCard>
          <ChartSub>This month&rsquo;s spend</ChartSub>
          <div className="mb-3 font-mono text-[22px] font-semibold tracking-[-0.02em] text-foreground tabular-nums">
            $2,184
          </div>
          <ChartContainer config={spendSparkConfig} className="aspect-auto h-10 w-full">
            <LineChart data={spendSpark} margin={{ left: 2, right: 2, top: 4, bottom: 0 }}>
              <Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </ChartCard>
        <ChartCard>
          <ChartSub>Goal progress</ChartSub>
          <div className="mb-3 font-mono text-[22px] font-semibold tracking-[-0.02em] text-foreground tabular-nums">
            80%
          </div>
          <div className="mt-[18px] h-2 overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full rounded-full bg-status-success-500" style={{ width: "80%" }} />
          </div>
        </ChartCard>
      </div>

      <Note>
        <b>Restraint over decoration.</b> No 3D, no drop shadows on bars, no rainbow palettes.
        Two-to-four brand hues, light gridlines, and tabular numerals. The data is the design.
      </Note>
    </Section>
  )
}
