"use client"

import { type ReactNode } from "react"
import { toast } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleAlertIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Section } from "../_components/section"
import { Demo, Note, SubHead } from "../_components/showcase"

type ToastVariant = "success" | "info" | "warning" | "danger"

const icons: Record<ToastVariant, ReactNode> = {
  success: <CircleCheckIcon />,
  info: <InfoIcon />,
  warning: <TriangleAlertIcon />,
  danger: <CircleAlertIcon />,
}
const accent: Record<ToastVariant, string> = {
  success: "border-l-status-success-500",
  info: "border-l-status-info-500",
  warning: "border-l-status-warning-500",
  danger: "border-l-destructive",
}
const iconColor: Record<ToastVariant, string> = {
  success: "text-status-success-500",
  info: "text-status-info-500",
  warning: "text-status-warning-500",
  danger: "text-destructive",
}

function ToastLink({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="text-[12.5px] font-medium text-primary underline-offset-2 outline-none hover:underline"
    >
      {children}
    </button>
  )
}

function Toast({
  variant,
  title,
  message,
  action,
  showClose = true,
  life,
}: {
  variant: ToastVariant
  title: string
  message?: ReactNode
  action?: ReactNode
  showClose?: boolean
  life?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-3 overflow-hidden rounded-lg border border-border border-l-[3px] bg-popover px-4 py-3.5 shadow-[var(--shadow-lg)]",
        accent[variant]
      )}
    >
      <span
        className={cn("mt-px inline-flex size-[18px] shrink-0 [&_svg]:size-[18px]", iconColor[variant])}
      >
        {icons[variant]}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="m-0 text-[13.5px] font-semibold tracking-[-0.005em] text-foreground">{title}</p>
        {message ? (
          <p className="m-0 text-[13px] leading-[1.5] text-foreground-muted [&_strong]:font-medium [&_strong]:text-foreground">
            {message}
          </p>
        ) : null}
        {action ? <div className="mt-1.5 inline-flex gap-2">{action}</div> : null}
      </div>
      {showClose ? (
        <button
          type="button"
          aria-label="Dismiss"
          className="inline-flex size-[22px] shrink-0 items-center justify-center rounded-sm text-foreground-subtle transition-colors hover:bg-surface-sunken hover:text-foreground [&_svg]:size-3.5"
        >
          <XIcon />
        </button>
      ) : null}
      {life ? (
        <div
          className={cn(
            "absolute bottom-0 left-0 h-0.5 opacity-60",
            iconColor[variant].replace("text-", "bg-")
          )}
          style={{ width: "62%" }}
        />
      ) : null}
    </div>
  )
}

function Region({ children }: { children: ReactNode }) {
  return <div className="flex max-w-[380px] flex-col gap-2.5">{children}</div>
}

export function ToastSection() {
  return (
    <Section
      id="toast"
      num="Component"
      title="Toast"
      description={
        <>
          A transient, non-blocking notification that confirms something happened — a transfer sent,
          a setting saved, a passing error. Lives in a region (usually bottom-right) and
          auto-dismisses. Toasts are for <i>&ldquo;by the way&rdquo;</i> messages; for anything the
          user <em>must</em> read, use an Alert.
        </>
      }
    >
      <SubHead title="Variants" hint="four statuses · accent stripe" />
      <Demo>
        <Region>
          <Toast variant="success" title="Transfer sent" message={<><strong>$1,250.00</strong> on its way to Sarah Chen.</>} />
          <Toast variant="info" title="Statement ready" message="May statement is now available in your Documents." />
          <Toast variant="warning" title="Email verification pending" message="Some features are locked until you confirm your email." action={<ToastLink>Resend</ToastLink>} />
          <Toast variant="danger" title="Couldn't send transfer" message="The receiving account is locked. Try again or contact us." action={<ToastLink>Try again</ToastLink>} />
        </Region>
      </Demo>

      <SubHead title="Composition" hint="title · +message · +one action" />
      <Demo>
        <Region>
          <Toast variant="success" title="Settings saved" showClose={false} />
          <Toast variant="success" title="Payee deleted" action={<ToastLink>Undo</ToastLink>} />
          <Toast variant="info" title="Copied to clipboard" message={<strong>12-3401-0234567-00</strong>} showClose={false} />
        </Region>
      </Demo>

      <SubHead title="Live" hint="fires through the app's real Toaster" />
      <Demo>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success("Transfer sent", { description: "$1,250.00 on its way to Sarah Chen." })
            }
          >
            Success
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("Statement ready", { description: "May statement is in your Documents." })}
          >
            Info
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.warning("Email verification pending", {
                description: "Some features are locked until you confirm.",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.error("Couldn't send transfer", {
                description: "The receiving account is locked.",
                action: { label: "Try again", onClick: () => {} },
              })
            }
          >
            Error + action
          </Button>
        </div>
      </Demo>

      <SubHead title="In context" hint="stacked region · newest on top" />
      <div
        className="relative min-h-[340px] overflow-hidden rounded-xl border border-border p-6"
        style={{
          backgroundColor: "var(--surface)",
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--neutral-200) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      >
        <h3 className="m-0 text-[18px] font-semibold tracking-[-0.012em] text-foreground">
          Member dashboard
        </h3>
        <p className="mt-2 text-sm text-foreground-muted">
          Three things happened in the last few seconds.
        </p>
        <div className="absolute right-6 bottom-6 w-[calc(100%-3rem)] max-w-[380px]">
          <Region>
            <Toast variant="success" title="Transfer sent" message={<><strong>$1,250.00</strong> to Sarah Chen · settled.</>} life />
            <Toast variant="info" title="Statement ready" message="May statement is in your Documents." />
            <Toast variant="warning" title="2FA expires soon" message="Re-register your authenticator before 1 June." action={<ToastLink>Set up</ToastLink>} />
          </Region>
        </div>
      </div>

      <Note>
        <b>Cap the stack at 3.</b> Beyond three visible toasts, queue further notifications and
        reveal them as earlier ones dismiss — otherwise the screen turns into a notification wall.
      </Note>
    </Section>
  )
}
