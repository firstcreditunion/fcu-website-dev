import { type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Skeleton,
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonButton,
  SkeletonBadge,
} from "@/components/ui/skeleton"
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
    <span className="mb-3 block font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
      {children}
    </span>
  )
}

export function SkeletonSection() {
  return (
    <Section
      id="skeleton"
      num="Component"
      title="Skeleton"
      description={
        <>
          A placeholder shape that mimics the layout of content not yet loaded — it cuts the
          &ldquo;flash of empty page&rdquo; that makes a UI feel broken. The shimmer respects{" "}
          <code className="font-mono text-[12px]">prefers-reduced-motion</code>.
        </>
      }
    >
      {/* ═══════════ A · PRIMITIVES ═══════════ */}
      <h3 className="mt-2 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground">
        A · Primitives
      </h3>
      <p className="mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted">
        Six building blocks. Compose them to mirror the shape of any final UI.
      </p>

      <Demo>
        <DemoTag>text · single line</DemoTag>
        <div className="flex max-w-[460px] flex-col gap-2">
          <SkeletonText className="w-[96%]" />
          <SkeletonText className="w-[85%]" />
          <SkeletonText className="w-[60%]" />
        </div>
      </Demo>

      <Demo>
        <DemoTag>title</DemoTag>
        <SkeletonTitle className="max-w-[360px]" />
      </Demo>

      <Demo>
        <DemoTag>avatar · sizes</DemoTag>
        <div className="flex items-center gap-3.5">
          <SkeletonAvatar className="size-7" />
          <SkeletonAvatar />
          <SkeletonAvatar className="size-14" />
          <SkeletonAvatar className="size-20" />
        </div>
      </Demo>

      <Demo>
        <DemoTag>image · 16:9</DemoTag>
        <div className="max-w-[380px]">
          <SkeletonImage />
        </div>
      </Demo>

      <Demo>
        <DemoTag>button · badge</DemoTag>
        <div className="flex items-center gap-2.5">
          <SkeletonButton />
          <SkeletonButton className="w-[120px]" />
          <SkeletonBadge />
        </div>
      </Demo>

      {/* ═══════════ B · COMPOSED ═══════════ */}
      <h3 className="mt-14 mb-3 text-base font-semibold tracking-[-0.01em] text-foreground">
        B · Composed shapes
      </h3>
      <p className="mb-6 max-w-[68ch] text-[13.5px] leading-relaxed text-foreground-muted">
        Mirror the structure of the loaded state — same paddings, same proportions, same gap rhythm.
        The closer the skeleton looks to the real thing, the less jarring the transition.
      </p>

      <SubHead title="Card skeleton" hint="loading ↔ loaded, side by side" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="overflow-hidden">
          <SkeletonImage className="rounded-none" />
          <CardHeader>
            <div className="flex-1">
              <SkeletonTitle className="mb-2" />
              <SkeletonText className="w-4/5" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            <SkeletonText />
            <SkeletonText className="w-[90%]" />
            <SkeletonText className="w-[70%]" />
          </CardContent>
          <CardFooter className="justify-start border-t-0 pt-0">
            <SkeletonButton />
            <SkeletonButton className="w-20" />
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-fcu-primary-200 to-fcu-primary-100" />
          <CardHeader>
            <div>
              <CardTitle>Open an Everyday Saver</CardTitle>
              <CardDescription>Loaded state · for reference</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            No teaser rates, no balance tiers, no fees. Open one in under three minutes — we&rsquo;ll
            verify your ID electronically.
          </CardContent>
          <CardFooter className="justify-start border-t-0 pt-0">
            <Button size="sm">Open Saver</Button>
            <Button variant="ghost" size="sm">
              Learn more
            </Button>
          </CardFooter>
        </Card>
      </div>

      <SubHead title="Table row skeleton" hint="avatar · name · account · amount" />
      <Card>
        <CardContent className="px-[18px] py-0">
          {[
            ["36%", "50%", "w-[84px]"],
            ["42%", "56%", "w-[76px]"],
            ["30%", "44%", "w-[92px]"],
            ["50%", "38%", "w-[80px]"],
          ].map(([a, b, amt], i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-t border-border py-3.5 first:border-t-0"
            >
              <SkeletonAvatar />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <SkeletonText className="h-[0.85em]" style={{ width: a }} />
                <SkeletonText className="h-[0.7em]" style={{ width: b }} />
              </div>
              <Skeleton className={`h-3.5 rounded-[4px] ${amt}`} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Note>
        <b>Match shape, not pixels.</b> Skeletons give the eye the layout to expect — three columns,
        four rows, an avatar on the left. They don&rsquo;t need to be a pixel-perfect match of the
        final content.
      </Note>
    </Section>
  )
}
