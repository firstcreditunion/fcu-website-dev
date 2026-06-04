const SECTIONS = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'buttons', label: 'Button' },
  { id: 'inputs', label: 'Input' },
  { id: 'textarea-select', label: 'Textarea & Select' },
  { id: 'selection', label: 'Checkbox · Radio · Switch' },
  { id: 'card-dialog', label: 'Card & Dialog' },
  { id: 'table', label: 'Table' },
  { id: 'alert-badge', label: 'Alert & Badge' },
  { id: 'navigation', label: 'Breadcrumb & Tabs' },
  { id: 'disclosure', label: 'Accordion · Tooltip · Popover' },
  { id: 'dropdown-menu', label: 'Dropdown menu' },
  { id: 'hover-card', label: 'Hover card' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'progress-spinner', label: 'Progress · Spinner' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'toast', label: 'Toast' },
  { id: 'empty-state', label: 'Empty state' },
  { id: 'toggle-group', label: 'Toggle group' },
  { id: 'rating', label: 'Rating' },
  { id: 'slider', label: 'Slider' },
  { id: 'otp', label: 'OTP / PIN' },
  { id: 'stepper', label: 'Stepper' },
  { id: 'file-upload', label: 'File upload' },
  { id: 'tag-input', label: 'Tag input' },
  { id: 'combobox', label: 'Combobox' },
  { id: 'command', label: 'Command (⌘K)' },
  { id: 'date-picker', label: 'Date picker' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'stat-block', label: 'Stat block' },
  { id: 'testimonial', label: 'Testimonial' },
  { id: 'cta-banner', label: 'CTA banner' },
] as const

export function ShowcaseNav() {
  return (
    <nav
      aria-label='Design system sections'
      className='sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-1'
    >
      <p className='mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-foreground-subtle'>
        FCU Design System
      </p>
      <ul className='space-y-0.5'>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className='block rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-sunken'
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
