// src/components/header/nav-icons.ts
// Icon registry + link helpers for the rebuilt marketing header.
// The registry keys mirror the `link.icon` options list in
// src/sanity/schemaTypes/objects/link.ts — keep the two in sync.
import {
  Calculator,
  Circle,
  CircleQuestionMark,
  CreditCard,
  FileText,
  Globe,
  House,
  MapPin,
  Percent,
  Phone,
  Send,
  Shield,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export const NAV_ICONS: Record<string, LucideIcon> = {
  'credit-card': CreditCard,
  globe: Globe,
  send: Send,
  wallet: Wallet,
  'file-text': FileText,
  home: House,
  calculator: Calculator,
  percent: Percent,
  shield: Shield,
  'help-circle': CircleQuestionMark,
  phone: Phone,
  'map-pin': MapPin,
  'trending-up': TrendingUp,
}

/** Resolve a schema icon name to a lucide component; unknown/missing → Circle. */
export function resolveNavIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Circle
  return NAV_ICONS[name] ?? Circle
}

/** Minimal structural shape of a Sanity `link` object as projected by HEADER_NAVIGATION_QUERY. */
type LinkTarget = {
  linkType?: string | null
  url?: string | null
  externalUrl?: string | null
}

type LinkBehaviour = {
  linkType?: string | null
  openInNewTab?: boolean | null
}

/** Href for a Sanity link object (internal path or external URL; '#' when unset). */
export function getHref(link: LinkTarget): string {
  return link.linkType === 'external'
    ? (link.externalUrl ?? '#')
    : (link.url ?? '#')
}

/** Whether the link should render as an external/new-tab anchor. */
export function isExternalLink(link: LinkBehaviour): boolean {
  return link.linkType === 'external' || !!link.openInNewTab
}
