import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const nativeSelectVariants = cva(
  "w-full min-w-0 cursor-pointer appearance-none border border-input bg-card text-foreground outline-none transition-colors hover:border-border-strong focus-visible:border-ring focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-foreground-subtle aria-invalid:border-destructive aria-invalid:focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--destructive)_30%,transparent)]",
  {
    variants: {
      size: {
        sm: "h-8 rounded-md pr-8 pl-2.5 text-[13px]",
        default: "h-10 rounded-lg pr-9 pl-3 text-sm",
        lg: "h-12 rounded-lg pr-9 pl-3.5 text-[15px]",
      },
    },
    defaultVariants: { size: "default" },
  }
)

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof nativeSelectVariants>

function NativeSelect({ className, size, ...props }: NativeSelectProps) {
  return (
    <div
      data-slot="native-select-wrapper"
      className={cn("group/native-select relative w-full has-[select:disabled]:opacity-60", className)}
    >
      <select data-slot="native-select" className={nativeSelectVariants({ size })} {...props} />
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-[18px] -translate-y-1/2 text-foreground-subtle"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" className={cn(className)} {...props} />
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
