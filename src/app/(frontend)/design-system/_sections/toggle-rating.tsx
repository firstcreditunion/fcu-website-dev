"use client"

import { useState, type ReactNode } from "react"
import {
  LayoutGridIcon,
  ListIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Rating, RatingValue } from "@/components/ui/rating"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Section } from "../_components/section"
import { Demo, Note, SubHead } from "../_components/showcase"

function DemoTag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
      {children}
    </span>
  )
}

export function ToggleGroupSection() {
  return (
    <Section
      id="toggle-group"
      num="Component"
      title="Toggle group / segmented control"
      description={
        <>
          A compact set of mutually-exclusive options in a shared track — payment frequency, a view
          switcher, a format toolbar. Use it for 2–4 short options where all choices stay visible;
          past four, reach for a Select or Tabs.
        </>
      }
    >
      <SubHead title="Single-select" hint="selected segment lifts onto a card" />
      <Demo>
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-col gap-2">
            <DemoTag>Text · md</DemoTag>
            <ToggleGroup defaultValue={["weekly"]}>
              <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
              <ToggleGroupItem value="fortnightly">Fortnightly</ToggleGroupItem>
              <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-2">
            <DemoTag>With icons</DemoTag>
            <ToggleGroup defaultValue={["grid"]}>
              <ToggleGroupItem value="grid">
                <LayoutGridIcon />
                Grid
              </ToggleGroupItem>
              <ToggleGroupItem value="list">
                <ListIcon />
                List
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-3">
            <DemoTag>Sizes</DemoTag>
            <ToggleGroup size="sm" defaultValue={["day"]}>
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup defaultValue={["day"]}>
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup size="lg" defaultValue={["day"]}>
              <ToggleGroupItem value="day">Day</ToggleGroupItem>
              <ToggleGroupItem value="week">Week</ToggleGroupItem>
              <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </Demo>

      <SubHead title="Multi-select & full-width" hint="toolbar · block" />
      <Demo>
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex flex-col gap-2">
            <DemoTag>Multi-select · toolbar</DemoTag>
            <ToggleGroup multiple defaultValue={["bold", "underline"]}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <BoldIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <ItalicIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <UnderlineIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex w-full max-w-[460px] flex-col gap-2">
            <DemoTag>Full-width block</DemoTag>
            <ToggleGroup block defaultValue={["now"]}>
              <ToggleGroupItem value="now">Pay now</ToggleGroupItem>
              <ToggleGroupItem value="schedule">Schedule</ToggleGroupItem>
              <ToggleGroupItem value="recurring">Recurring</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </Demo>

      <SubHead title="In context" hint="payment mode in a transfer form" />
      <Card className="max-w-[460px]">
        <CardHeader>
          <div>
            <CardTitle>Send money</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ToggleGroup block defaultValue={["now"]}>
            <ToggleGroupItem value="now">Pay now</ToggleGroupItem>
            <ToggleGroupItem value="schedule">Schedule</ToggleGroupItem>
            <ToggleGroupItem value="recurring">Recurring</ToggleGroupItem>
          </ToggleGroup>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">Amount</label>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-foreground-muted">NZ$</span>
              <Input className="font-mono" defaultValue="1,250.00" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t-0 pt-0">
          <Button block>Send now</Button>
        </CardFooter>
      </Card>

      <Note>
        <b>Toggle group vs Tabs vs Radio.</b> Toggle group sets a value in place (a filter, a mode).
        Tabs swap a whole panel. Radio is one-of-many inside a form where options need descriptions.
        Short, visible, value-setting → toggle group.
      </Note>
    </Section>
  )
}

function LiveRating() {
  const [v, setV] = useState(0)
  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"]
  return (
    <div className="flex items-center gap-1">
      <Rating size="lg" value={v} onValueChange={setV} />
      <RatingValue>
        {v ? (
          <>
            <b>{v}.0</b> · {labels[v]}
          </>
        ) : (
          "Tap a star to rate"
        )}
      </RatingValue>
    </div>
  )
}

export function RatingSection() {
  return (
    <Section
      id="rating"
      num="Component"
      title="Rating"
      description={
        <>
          Star ratings for review scores and capturing feedback. Stars use{" "}
          <code className="font-mono text-[12px]">--brand-accent</code> — one of the few intentional
          places the FCU gold appears. The interactive demo fills on hover and locks on click.
        </>
      }
    >
      <SubHead title="Display" hint="read-only · sm / md / lg" />
      <Demo>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Rating size="sm" value={4} readOnly />
            <DemoTag>sm</DemoTag>
          </div>
          <div className="flex items-center gap-5">
            <Rating value={4} readOnly />
            <RatingValue>
              <b>4.0</b> · 1,284 reviews
            </RatingValue>
          </div>
          <div className="flex items-center gap-5">
            <Rating size="lg" value={5} readOnly />
            <RatingValue>
              <b>5.0</b>
            </RatingValue>
          </div>
        </div>
      </Demo>

      <SubHead title="Interactive" hint="hover to preview · click to set" />
      <Demo>
        <LiveRating />
      </Demo>

      <SubHead title="In context" hint="feedback prompt · review summary" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>How was that?</CardTitle>
              <CardDescription>Rate your chat with our support team.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center py-2">
            <Rating size="lg" value={4} onValueChange={() => {}} />
          </CardContent>
          <CardFooter className="border-t-0 pt-0">
            <Button block>Submit feedback</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>App Store</CardTitle>
              <CardDescription>FCU Mobile</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[40px] font-semibold tracking-[-0.03em] text-foreground">
                4.8
              </span>
              <Rating value={5} readOnly />
            </div>
            <p className="m-0 text-[13px] text-foreground-muted">From 8,400+ ratings</p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
