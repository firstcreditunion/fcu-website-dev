"use client"

import { type ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertDescription,
} from "@/components/ui/alert"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Section } from "../_components/section"
import { Demo, SubHead } from "../_components/showcase"

function DemoTag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
      {children}
    </span>
  )
}

function OtpBox({
  value,
  masked,
  state,
  sm,
}: {
  value?: string
  masked?: boolean
  state?: "error" | "success"
  sm?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border bg-card font-mono text-foreground",
        sm ? "h-11 w-[38px] rounded-md text-[18px]" : "h-14 w-12 text-[22px]",
        value ? "border-border-strong" : "border-input",
        state === "error" && "border-destructive",
        state === "success" && "border-status-success-500"
      )}
    >
      {value ? (masked ? "•" : value) : ""}
    </div>
  )
}

function Boxes({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>
}

const sixSlots = (
  <InputOTPGroup>
    {Array.from({ length: 6 }, (_, i) => (
      <InputOTPSlot key={i} index={i} />
    ))}
  </InputOTPGroup>
)

export function OtpSection() {
  return (
    <Section
      id="otp"
      num="Component"
      title="OTP / PIN input"
      description={
        <>
          Segmented single-character boxes for one-time codes (2FA, SMS verification) and PIN entry.
          The live demo auto-advances as you type, accepts pastes, and backspaces between fields.
          Monospace digits keep every box identical.
        </>
      }
    >
      <SubHead title="Live demo" hint="6-digit · type or paste" />
      <Demo>
        <DemoTag>6-digit OTP · interactive</DemoTag>
        <InputOTP maxLength={6} className="mt-3">
          {sixSlots}
        </InputOTP>
      </Demo>

      <SubHead title="Grouped" hint="3 + 3 with a separator" />
      <Demo>
        <InputOTP maxLength={6} className="mt-1">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      <SubHead title="States" hint="PIN · error · success" />
      <Demo>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <DemoTag>PIN · 4-digit · masked · small</DemoTag>
            <Boxes>
              <OtpBox sm value="1" masked />
              <OtpBox sm value="2" masked />
              <OtpBox sm value="3" masked />
              <OtpBox sm />
            </Boxes>
          </div>
          <div className="flex flex-col gap-2">
            <DemoTag>Error</DemoTag>
            <Boxes>
              {["4", "8", "2", "9", "1", "5"].map((v, i) => (
                <OtpBox key={i} value={v} state="error" />
              ))}
            </Boxes>
            <Alert variant="danger" display="inline" className="max-w-[340px]">
              <AlertIcon>
                <CircleAlertIcon />
              </AlertIcon>
              <AlertContent>
                <AlertDescription>That code didn&rsquo;t match. 2 attempts left.</AlertDescription>
              </AlertContent>
            </Alert>
          </div>
          <div className="flex flex-col gap-2">
            <DemoTag>Success</DemoTag>
            <Boxes>
              {["4", "8", "2", "9", "1", "5"].map((v, i) => (
                <OtpBox key={i} value={v} state="success" />
              ))}
            </Boxes>
          </div>
        </div>
      </Demo>

      <SubHead title="In context" hint="the 2FA step after sign-in" />
      <Card className="max-w-[420px]">
        <CardHeader>
          <div>
            <CardTitle>Enter your code</CardTitle>
            <CardDescription>
              We sent a 6-digit code to •••• 4821. It expires in 5 minutes.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
          <InputOTP maxLength={6}>{sixSlots}</InputOTP>
          <button
            type="button"
            className="text-[13px] font-medium text-primary underline-offset-2 outline-none hover:underline"
          >
            Didn&rsquo;t get it? Resend in 0:24
          </button>
        </CardContent>
        <CardFooter className="border-t-0 pt-0">
          <Button block>Verify</Button>
        </CardFooter>
      </Card>
    </Section>
  )
}
