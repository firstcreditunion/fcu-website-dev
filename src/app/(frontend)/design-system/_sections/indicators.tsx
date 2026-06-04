import { type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
  CircularProgress,
} from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import {
  Card,
  CardHeader,
  CardEyebrow,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card"
import { Section } from "../_components/section"
import { Demo, Note, SubHead } from "../_components/showcase"

function DemoTag({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2.5 block font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
      {children}
    </span>
  )
}

export function Indicators() {
  return (
    <Section
      id="progress-spinner"
      num="Component"
      title="Progress · Spinner"
      description={
        <>
          Showing the user that <b className="font-medium text-foreground">something is happening</b>.
          Progress for finite tasks with a known percentage (uploads, multi-step forms, savings
          goals); spinner for short, indeterminate waits.
        </>
      }
    >
      {/* ═══════════ A · LINEAR PROGRESS ═══════════ */}
      <h3 className="mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground">
        A · Linear progress
      </h3>

      <SubHead title="Sizes" hint="sm 4 · md 8 · lg 12" />
      <Demo>
        <div className="flex flex-col gap-5">
          <div>
            <DemoTag>sm</DemoTag>
            <Progress size="sm" value={35} />
          </div>
          <div>
            <DemoTag>md</DemoTag>
            <Progress value={60} />
          </div>
          <div>
            <DemoTag>lg</DemoTag>
            <Progress size="lg" value={80} />
          </div>
        </div>
      </Demo>

      <SubHead title="With label & percentage" hint="caption row above the bar" />
      <Demo>
        <div className="flex flex-col gap-5">
          <Progress value={60}>
            <ProgressLabel>Verifying identity</ProgressLabel>
            <ProgressValue>3 / 5 steps</ProgressValue>
          </Progress>
          <Progress value={58}>
            <ProgressLabel>Uploading driver&rsquo;s licence</ProgressLabel>
            <ProgressValue>2.4 MB / 4.1 MB · 58%</ProgressValue>
          </Progress>
        </div>
      </Demo>

      <SubHead title="By status" hint="primary · success · warning · danger" />
      <Demo>
        <div className="flex flex-col gap-5">
          <Progress value={80} status="success">
            <ProgressLabel>Savings goal · Bali trip</ProgressLabel>
            <ProgressValue>$3,200 / $4,000</ProgressValue>
          </Progress>
          <Progress value={74} status="warning">
            <ProgressLabel>Credit card utilisation</ProgressLabel>
            <ProgressValue>$1,840 / $2,500 · 74%</ProgressValue>
          </Progress>
          <Progress value={96} status="danger">
            <ProgressLabel>Loan balance</ProgressLabel>
            <ProgressValue>$48,200 / $50,000 · 96%</ProgressValue>
          </Progress>
        </div>
      </Demo>

      <SubHead title="Indeterminate & striped" hint="unknown duration · still working" />
      <Demo>
        <div className="flex flex-col gap-5">
          <div>
            <DemoTag>indeterminate</DemoTag>
            <Progress indeterminate />
          </div>
          <div>
            <DemoTag>striped</DemoTag>
            <Progress value={65} striped />
          </div>
        </div>
      </Demo>

      {/* ═══════════ B · CIRCULAR ═══════════ */}
      <h3 className="mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground">
        B · Circular progress
      </h3>
      <Demo>
        <div className="flex flex-wrap items-center gap-10">
          <CircularProgress size="sm" value={75} />
          <CircularProgress value={60} />
          <CircularProgress size="lg" value={90} status="success" />
        </div>
      </Demo>

      {/* ═══════════ C · SPINNER ═══════════ */}
      <h3 className="mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground">
        C · Spinner
      </h3>

      <SubHead title="Sizes & colours" hint="sm · md · lg · xl" />
      <Demo>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <Spinner variant="default" />
            <Spinner variant="muted" />
            <Spinner variant="success" />
            <span className="inline-flex items-center justify-center rounded-md bg-neutral-900 p-2">
              <Spinner variant="white" />
            </span>
          </div>
        </div>
      </Demo>

      <SubHead title="Inline, in-button & overlay" hint="the three placements" />
      <Demo>
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-[13px] text-foreground-muted">
            <Spinner size="sm" variant="muted" />
            Loading transactions…
          </div>
          <div className="flex flex-wrap gap-3">
            <Button disabled>
              <Spinner size="sm" variant="white" />
              Processing…
            </Button>
            <Button variant="outline" disabled>
              <Spinner size="sm" variant="muted" />
              Saving
            </Button>
          </div>
          <div className="relative h-32 overflow-hidden rounded-xl border border-border bg-card">
            <div className="space-y-2 p-5 opacity-40">
              <div className="h-3 w-2/3 rounded bg-surface-sunken" />
              <div className="h-3 w-1/2 rounded bg-surface-sunken" />
              <div className="h-3 w-3/4 rounded bg-surface-sunken" />
            </div>
            <div className="absolute inset-0 grid place-items-center bg-card/60 backdrop-blur-[1px]">
              <Spinner size="lg" />
            </div>
          </div>
        </div>
      </Demo>

      {/* ═══════════ D · IN CONTEXT ═══════════ */}
      <h3 className="mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground">
        D · In context
      </h3>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div>
              <CardEyebrow>Step 3 of 5 — Identity</CardEyebrow>
              <CardTitle>Upload your driver&rsquo;s licence</CardTitle>
              <CardDescription>
                We verify electronically with the Department of Internal Affairs.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3.5">
            <Progress value={60}>
              <ProgressLabel>Application progress</ProgressLabel>
              <ProgressValue>60%</ProgressValue>
            </Progress>
            <div className="flex items-center gap-3.5 rounded-md border border-dashed border-border bg-surface p-[18px]">
              <CircularProgress size="sm" value={58} />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-medium text-foreground">
                  drivers-licence-front.jpg
                </div>
                <div className="font-mono text-[11.5px] text-foreground-subtle">
                  2.4 MB of 4.1 MB · 12s remaining
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Bali trip · April 2027</CardTitle>
              <CardDescription>Holiday fund · automatic Fri transfers</CardDescription>
            </div>
            <CardAction>
              <span className="font-mono text-[18px] font-semibold tracking-[-0.02em] text-foreground">
                $3,200
                <span className="text-[13px] font-normal text-foreground-subtle"> / $4,000</span>
              </span>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Progress size="lg" value={80} status="success" />
            <div className="flex justify-between font-mono text-[11.5px] text-foreground-subtle">
              <span>80% saved</span>
              <span>$800 to go</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Note>
        <b>Determinate when you can, indeterminate when you can&rsquo;t.</b> A real percentage is
        always more reassuring than a spinner — show one whenever the total is known.
      </Note>
    </Section>
  )
}
