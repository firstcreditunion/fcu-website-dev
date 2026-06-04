import {
  InboxIcon,
  SearchIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
  PlusIcon,
  CalendarIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Section } from "../_components/section"
import { Note, SubHead } from "../_components/showcase"

export function EmptyState() {
  return (
    <Section
      id="empty-state"
      num="Component"
      title="Empty state"
      description={
        <>
          What fills a region when there&rsquo;s nothing to show — a first-time list, a cleared
          search, a finished task, an error. Every empty state names <em>why</em> it&rsquo;s empty
          and offers a clear next step. Never an empty box.
        </>
      }
    >
      <SubHead title="Variants" hint="first-use · no-results · success · error" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="shadow-none">
          <Empty>
            <EmptyMedia variant="default">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>No payees yet</EmptyTitle>
            <EmptyDescription>
              Add someone you send money to regularly and they&rsquo;ll show up here for one-tap
              transfers.
            </EmptyDescription>
            <EmptyContent>
              <Button size="sm">
                <PlusIcon />
                Add a payee
              </Button>
            </EmptyContent>
          </Empty>
        </Card>

        <Card className="shadow-none">
          <Empty>
            <EmptyMedia variant="neutral">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>No results for &ldquo;xyzzy&rdquo;</EmptyTitle>
            <EmptyDescription>
              Try a different search term, or widen your date range to see more transactions.
            </EmptyDescription>
            <EmptyContent>
              <Button variant="outline" size="sm">
                Clear search
              </Button>
            </EmptyContent>
          </Empty>
        </Card>

        <Card className="shadow-none">
          <Empty>
            <EmptyMedia variant="success">
              <CircleCheckIcon />
            </EmptyMedia>
            <EmptyTitle>You&rsquo;re all caught up</EmptyTitle>
            <EmptyDescription>
              No actions need your attention. We&rsquo;ll let you know the moment something does.
            </EmptyDescription>
          </Empty>
        </Card>

        <Card className="shadow-none">
          <Empty>
            <EmptyMedia variant="danger">
              <TriangleAlertIcon />
            </EmptyMedia>
            <EmptyTitle>Couldn&rsquo;t load transactions</EmptyTitle>
            <EmptyDescription>
              Something went wrong on our end. Check your connection and try again.
            </EmptyDescription>
            <EmptyContent>
              <Button size="sm">Retry</Button>
              <Button variant="ghost" size="sm">
                Contact support
              </Button>
            </EmptyContent>
          </Empty>
        </Card>
      </div>

      <SubHead title="In context" hint="inside a card · bordered standalone" />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Scheduled transfers</CardTitle>
            <CardDescription>Upcoming automatic payments</CardDescription>
          </div>
          <CardAction>
            <Button variant="outline" size="sm">
              New transfer
            </Button>
          </CardAction>
        </CardHeader>
        <div className="border-t border-border">
          <Empty>
            <EmptyMedia variant="default">
              <CalendarIcon />
            </EmptyMedia>
            <EmptyTitle>No scheduled transfers</EmptyTitle>
            <EmptyDescription>
              Set up a recurring transfer to a saver or a payee and it&rsquo;ll run automatically —
              perfect for rent, bills, or savings goals.
            </EmptyDescription>
            <EmptyContent>
              <Button size="sm">Schedule a transfer</Button>
            </EmptyContent>
          </Empty>
        </div>
      </Card>

      <div className="mt-4">
        <Empty bordered>
          <EmptyMedia variant="neutral">
            <UsersIcon />
          </EmptyMedia>
          <EmptyTitle>Invite your flatmates</EmptyTitle>
          <EmptyDescription>
            Split bills and rent without the awkward chase. Send an invite and we&rsquo;ll set up
            shared payment requests.
          </EmptyDescription>
          <EmptyContent>
            <Button size="sm">Send an invite</Button>
          </EmptyContent>
        </Empty>
      </div>

      <Note>
        <b>Three parts, always.</b> An icon to set the tone, one sentence saying why it&rsquo;s empty
        and what living here looks like, and one primary action. Drop any of the three and the state
        reads as broken rather than intentional.
      </Note>
    </Section>
  )
}
