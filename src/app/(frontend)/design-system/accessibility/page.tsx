"use client"

import * as React from "react"
import type { AxeResults, Result, NodeResult } from "axe-core"
import {
  AlertTriangleIcon,
  RefreshCwIcon,
  SunIcon,
  MoonIcon,
  SearchIcon,
  ExternalLinkIcon,
  ShieldCheckIcon,
  Loader2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Stat, StatRow, StatLabel, StatValue } from "@/components/ui/stat"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import {
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
  DescriptionDetail,
} from "@/components/ui/description-list"

// The real component output we audit — every showcase section, rendered offscreen.
import { Foundations } from "../_sections/foundations"
import { Buttons } from "../_sections/buttons"
import { Inputs } from "../_sections/inputs"
import { TextareaSelect } from "../_sections/textarea-select"
import { Selection } from "../_sections/selection"
import { CardDialog } from "../_sections/card-dialog"
import { TableSection } from "../_sections/table"
import { AlertBadge } from "../_sections/alert-badge"
import { Navigation } from "../_sections/navigation"
import { Disclosure } from "../_sections/disclosure"
import { DropdownMenuSection } from "../_sections/dropdown-menu"
import { HoverCardSection } from "../_sections/hover-card"
import { AvatarSection } from "../_sections/avatar"
import { Indicators } from "../_sections/indicators"
import { SkeletonSection } from "../_sections/skeleton"
import { ToastSection } from "../_sections/toast"
import { EmptyState } from "../_sections/empty-state"
import { ToggleGroupSection, RatingSection } from "../_sections/toggle-rating"
import { SliderSection } from "../_sections/slider"
import { OtpSection } from "../_sections/otp"
import { StepperSection } from "../_sections/stepper"
import { FileUploadSection } from "../_sections/file-upload"
import { TagInputSection } from "../_sections/tag-input"
import { ComboboxSection } from "../_sections/combobox"
import { CommandSection } from "../_sections/command"
import { DatePickerSection, CalendarSection } from "../_sections/date-calendar"
import { StatBlockSection } from "../_sections/stat-block"
import { TestimonialSection } from "../_sections/testimonial"
import { CtaBannerSection } from "../_sections/cta-banner"
import { TimelineSection } from "../_sections/timeline"
import { DescriptionListSection } from "../_sections/description-list"
import { ChartsSection } from "../_sections/charts"
import { CarouselSection } from "../_sections/carousel"

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]
const IMPACTS = ["critical", "serious", "moderate", "minor"] as const
type Impact = (typeof IMPACTS)[number]

function impactBadge(impact?: string | null) {
  switch (impact) {
    case "critical":
      return (
        <Badge variant="danger" solid>
          critical
        </Badge>
      )
    case "serious":
      return <Badge variant="danger">serious</Badge>
    case "moderate":
      return <Badge variant="warning">moderate</Badge>
    default:
      return <Badge variant="neutral">minor</Badge>
  }
}

function selectorToString(target: NodeResult["target"]): string {
  return (target as Array<string | string[]>)
    .map((t) => (Array.isArray(t) ? t.join(" ") : t))
    .join(" , ")
}

/** All audited component output, rendered but visually offscreen (not display:none). */
function AuditCanvas({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={canvasRef}
      data-a11y-canvas=""
      style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}
    >
      <Foundations />
      <Buttons />
      <Inputs />
      <TextareaSelect />
      <Selection />
      <CardDialog />
      <TableSection />
      <AlertBadge />
      <Navigation />
      <Disclosure />
      <DropdownMenuSection />
      <HoverCardSection />
      <AvatarSection />
      <Indicators />
      <SkeletonSection />
      <ToastSection />
      <EmptyState />
      <ToggleGroupSection />
      <RatingSection />
      <SliderSection />
      <OtpSection />
      <StepperSection />
      <FileUploadSection />
      <TagInputSection />
      <ComboboxSection />
      <CommandSection />
      <DatePickerSection />
      <CalendarSection />
      <StatBlockSection />
      <TestimonialSection />
      <CtaBannerSection />
      <TimelineSection />
      <DescriptionListSection />
      <ChartsSection />
      <CarouselSection />
    </div>
  )
}

function MonoBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-border bg-surface-sunken px-3 py-2 font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap text-foreground-muted">
      {children}
    </pre>
  )
}

function ViolationCard({ v }: { v: Result }) {
  return (
    <Card>
      <CardHeader>
        <div className="min-w-0">
          <CardTitle className="flex items-center gap-2 font-mono text-[14px]">
            {v.id}
          </CardTitle>
          <CardDescription>{v.help}</CardDescription>
        </div>
        <CardAction className="flex-col items-end gap-2">
          {impactBadge(v.impact)}
          <a
            href={v.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:underline"
          >
            Rule docs <ExternalLinkIcon className="size-3" />
          </a>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-1">
        <p className="mb-2 text-[12.5px] text-foreground-subtle">
          {v.nodes.length} failing {v.nodes.length === 1 ? "node" : "nodes"}
        </p>
        <Accordion variant="ghost">
          {v.nodes.map((n, i) => (
            <AccordionItem key={i} value={`node-${i}`}>
              <AccordionTrigger className="font-mono text-[12px]">
                {selectorToString(n.target)}
              </AccordionTrigger>
              <AccordionContent>
                <MonoBlock>{n.failureSummary || "(no failure summary)"}</MonoBlock>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default function AccessibilityReportPage() {
  const canvasRef = React.useRef<HTMLDivElement | null>(null)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [status, setStatus] = React.useState<"running" | "done" | "error">("running")
  const [error, setError] = React.useState<string | null>(null)
  const [results, setResults] = React.useState<AxeResults | null>(null)
  const [tab, setTab] = React.useState("violations")
  const [impactFilter, setImpactFilter] = React.useState<string[]>([])
  const [idFilter, setIdFilter] = React.useState("")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client mount gate
    setMounted(true)
  }, [])

  const runAudit = React.useCallback(async () => {
    const root = canvasRef.current
    if (!root) return
    setStatus("running")
    setError(null)
    try {
      const axe = (await import("axe-core")).default
      const r = await axe.run(root, {
        runOnly: { type: "tag", values: WCAG_TAGS },
      })
      setResults(r)
      setStatus("done")
    } catch (e) {
      setError((e as Error).message)
      setStatus("error")
    }
  }, [])

  // Apply theme to <html> and (re)run the audit. Gated on mount — see below.
  React.useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle("dark", theme === "dark")
    void runAudit()
  }, [mounted, theme, runAudit])

  // Don't leak the dark class to other routes on client navigation.
  React.useEffect(() => () => document.documentElement.classList.remove("dark"), [])

  const violations = results?.violations ?? []
  const incomplete = results?.incomplete ?? []
  const passes = results?.passes ?? []

  const counts = React.useMemo(() => {
    const c: Record<Impact, number> = { critical: 0, serious: 0, moderate: 0, minor: 0 }
    for (const v of results?.violations ?? []) {
      const k = (v.impact ?? "minor") as Impact
      if (k in c) c[k] += 1
    }
    return c
  }, [results])

  const filtered = violations.filter((v) => {
    const okImpact = impactFilter.length === 0 || impactFilter.includes(v.impact ?? "minor")
    const okId = idFilter.trim() === "" || v.id.toLowerCase().includes(idFilter.trim().toLowerCase())
    return okImpact && okId
  })

  // The audit is inherently client-side (axe runs in the browser), and SSR of all
  // 35 sections plus the report at once is both pointless and hits a Next SSR limit.
  // Render a light shell on the server, then mount the full tree on the client.
  if (!mounted) {
    return (
      <div className="min-w-0">
        <header className="border-b border-border pb-6">
          <p className="font-mono text-[11px] tracking-widest uppercase text-brand-accent">
            First Credit Union · Audit
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Accessibility report
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Initialising the in-browser axe-core audit…
          </p>
        </header>
      </div>
    )
  }

  return (
    <div className="min-w-0">
      <AuditCanvas canvasRef={canvasRef} />

      <header className="border-b border-border pb-6">
        <p className="font-mono text-[11px] tracking-widest uppercase text-brand-accent">
          First Credit Union · Audit
        </p>
        <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Accessibility report
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Live axe-core audit of every design-system component, run in your browser. Toggle the theme
          to audit light and dark — the dark <code className="font-mono">--muted-foreground</code> on{" "}
          <code className="font-mono">--card</code> pairs are the likeliest contrast failures.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Button onClick={() => void runAudit()} disabled={status === "running"}>
            {status === "running" ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <RefreshCwIcon />
            )}
            Re-run audit
          </Button>
          <Button variant="outline" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            Audit in {theme === "light" ? "dark" : "light"}
          </Button>
          <Badge variant="neutral" size="lg" className="font-mono">
            theme: {theme}
          </Badge>
        </div>
      </header>

      {status === "error" ? (
        <div className="mt-6 rounded-xl border border-status-danger-500/30 bg-status-danger-50 px-4 py-3 text-[13px] text-status-danger-700">
          Audit failed: {error}
        </div>
      ) : null}

      {/* Summary */}
      <StatRow divided className="mt-6">
        <Stat>
          <StatLabel>Total violations</StatLabel>
          <StatValue
            className={violations.length === 0 ? "text-status-success-700" : "text-destructive"}
          >
            {status === "running" ? "…" : violations.length}
          </StatValue>
        </Stat>
        <Stat>
          <StatLabel>Critical · Serious</StatLabel>
          <StatValue className="text-destructive">{counts.critical + counts.serious}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Moderate</StatLabel>
          <StatValue className="text-status-warning-700">{counts.moderate}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Minor</StatLabel>
          <StatValue className="text-foreground-muted">{counts.minor}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Passes</StatLabel>
          <StatValue className="text-status-success-700">{passes.length}</StatValue>
        </Stat>
      </StatRow>

      {/* Report */}
      <div className="mt-8">
        {status === "done" && violations.length === 0 ? (
          <Empty bordered>
            <EmptyHeader>
              <EmptyMedia variant="success">
                <ShieldCheckIcon />
              </EmptyMedia>
              <EmptyTitle>No WCAG A/AA violations</EmptyTitle>
              <EmptyDescription>
                axe-core found no violations in the {theme} theme across {passes.length} passing
                checks. Re-run in the other theme to confirm both.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Tabs value={tab} onValueChange={(v) => setTab(v as string)}>
            <TabsList variant="underline">
              <TabsTrigger value="violations">Violations ({violations.length})</TabsTrigger>
              <TabsTrigger value="incomplete">Needs review ({incomplete.length})</TabsTrigger>
              <TabsTrigger value="passes">Passes ({passes.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="violations">
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <ToggleGroup
                  multiple
                  value={impactFilter}
                  onValueChange={(v) => setImpactFilter(v as string[])}
                  size="sm"
                >
                  {IMPACTS.map((im) => (
                    <ToggleGroupItem key={im} value={im}>
                      {im} ({counts[im]})
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <div className="relative w-full max-w-[260px]">
                  <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-foreground-subtle" />
                  <Input
                    value={idFilter}
                    onChange={(e) => setIdFilter(e.target.value)}
                    placeholder="filter by rule id…"
                    className="pl-8"
                    aria-label="Filter violations by rule id"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                {filtered.length === 0 ? (
                  <p className="text-[13px] text-foreground-muted">
                    {violations.length === 0
                      ? "No violations in this theme."
                      : "No violations match the current filter."}
                  </p>
                ) : (
                  filtered.map((v) => <ViolationCard key={v.id} v={v} />)
                )}
              </div>
            </TabsContent>

            <TabsContent value="incomplete">
              <div className="mt-4 flex flex-col gap-3">
                {incomplete.length === 0 ? (
                  <p className="text-[13px] text-foreground-muted">Nothing needs manual review.</p>
                ) : (
                  incomplete.map((v) => (
                    <Card key={v.id}>
                      <CardHeader>
                        <div className="min-w-0">
                          <CardTitle className="font-mono text-[14px]">{v.id}</CardTitle>
                          <CardDescription>{v.help}</CardDescription>
                        </div>
                        <CardAction>
                          <Badge variant="info">{v.nodes.length} to check</Badge>
                        </CardAction>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="passes">
              <div className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {passes.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-[12.5px]"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-status-success-500" />
                    <span className="font-mono text-foreground">{p.id}</span>
                    <span className="truncate text-foreground-subtle">{p.help}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Run metadata */}
      <div className="mt-10">
        <h2 className="mb-3 text-[13.5px] font-semibold text-foreground">Run details</h2>
        <DescriptionList className="max-w-[560px]">
          <DescriptionRow>
            <DescriptionTerm>axe-core version</DescriptionTerm>
            <DescriptionDetail mono>{results?.testEngine?.version ?? "—"}</DescriptionDetail>
          </DescriptionRow>
          <DescriptionRow>
            <DescriptionTerm>Run at</DescriptionTerm>
            <DescriptionDetail mono>{results?.timestamp ?? "—"}</DescriptionDetail>
          </DescriptionRow>
          <DescriptionRow>
            <DescriptionTerm>Theme audited</DescriptionTerm>
            <DescriptionDetail mono>{theme}</DescriptionDetail>
          </DescriptionRow>
          <DescriptionRow>
            <DescriptionTerm>WCAG tags</DescriptionTerm>
            <DescriptionDetail mono>{WCAG_TAGS.join(" · ")}</DescriptionDetail>
          </DescriptionRow>
          <DescriptionRow>
            <DescriptionTerm>Totals</DescriptionTerm>
            <DescriptionDetail mono>
              {violations.length} violations · {incomplete.length} review · {passes.length} passes
            </DescriptionDetail>
          </DescriptionRow>
        </DescriptionList>
        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-foreground-subtle">
          <AlertTriangleIcon className="size-3.5" />
          Audited component output is rendered offscreen on this page; portaled overlays (dialogs,
          menus) are scanned only in their default closed state.
        </p>
      </div>
    </div>
  )
}
