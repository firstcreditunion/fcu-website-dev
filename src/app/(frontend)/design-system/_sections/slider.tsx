"use client"

import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Card,
  CardHeader,
  CardEyebrow,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Section } from "../_components/section"
import { Note, SubHead } from "../_components/showcase"

const money = (n: number) => `$${n.toLocaleString("en-NZ")}`

function one(v: number | readonly number[]): number {
  return Array.isArray(v) ? v[0] : (v as number)
}

function SliderField({
  label,
  display,
  value,
  min,
  max,
  step,
  onValueChange,
  scale,
  ticks,
}: {
  label: string
  display: ReactNode
  value: number
  min: number
  max: number
  step: number
  onValueChange: (v: number) => void
  scale?: [string, string] | string[]
  ticks?: number
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
        <span className="font-mono text-[16px] font-semibold tracking-[-0.01em] tabular-nums text-foreground">
          {display}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onValueChange(one(v))}
      />
      {ticks ? (
        <div className="-mt-2 flex justify-between">
          {Array.from({ length: ticks }, (_, i) => (
            <span key={i} className="h-1.5 w-px bg-border-strong" />
          ))}
        </div>
      ) : null}
      {scale ? (
        <div className="flex justify-between font-mono text-[11px] text-foreground-subtle">
          {scale.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function SliderSection() {
  const [amount, setAmount] = useState(25000)
  const [term, setTerm] = useState(36)
  const [loanAmt, setLoanAmt] = useState(25000)
  const [loanTerm, setLoanTerm] = useState(36)

  const r = 0.0795 / 52
  const weeks = (loanTerm / 12) * 52
  const weekly = Math.round((loanAmt * r) / (1 - Math.pow(1 + r, -weeks)))

  return (
    <Section
      id="slider"
      num="Component"
      title="Slider"
      description={
        <>
          A draggable range control for bounded numeric input — loan amounts, term lengths,
          contribution percentages. Pairs naturally with a live value readout and a calculated
          result. The demos below are interactive — drag them.
        </>
      }
    >
      <SubHead title="Basic" hint="label + live value · track below" />
      <div className="max-w-[460px]">
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <SliderField
            label="Loan amount"
            display={money(amount)}
            value={amount}
            min={5000}
            max={100000}
            step={1000}
            onValueChange={setAmount}
            scale={["$5k", "$100k"]}
          />
        </div>
      </div>

      <SubHead title="With ticks" hint="stepped values" />
      <div className="max-w-[460px]">
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <SliderField
            label="Loan term"
            display={`${term} months`}
            value={term}
            min={12}
            max={60}
            step={12}
            onValueChange={setTerm}
            ticks={5}
            scale={["12mo", "24mo", "36mo", "48mo", "60mo"]}
          />
        </div>
      </div>

      <SubHead title="In context" hint="a live loan calculator" />
      <Card className="max-w-[460px]">
        <CardHeader>
          <div>
            <CardEyebrow>Personal loan</CardEyebrow>
            <CardTitle>Estimate your repayments</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <SliderField
            label="How much?"
            display={money(loanAmt)}
            value={loanAmt}
            min={5000}
            max={80000}
            step={1000}
            onValueChange={setLoanAmt}
            scale={["$5k", "$80k"]}
          />
          <SliderField
            label="Over how long?"
            display={`${loanTerm} months`}
            value={loanTerm}
            min={12}
            max={60}
            step={6}
            onValueChange={setLoanTerm}
            scale={["1 yr", "5 yrs"]}
          />
        </CardContent>
        <CardFooter className="items-center justify-between bg-surface-muted">
          <div>
            <div className="font-mono text-[11.5px] tracking-[0.04em] text-foreground-subtle uppercase">
              Estimated weekly
            </div>
            <div className="font-mono text-[26px] font-semibold tracking-[-0.02em] text-foreground">
              ${weekly}
            </div>
          </div>
          <Button>Apply now</Button>
        </CardFooter>
      </Card>

      <Note>
        <b>Always pair with a typed input for exact values.</b> A slider is for exploring
        &ldquo;roughly how much&rdquo; — if the member knows they want exactly $27,350, let them type
        it. Sliders alone frustrate precise entry.
      </Note>
    </Section>
  )
}
