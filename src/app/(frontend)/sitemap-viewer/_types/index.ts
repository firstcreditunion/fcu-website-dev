export interface NavLink {
  _key: string
  label: string
  linkType: string
  url?: string
  externalUrl?: string
  openInNewTab?: boolean
}

export interface NavGroup {
  _key: string
  title: string
  items?: NavLink[]
}

export interface MainNavItem {
  _key: string
  label: string
  url: string
  megaMenu?: NavGroup[]
}

export interface HeaderNavigation {
  mainNav: MainNavItem[]
  utilityNav?: {
    primaryAction?: { label: string; url: string }
    secondaryAction?: { label: string; url: string }
    showSearch?: boolean
  }
}

export type NodeLevel = 'root' | 'section' | 'group' | 'page'

export const LEVEL_COLORS: Record<NodeLevel, string> = {
  root: '#8b5cf6',
  section: '#3b82f6',
  group: '#f59e0b',
  page: '#10b981',
}

export const LEVEL_LABELS: Record<NodeLevel, string> = {
  root: 'Site Root',
  section: 'Section',
  group: 'Group',
  page: 'Page',
}
