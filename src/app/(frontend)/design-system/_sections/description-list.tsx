import { type ReactNode } from "react"
import { CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardEyebrow,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
  DescriptionDetail,
} from "@/components/ui/description-list"
import { Section } from "../_components/section"
import { Note } from "../_components/showcase"

function VarHead({ label, title }: { label: string; title: ReactNode }) {
  return (
    <div className="mt-10 mb-4 flex flex-col gap-2 first:mt-0">
      <span className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-foreground-subtle">
        {label}
      </span>
      <h3 className="text-[17px] font-semibold tracking-[-0.012em] text-foreground">{title}</h3>
    </div>
  )
}

export function DescriptionListSection() {
  return (
    <Section
      id="description-list"
      num="Pattern · Description list"
      title="Description list"
      description={
        <>
          Structured key–value pairs for displaying records — account details, payee info, a loan
          summary, a transaction receipt. It&rsquo;s the read-only counterpart to a form: where Input
          captures, the description list reports. Mono for any value the eye scans (numbers, dates,
          codes).
        </>
      }
    >
      {/* ─── A · Variants ─── */}
      <VarHead label="A · 1" title="Account details" />
      <DescriptionList className="max-w-[620px]">
        <DescriptionRow>
          <DescriptionTerm>Account name</DescriptionTerm>
          <DescriptionDetail>Everyday</DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Account number</DescriptionTerm>
          <DescriptionDetail mono>
            12-3401-0234567-00
            <Button variant="ghost" size="icon-sm" className="ml-auto" aria-label="Copy">
              <CopyIcon />
            </Button>
          </DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Type</DescriptionTerm>
          <DescriptionDetail>Transaction account</DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetail>
            <Badge variant="success" dot>
              Active
            </Badge>
          </DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Opened</DescriptionTerm>
          <DescriptionDetail mono>14 Mar 2018</DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Available balance</DescriptionTerm>
          <DescriptionDetail mono className="font-semibold">
            $4,182.14
          </DescriptionDetail>
        </DescriptionRow>
      </DescriptionList>

      <VarHead label="A · 2" title="Striped · loan summary" />
      <DescriptionList striped className="max-w-[620px]">
        <DescriptionRow>
          <DescriptionTerm>Loan amount</DescriptionTerm>
          <DescriptionDetail mono>$25,000.00</DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Interest rate</DescriptionTerm>
          <DescriptionDetail mono>7.95% p.a.</DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Term</DescriptionTerm>
          <DescriptionDetail>36 months</DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Weekly repayment</DescriptionTerm>
          <DescriptionDetail mono>$180.42</DescriptionDetail>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>First payment</DescriptionTerm>
          <DescriptionDetail mono>06 Jun 2026</DescriptionDetail>
        </DescriptionRow>
      </DescriptionList>

      {/* ─── B · In context ─── */}
      <VarHead label="B · 1" title="Transaction receipt" />
      <Card className="max-w-[620px]">
        <CardHeader>
          <div className="min-w-0">
            <CardEyebrow>Receipt</CardEyebrow>
            <CardTitle>Payment to Sarah Chen</CardTitle>
            <CardDescription>28 May 2026 · 10:02</CardDescription>
          </div>
          <CardAction>
            <Badge variant="success" dot>
              Settled
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="pt-1">
          <DescriptionList inline>
            <DescriptionRow>
              <DescriptionTerm>Amount</DescriptionTerm>
              <DescriptionDetail mono className="text-[15px] font-semibold">
                $1,250.00
              </DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>From</DescriptionTerm>
              <DescriptionDetail mono>Everyday · 12-3401-0234567-00</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>To</DescriptionTerm>
              <DescriptionDetail mono>Sarah Chen · 06-0145-0987654-00</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>Reference</DescriptionTerm>
              <DescriptionDetail>June groceries</DescriptionDetail>
            </DescriptionRow>
            <DescriptionRow>
              <DescriptionTerm>Transaction ID</DescriptionTerm>
              <DescriptionDetail mono>TX-019823</DescriptionDetail>
            </DescriptionRow>
          </DescriptionList>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm">
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            Send again
          </Button>
        </CardFooter>
      </Card>

      <Note>
        <b>Term column stays narrow.</b> Keep the label column fixed (200px) so values left-align into
        a clean scannable edge. On mobile it stacks to label-over-value automatically.
      </Note>
    </Section>
  )
}
