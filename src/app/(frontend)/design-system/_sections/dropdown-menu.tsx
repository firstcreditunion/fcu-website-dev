"use client"

import { useState, type ReactNode } from "react"
import {
  PencilIcon,
  CopyIcon,
  Share2Icon,
  Trash2Icon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuHeader,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "../_components/section"
import { Demo, Note, SubHead } from "../_components/showcase"

function DemoCol({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <span className="font-mono text-[10.5px] tracking-[0.04em] text-foreground-subtle uppercase">
        {tag}
      </span>
      {children}
    </div>
  )
}

function Avatar({ size = 20, children }: { size?: number; children: ReactNode }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fcu-primary-300 to-fcu-primary-600 font-semibold text-white"
      style={{ width: size, height: size, fontSize: size > 28 ? 13 : 10 }}
    >
      {children}
    </span>
  )
}

export function DropdownMenuSection() {
  const [cols, setCols] = useState({ date: true, amount: true, reference: false })

  return (
    <Section
      id="dropdown-menu"
      num="Component"
      title="Dropdown menu"
      description={
        <>
          An action menu that opens from a trigger — the &ldquo;⋯ more&rdquo; button on a row, an
          account switcher, a profile menu. Distinct from a Select (which picks a{" "}
          <i>value</i>): a dropdown menu fires <b className="font-medium text-foreground">actions</b>.
          Items carry icons, shortcuts, checkmarks, submenus, and a danger treatment.
        </>
      }
    >
      <SubHead title="Variants" hint="actions · checkable + submenu · account" />
      <Demo>
        <div className="flex flex-wrap items-start gap-6">
          <DemoCol tag="Row actions">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                Row actions
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <PencilIcon />
                  Edit payee
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyIcon />
                  Copy account number
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2Icon />
                  Share details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete payee
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DemoCol>

          <DemoCol tag="Checkable + submenu">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                Columns
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={cols.date}
                  onCheckedChange={(v) => setCols((c) => ({ ...c, date: v }))}
                >
                  Date
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={cols.amount}
                  onCheckedChange={(v) => setCols((c) => ({ ...c, amount: v }))}
                >
                  Amount
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={cols.reference}
                  onCheckedChange={(v) => setCols((c) => ({ ...c, reference: v }))}
                >
                  Reference
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Sort by</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup defaultValue="date">
                      <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem disabled>Export (Pro)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DemoCol>

          <DemoCol tag="Account / profile menu">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="gap-2" />}>
                <Avatar>MT</Avatar>
                Mereana Te Awa
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[240px]">
                <DropdownMenuHeader>
                  <Avatar size={36}>MT</Avatar>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[13.5px] font-semibold text-foreground">
                      Mereana Te Awa
                    </span>
                    <span className="truncate font-mono text-[11.5px] text-foreground-subtle">
                      m.te.awa@gmail.com
                    </span>
                  </div>
                </DropdownMenuHeader>
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Settings
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DemoCol>
        </div>
      </Demo>

      <SubHead title="In context" hint="the canonical ⋯ row action" />
      <Card className="max-w-[560px]">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 px-5 py-4">
            <Avatar size={32}>SC</Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-foreground">Sarah Chen</div>
              <div className="font-mono text-[11.5px] text-foreground-subtle">
                06-0145-0987654-00 · ANZ
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon-sm" aria-label="More" />}
              >
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <PencilIcon />
                  Edit payee
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyIcon />
                  Copy account number
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete payee
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <Note>
        <b>Menu vs Select vs Combobox.</b> Menu fires actions; Select picks one value from a short
        list; Combobox picks value(s) from a long searchable list. If the items are nouns, you want
        Select / Combobox — if they&rsquo;re verbs, you want a menu.
      </Note>
    </Section>
  )
}
