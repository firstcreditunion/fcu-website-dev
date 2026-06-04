"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleAlertIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      icons={{
        success: <CircleCheckIcon className="size-[18px] text-status-success-500" />,
        info: <InfoIcon className="size-[18px] text-status-info-500" />,
        warning: <TriangleAlertIcon className="size-[18px] text-status-warning-500" />,
        error: <CircleAlertIcon className="size-[18px] text-destructive" />,
        loading: <Loader2Icon className="size-[18px] animate-spin text-primary" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group/toast !gap-3 !rounded-lg !border !border-border !border-l-[3px] !bg-popover !p-3.5 !text-[13.5px] !shadow-[var(--shadow-lg)] data-[type=success]:!border-l-status-success-500 data-[type=info]:!border-l-status-info-500 data-[type=warning]:!border-l-status-warning-500 data-[type=error]:!border-l-destructive",
          title: "!text-[13.5px] !font-semibold !tracking-[-0.005em] !text-foreground",
          description: "!text-[13px] !text-foreground-muted",
          icon: "!mt-0.5 !mr-0",
          closeButton:
            "!rounded-sm !border-border !bg-popover !text-foreground-muted hover:!bg-surface-sunken hover:!text-foreground",
          actionButton:
            "!h-7 !rounded-md !bg-primary !px-2.5 !text-[12.5px] !font-medium !text-primary-foreground",
          cancelButton:
            "!h-7 !rounded-md !bg-surface-sunken !px-2.5 !text-[12.5px] !font-medium !text-foreground-muted",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
