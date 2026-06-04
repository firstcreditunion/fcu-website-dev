import { type ReactNode } from "react"
import { UserIcon, LandmarkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Section } from "../_components/section"
import { Demo, SubHead } from "../_components/showcase"

function Swatch({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="font-mono text-[10.5px] text-foreground-subtle">{label}</span>
    </div>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-end gap-8">{children}</div>
}

const sizes = [
  ["xs", "xs · 20"],
  ["sm", "sm · 28"],
  ["md", "md · 40"],
  ["lg", "lg · 56"],
  ["xl", "xl · 80"],
  ["2xl", "2xl · 112"],
] as const

const colourways = [
  { cw: "primary", i: "MT" },
  { cw: "sage", i: "SC" },
  { cw: "mint", i: "DM" },
  { cw: "faded", i: "PI" },
  { cw: "slate", i: "VE" },
] as const

const statuses = [
  { cw: "primary", i: "MT", s: "online" },
  { cw: "sage", i: "SC", s: "busy" },
  { cw: "mint", i: "DM", s: "away" },
  { cw: "slate", i: "VE", s: "offline" },
] as const

type Payee = {
  i: string
  cw: "primary" | "sage" | "mint" | "slate"
  sq?: boolean
  st?: "online" | "busy" | "away" | "offline"
  icon?: boolean
  n: string
  s: string
  b?: ["success" | "neutral", string]
}

const payees: Payee[] = [
  { i: "SC", cw: "primary", st: "online", n: "Sarah Chen", s: "06-0145-0987654-00 · ANZ", b: ["success", "Verified"] },
  { i: "AC", cw: "sage", sq: true, n: "Auckland Council · Rates", s: "02-1100-7842910-00 · scheduled", b: ["neutral", "Auto"] },
  { i: "DM", cw: "mint", n: "Dion Mahuika", s: "12-3401-1198400-00 · FCU" },
  { i: "VE", cw: "slate", sq: true, icon: true, n: "Vector Energy", s: "03-0518-0044721-00" },
]

export function AvatarSection() {
  return (
    <Section
      id="avatar"
      num="Component"
      title="Avatar"
      description={
        <>
          A small circular identity marker — for members, payees, support agents, and
          organisations. Falls back to initials when there&rsquo;s no photo, with a deterministic
          colour so the same person looks consistent across the product.
        </>
      }
    >
      <SubHead title="Sizes" hint="xs 20 → 2xl 112" />
      <Demo>
        <Row>
          {sizes.map(([s, label]) => (
            <Swatch key={s} label={label}>
              <Avatar size={s}>
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
            </Swatch>
          ))}
        </Row>
      </Demo>

      <SubHead title="Colourways" hint="deterministic per member" />
      <Demo>
        <Row>
          {colourways.map((c) => (
            <Swatch key={c.cw} label={c.cw}>
              <Avatar size="lg" colorway={c.cw}>
                <AvatarFallback>{c.i}</AvatarFallback>
              </Avatar>
            </Swatch>
          ))}
          <Swatch label="neutral · icon">
            <Avatar size="lg" colorway="neutral">
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </Swatch>
        </Row>
      </Demo>

      <SubHead title="Shapes" hint="circle for people · square for orgs" />
      <Demo>
        <Row>
          <Swatch label="circle · person">
            <Avatar size="lg">
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
          </Swatch>
          <Swatch label="square · organisation">
            <Avatar size="lg" shape="square" colorway="neutral">
              <AvatarFallback>
                <LandmarkIcon />
              </AvatarFallback>
            </Avatar>
          </Swatch>
          <Swatch label="square · entity">
            <Avatar size="lg" shape="square" colorway="sage">
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </Swatch>
        </Row>
      </Demo>

      <SubHead title="With photograph" hint="fills the circle" />
      <Demo>
        <Row>
          <Swatch label="photo · lg">
            <Avatar size="lg">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                alt="Member"
              />
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
          </Swatch>
          <Swatch label="photo · xl">
            <Avatar size="xl">
              <AvatarImage
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
                alt="Member"
              />
              <AvatarFallback>JT</AvatarFallback>
            </Avatar>
          </Swatch>
        </Row>
      </Demo>

      <SubHead title="Status indicator" hint="online · busy · away · offline" />
      <Demo>
        <Row>
          {statuses.map((st) => (
            <Swatch key={st.s} label={st.s}>
              <Avatar size="lg" colorway={st.cw}>
                <AvatarFallback>{st.i}</AvatarFallback>
                <AvatarStatus status={st.s} />
              </Avatar>
            </Swatch>
          ))}
        </Row>
      </Demo>

      <SubHead title="Group / stack" hint="up to four, then a +N pill" />
      <Demo>
        <Row>
          <Swatch label="group · sm">
            <AvatarGroup className="-space-x-1.5">
              <Avatar size="sm">
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
              <Avatar size="sm" colorway="sage">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar size="sm" colorway="mint">
                <AvatarFallback>DM</AvatarFallback>
              </Avatar>
              <AvatarGroupCount size="sm">+12</AvatarGroupCount>
            </AvatarGroup>
          </Swatch>
          <Swatch label="group · md">
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
              <Avatar colorway="sage">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <Avatar colorway="mint">
                <AvatarFallback>DM</AvatarFallback>
              </Avatar>
              <Avatar colorway="slate">
                <AvatarFallback>PI</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+8</AvatarGroupCount>
            </AvatarGroup>
          </Swatch>
        </Row>
      </Demo>

      <SubHead title="In context" hint="payee list · support team" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Payees</CardTitle>
              <CardDescription>Saved · 4 of 12</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {payees.map((p) => (
              <div
                key={p.n}
                className="flex items-center gap-3 border-t border-border px-[18px] py-3.5 first:border-t-0"
              >
                <Avatar size="sm" colorway={p.cw} shape={p.sq ? "square" : "circle"}>
                  <AvatarFallback>{p.icon ? <LandmarkIcon /> : p.i}</AvatarFallback>
                  {p.st ? <AvatarStatus status={p.st} /> : null}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-medium text-foreground">{p.n}</div>
                  <div className="truncate font-mono text-[11px] text-foreground-subtle">
                    {p.s}
                  </div>
                </div>
                {p.b ? (
                  <Badge variant={p.b[0]} dot>
                    {p.b[1]}
                  </Badge>
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Your support team</CardTitle>
              <CardDescription>Online now</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <AvatarGroup>
              <Avatar size="lg">
                <AvatarFallback>JT</AvatarFallback>
                <AvatarStatus status="online" />
              </Avatar>
              <Avatar size="lg" colorway="sage">
                <AvatarFallback>RS</AvatarFallback>
                <AvatarStatus status="online" />
              </Avatar>
              <Avatar size="lg" colorway="mint">
                <AvatarFallback>LV</AvatarFallback>
                <AvatarStatus status="away" />
              </Avatar>
            </AvatarGroup>
            <p className="m-0 max-w-[28ch] text-sm leading-[1.55] text-foreground-muted">
              <b className="font-medium text-foreground">Joel, Rangi and Leilani</b> are in the chat
              right now.
            </p>
            <Button>Start a chat</Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
