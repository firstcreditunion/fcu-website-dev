"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

function money(n: number) {
  return "$" + Math.round(n).toLocaleString("en-NZ")
}

function SliderField({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
  scale,
}: {
  label: string
  display: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  scale: [string, string]
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[14px] font-medium text-foreground">{label}</span>
        <span className="font-mono text-[15px] font-semibold text-foreground tabular-nums">
          {display}
        </span>
      </div>
      <Slider
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(typeof v === "number" ? v : v[0])}
      />
      <div className="flex justify-between font-mono text-[11px] text-foreground-subtle">
        <span>{scale[0]}</span>
        <span>{scale[1]}</span>
      </div>
    </div>
  )
}

export function RepaymentCalculator() {
  const [amount, setAmount] = React.useState(650000)
  const [years, setYears] = React.useState(30)
  const [rate, setRate] = React.useState(6.45)

  const { weekly, total } = React.useMemo(() => {
    const r = rate / 100 / 52
    const n = years * 52
    const wk = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n))
    return { weekly: wk, total: wk * n }
  }, [amount, years, rate])

  return (
    <Card className="mx-auto max-w-[720px]">
      <CardContent className="flex flex-col gap-7 p-[clamp(20px,3vw,32px)]">
        <SliderField
          label="How much are you borrowing?"
          display={money(amount)}
          min={100000}
          max={1500000}
          step={10000}
          value={amount}
          onChange={setAmount}
          scale={["$100k", "$1.5m"]}
        />
        <SliderField
          label="Over how many years?"
          display={`${years} years`}
          min={5}
          max={30}
          step={1}
          value={years}
          onChange={setYears}
          scale={["5 yrs", "30 yrs"]}
        />
        <SliderField
          label="Interest rate"
          display={`${rate.toFixed(2)}% p.a.`}
          min={5}
          max={9}
          step={0.05}
          value={rate}
          onChange={setRate}
          scale={["5.00%", "9.00%"]}
        />
      </CardContent>
      <CardFooter className="flex-wrap items-center justify-between gap-4 bg-surface-muted">
        <div>
          <div className="font-mono text-[11.5px] tracking-[0.04em] uppercase text-foreground-subtle">
            Estimated weekly repayment
          </div>
          <div className="font-mono text-[30px] font-semibold tracking-[-0.02em] text-foreground tabular-nums">
            {money(weekly)}
          </div>
          <div className="text-[12px] text-foreground-subtle">
            ≈ {money(total)} over the life of the loan
          </div>
        </div>
        <Link href="#apply" className={cn(buttonVariants({ size: "lg" }))}>
          Apply for this
        </Link>
      </CardFooter>
    </Card>
  )
}
