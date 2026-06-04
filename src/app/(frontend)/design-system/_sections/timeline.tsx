import { type ReactNode } from "react"
import { CheckIcon, SendIcon, UserIcon, XIcon, FileTextIcon } from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Timeline,
  TimelineItem,
  TimelineHead,
  TimelineTitle,
  TimelineTime,
  TimelineDesc,
} from "@/components/ui/timeline"
import { Section } from "../_components/section"

function VarHead({
  label,
  title,
  children,
}: {
  label: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="mt-10 mb-4 flex flex-col gap-2 first:mt-0">
      <span className="font-mono text-[10.5px] tracking-[0.04em] uppercase text-foreground-subtle">
        {label}
      </span>
      <h3 className="text-[17px] font-semibold tracking-[-0.012em] text-foreground">{title}</h3>
      {children ? (
        <p className="m-0 max-w-[64ch] text-[13.5px] leading-relaxed text-pretty text-foreground-muted">
          {children}
        </p>
      ) : null}
    </div>
  )
}

/** Filled dot for the active process node. */
const ActiveDot = () => <span className="size-1.5 rounded-full bg-current" />

export function TimelineSection() {
  return (
    <Section
      id="timeline"
      num="Pattern · Timeline"
      title="Timeline & activity feed"
      description={
        <>
          A vertical sequence of events on a connecting rail — application progress, a
          transaction&rsquo;s lifecycle, a security audit log. Each node carries a state (done /
          active / pending / failed) so the member can see at a glance where things stand and
          what&rsquo;s next.
        </>
      }
    >
      {/* ─── A · Process timeline ─── */}
      <VarHead label="A · Process timeline" title="A known sequence with a clear end">
        For a membership application or a transfer&rsquo;s journey. Completed steps fill green, the
        current step fills primary, upcoming steps are dashed.
      </VarHead>
      <div className="grid gap-4 min-[900px]:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="min-w-0">
              <CardTitle>Application status</CardTitle>
              <CardDescription>Membership · started 28 May</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Timeline>
              <TimelineItem state="complete" icon={<CheckIcon />}>
                <TimelineHead>
                  <TimelineTitle>Application submitted</TimelineTitle>
                  <TimelineTime>28 May · 09:14</TimelineTime>
                </TimelineHead>
                <TimelineDesc>Personal details and account type received.</TimelineDesc>
              </TimelineItem>
              <TimelineItem state="complete" icon={<CheckIcon />}>
                <TimelineHead>
                  <TimelineTitle>Identity verified</TimelineTitle>
                  <TimelineTime>28 May · 09:21</TimelineTime>
                </TimelineHead>
                <TimelineDesc>Driver&rsquo;s licence confirmed with the DIA.</TimelineDesc>
              </TimelineItem>
              <TimelineItem state="active" icon={<ActiveDot />}>
                <TimelineHead>
                  <TimelineTitle>Under review</TimelineTitle>
                  <TimelineTime>In progress</TimelineTime>
                </TimelineHead>
                <TimelineDesc>Our team is doing a final check. Usually under an hour.</TimelineDesc>
              </TimelineItem>
              <TimelineItem state="pending">
                <TimelineHead>
                  <TimelineTitle>Account opened</TimelineTitle>
                </TimelineHead>
                <TimelineDesc>
                  You&rsquo;ll get your member number and can make your first deposit.
                </TimelineDesc>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="min-w-0">
              <CardTitle>Transfer lifecycle</CardTitle>
              <CardDescription>$1,250.00 → Sarah Chen</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Timeline>
              <TimelineItem state="complete" icon={<CheckIcon />}>
                <TimelineHead>
                  <TimelineTitle>Initiated</TimelineTitle>
                  <TimelineTime>10:02:11</TimelineTime>
                </TimelineHead>
                <TimelineDesc>You authorised the transfer.</TimelineDesc>
              </TimelineItem>
              <TimelineItem state="complete" icon={<CheckIcon />}>
                <TimelineHead>
                  <TimelineTitle>Cleared</TimelineTitle>
                  <TimelineTime>10:02:12</TimelineTime>
                </TimelineHead>
                <TimelineDesc>Funds debited from Everyday · ending 567.</TimelineDesc>
              </TimelineItem>
              <TimelineItem state="complete" icon={<CheckIcon />}>
                <TimelineHead>
                  <TimelineTitle>Settled</TimelineTitle>
                  <TimelineTime>10:02:14</TimelineTime>
                </TimelineHead>
                <TimelineDesc>Received by ANZ · ending 654.</TimelineDesc>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </div>

      {/* ─── B · Activity feed ─── */}
      <VarHead label="B · Activity feed" title="An open-ended log of past events">
        For security activity or account history. Icon nodes carry meaning; a failed event turns red.
      </VarHead>
      <Card className="max-w-[620px]">
        <CardHeader>
          <div className="min-w-0">
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Security & account log</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Timeline variant="feed">
            <TimelineItem icon={<SendIcon />} nodeClassName="text-primary">
              <TimelineHead>
                <TimelineTitle>Transfer sent</TimelineTitle>
                <TimelineTime>Today · 10:02</TimelineTime>
              </TimelineHead>
              <TimelineDesc>
                <strong>$1,250.00</strong> to Sarah Chen.
              </TimelineDesc>
            </TimelineItem>
            <TimelineItem icon={<UserIcon />}>
              <TimelineHead>
                <TimelineTitle>New sign-in</TimelineTitle>
                <TimelineTime>Today · 08:30</TimelineTime>
              </TimelineHead>
              <TimelineDesc>iPhone · Auckland, NZ.</TimelineDesc>
            </TimelineItem>
            <TimelineItem state="danger" icon={<XIcon />}>
              <TimelineHead>
                <TimelineTitle>Direct debit failed</TimelineTitle>
                <TimelineTime>27 May · 02:00</TimelineTime>
              </TimelineHead>
              <TimelineDesc>Auckland Council · Rates — funds short by $12.40.</TimelineDesc>
            </TimelineItem>
            <TimelineItem icon={<FileTextIcon />}>
              <TimelineHead>
                <TimelineTitle>Statement ready</TimelineTitle>
                <TimelineTime>25 May · 06:00</TimelineTime>
              </TimelineHead>
              <TimelineDesc>April statement available in Documents.</TimelineDesc>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Card>
    </Section>
  )
}
