"use client"

import * as React from "react"
import {
  UploadIcon,
  FileTextIcon,
  ImageIcon,
  CheckIcon,
  XIcon,
  CircleAlertIcon,
} from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dropzoneVariants = cva(
  "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors",
  {
    variants: {
      state: {
        idle: "cursor-pointer border-border-strong bg-surface hover:border-primary hover:bg-primary-subtle",
        dragging: "border-primary bg-primary-subtle",
        error: "border-destructive bg-status-danger-50",
      },
    },
    defaultVariants: { state: "idle" },
  }
)

function Dropzone({
  state = "idle",
  title,
  hint,
  icon,
  className,
  ...props
}: Omit<React.ComponentProps<"label">, "title"> &
  VariantProps<typeof dropzoneVariants> & {
    title?: React.ReactNode
    hint?: React.ReactNode
    icon?: React.ReactNode
  }) {
  return (
    <label
      data-slot="dropzone"
      data-state={state}
      className={cn(dropzoneVariants({ state }), className)}
      {...props}
    >
      {state === "idle" ? <input type="file" className="sr-only" /> : null}
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full border border-border bg-card [&_svg]:size-5",
          state === "error" ? "text-destructive" : "text-foreground-muted"
        )}
      >
        {icon ?? (state === "error" ? <CircleAlertIcon /> : <UploadIcon />)}
      </span>
      <span className="text-[14px] font-medium text-foreground [&_b]:font-semibold [&_b]:text-primary">
        {title}
      </span>
      {hint ? (
        <span className="font-mono text-[12.5px] text-foreground-subtle">{hint}</span>
      ) : null}
    </label>
  )
}

function FileItem({
  name,
  sub,
  kind = "doc",
  progress,
  status,
  onRemove,
  onRetry,
  className,
}: {
  name: string
  sub?: React.ReactNode
  kind?: "image" | "doc"
  progress?: number
  status?: "uploading" | "done" | "error"
  onRemove?: () => void
  onRetry?: () => void
  className?: string
}) {
  const ThumbIcon = kind === "image" ? ImageIcon : FileTextIcon
  return (
    <div
      data-slot="file-item"
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card p-3",
        status === "error" && "border-destructive/35",
        className
      )}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-md bg-surface-sunken [&_svg]:size-[18px]",
          status === "done"
            ? "text-status-success-700"
            : status === "error"
              ? "text-destructive"
              : "text-foreground-muted"
        )}
      >
        <ThumbIcon />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-medium text-foreground">{name}</span>
        {sub ? (
          <span
            className={cn(
              "font-mono text-[11px]",
              status === "error" ? "text-destructive" : "text-foreground-subtle"
            )}
          >
            {sub}
          </span>
        ) : null}
        {typeof progress === "number" ? (
          <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        ) : null}
      </div>
      {status === "done" ? (
        <span className="inline-flex shrink-0 text-status-success-700 [&_svg]:size-[18px]">
          <CheckIcon />
        </span>
      ) : null}
      {status === "error" ? (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 rounded-md px-2 py-1 text-[13px] font-medium text-foreground-muted transition-colors hover:bg-surface-sunken hover:text-foreground"
        >
          Retry
        </button>
      ) : null}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove"
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm text-foreground-muted transition-colors hover:bg-surface-sunken hover:text-foreground [&_svg]:size-4"
      >
        <XIcon />
      </button>
    </div>
  )
}

export { Dropzone, FileItem }
