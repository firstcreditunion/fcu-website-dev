"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const accordionVariants = cva("group/accordion flex w-full flex-col", {
  variants: {
    variant: {
      default: "overflow-hidden rounded-xl border border-border bg-card",
      ghost: "",
      spaced: "gap-2",
    },
  },
  defaultVariants: { variant: "default" },
})

function Accordion({
  className,
  variant = "default",
  ...props
}: AccordionPrimitive.Root.Props & VariantProps<typeof accordionVariants>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      className={cn(accordionVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "min-w-0 group-data-[variant=default]/accordion:border-t group-data-[variant=default]/accordion:border-border group-data-[variant=default]/accordion:first:border-t-0 group-data-[variant=ghost]/accordion:border-t group-data-[variant=ghost]/accordion:border-border group-data-[variant=ghost]/accordion:last:border-b group-data-[variant=spaced]/accordion:overflow-hidden group-data-[variant=spaced]/accordion:rounded-lg group-data-[variant=spaced]/accordion:border group-data-[variant=spaced]/accordion:border-border group-data-[variant=spaced]/accordion:bg-card",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 cursor-pointer items-center justify-between gap-4 px-5 py-[18px] text-left text-[14.5px] font-medium tracking-[-0.005em] text-foreground transition-colors outline-none hover:bg-surface-muted focus-visible:[box-shadow:inset_0_0_0_2px_var(--ring)] group-data-[variant=ghost]/accordion:px-0 group-data-[variant=ghost]/accordion:py-3.5 group-data-[variant=ghost]/accordion:hover:bg-transparent",
          className
        )}
        {...props}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">{children}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-foreground-subtle transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:text-foreground" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionSub({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="accordion-sub"
      className={cn(
        "text-[12.5px] leading-snug font-normal text-foreground-muted",
        className
      )}
      {...props}
    />
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-[13.5px] data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) px-5 pt-0 pb-5 leading-relaxed text-foreground-muted group-data-[variant=ghost]/accordion:px-0 group-data-[variant=ghost]/accordion:pb-3.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-2.5 [&_strong]:font-medium [&_strong]:text-foreground",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionSub, AccordionContent }
