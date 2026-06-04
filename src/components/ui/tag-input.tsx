"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex h-[26px] items-center gap-[5px] rounded-md border pr-1 pl-2.5 text-[12.5px] font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "border-border bg-surface-sunken text-foreground-muted",
        primary: "border-primary/20 bg-primary-subtle text-primary",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
)

function Chip({
  className,
  variant,
  onRemove,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & { onRemove?: () => void }) {
  return (
    <span className={cn(chipVariants({ variant }), className)} {...props}>
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="inline-flex size-[18px] items-center justify-center rounded-[3px] text-current opacity-60 transition-[opacity,background-color] hover:bg-current/15 hover:opacity-100 [&_svg]:size-[11px]"
        >
          <XIcon />
        </button>
      ) : null}
    </span>
  )
}

function ChipRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chip-row"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

function TagInput({
  value,
  onValueChange,
  placeholder,
  variant = "primary",
  error,
  className,
}: {
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  variant?: "neutral" | "primary"
  error?: boolean
  className?: string
}) {
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const add = () => {
    const v = draft.trim()
    if (v && !value.includes(v)) onValueChange([...value, v])
    setDraft("")
  }
  const removeAt = (i: number) => onValueChange(value.filter((_, j) => j !== i))

  return (
    <div
      data-slot="tag-input"
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex min-h-10 cursor-text flex-wrap items-center gap-1.5 rounded-lg border bg-card px-2 py-[5px] transition-[color,box-shadow] focus-within:border-ring focus-within:shadow-[var(--shadow-focus)]",
        error ? "border-destructive" : "border-input",
        className
      )}
    >
      {value.map((tag, i) => (
        <Chip key={tag} variant={variant} onRemove={() => removeAt(i)}>
          {tag}
        </Chip>
      ))}
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            add()
          } else if (e.key === "Backspace" && !draft && value.length) {
            removeAt(value.length - 1)
          }
        }}
        placeholder={placeholder}
        className="h-[26px] min-w-20 flex-1 border-0 bg-transparent text-[14px] tracking-[-0.005em] text-foreground outline-none placeholder:text-foreground-subtle"
      />
    </div>
  )
}

export { TagInput, Chip, ChipRow }
