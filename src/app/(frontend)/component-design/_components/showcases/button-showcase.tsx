'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowRight,
  Lock,
  Trash2,
  ExternalLink,
  ChevronRight,
  Search,
  X,
  Plus,
  Loader2,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react'
import { PlaygroundShell, ControlRow, VariantPicker } from '../playground-shell'
import {
  saveComponentConfig,
  type ComponentConfigPayload,
} from '../../_actions/save-component-config'

const ALL_VARIANTS = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const

const ALL_SIZES = [
  'default',
  'xs',
  'sm',
  'lg',
  'icon',
  'icon-xs',
  'icon-sm',
  'icon-lg',
] as const

type ButtonVariant = (typeof ALL_VARIANTS)[number]
type ButtonSize = (typeof ALL_SIZES)[number]

const TEXT_SIZES: ButtonSize[] = ['xs', 'sm', 'default', 'lg']
const ICON_SIZES: ButtonSize[] = ['icon-xs', 'icon-sm', 'icon', 'icon-lg']

const VARIANT_META: Record<
  ButtonVariant,
  {
    heading: string
    purpose: string
    fcuExample: string
    icon: React.ReactNode
    label: string
  }
> = {
  default: {
    heading: 'Primary',
    purpose: 'The single most important action per view. Bold, filled, high contrast.',
    fcuExample: '"Apply Now", "Open Account", "Submit Application"',
    icon: <Lock className='size-4' />,
    label: 'Apply Now',
  },
  secondary: {
    heading: 'Secondary',
    purpose: 'Supporting actions alongside a primary. Less visual emphasis.',
    fcuExample: '"Learn More", "View Rates", "Compare Products"',
    icon: <ChevronRight className='size-4' />,
    label: 'View Rates',
  },
  outline: {
    heading: 'Outline',
    purpose: 'Medium emphasis. Works well on coloured or image backgrounds.',
    fcuExample: '"Contact Us", "Find a Branch", "Download Statement"',
    icon: <ExternalLink className='size-4' />,
    label: 'Contact Us',
  },
  ghost: {
    heading: 'Ghost',
    purpose: 'Minimal emphasis, no background. For tertiary or repeated actions.',
    fcuExample: '"Cancel", "Back", "Close", navigation items',
    icon: <X className='size-4' />,
    label: 'Cancel',
  },
  destructive: {
    heading: 'Destructive',
    purpose: 'Dangerous or irreversible actions. Red-toned to signal caution.',
    fcuExample: '"Delete Account", "Cancel Transfer", "Remove Payee"',
    icon: <Trash2 className='size-4' />,
    label: 'Delete',
  },
  link: {
    heading: 'Link',
    purpose: 'Looks like a hyperlink but behaves as a button. Lowest emphasis.',
    fcuExample: '"Forgot Password?", "Terms & Conditions"',
    icon: <ArrowRight className='size-4' />,
    label: 'Learn more',
  },
}

const RADIUS_OPTIONS = [
  'none',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  'full',
] as const

type RadiusOption = (typeof RADIUS_OPTIONS)[number]

const RADIUS_CLASS: Record<RadiusOption, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  '4xl': 'rounded-4xl',
  full: 'rounded-full',
}

const PADDING_OPTIONS = [
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '4',
  '5',
  '6',
  '8',
] as const

type PaddingOption = (typeof PADDING_OPTIONS)[number]

const PADDING_X_CLASS: Record<PaddingOption, string> = {
  '0': 'px-0',
  '0.5': 'px-0.5',
  '1': 'px-1',
  '1.5': 'px-1.5',
  '2': 'px-2',
  '2.5': 'px-2.5',
  '3': 'px-3',
  '4': 'px-4',
  '5': 'px-5',
  '6': 'px-6',
  '8': 'px-8',
}

const PADDING_Y_CLASS: Record<PaddingOption, string> = {
  '0': 'py-0',
  '0.5': 'py-0.5',
  '1': 'py-1',
  '1.5': 'py-1.5',
  '2': 'py-2',
  '2.5': 'py-2.5',
  '3': 'py-3',
  '4': 'py-4',
  '5': 'py-5',
  '6': 'py-6',
  '8': 'py-8',
}

const BORDER_WIDTH_OPTIONS = ['0', '1', '2', '4', '8'] as const
type BorderWidthOption = (typeof BORDER_WIDTH_OPTIONS)[number]

const BORDER_WIDTH_CLASS: Record<BorderWidthOption, string> = {
  '0': 'border-0',
  '1': 'border',
  '2': 'border-2',
  '4': 'border-4',
  '8': 'border-8',
}

const BORDER_STYLE_OPTIONS = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'none',
] as const
type BorderStyleOption = (typeof BORDER_STYLE_OPTIONS)[number]

const BORDER_STYLE_CLASS: Record<BorderStyleOption, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  double: 'border-double',
  none: 'border-none',
}

const BORDER_COLOR_OPTIONS = [
  'transparent',
  'border',
  'foreground',
  'muted',
  'destructive',
  'ring',
  'primary-300',
  'primary-500',
  'primary-700',
  'primary-900',
  'secondary-300',
  'secondary-500',
  'secondary-700',
] as const
type BorderColorOption = (typeof BORDER_COLOR_OPTIONS)[number]

const BORDER_COLOR_CLASS: Record<BorderColorOption, string> = {
  transparent: 'border-transparent',
  border: 'border-border',
  foreground: 'border-foreground',
  muted: 'border-muted',
  destructive: 'border-destructive',
  ring: 'border-ring',
  'primary-300': 'border-fcu-primary-300',
  'primary-500': 'border-fcu-primary-500',
  'primary-700': 'border-fcu-primary-700',
  'primary-900': 'border-fcu-primary-900',
  'secondary-300': 'border-fcu-secondary-300',
  'secondary-500': 'border-fcu-secondary-500',
  'secondary-700': 'border-fcu-secondary-700',
}

const SHADOW_OPTIONS = [
  'none',
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const
type ShadowOption = (typeof SHADOW_OPTIONS)[number]

const SHADOW_CLASS: Record<ShadowOption, string> = {
  none: 'shadow-none',
  '2xs': 'shadow-2xs',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

const SHADOW_COLOR_OPTIONS = [
  'default',
  'foreground',
  'muted',
  'destructive',
  'ring',
  'primary-300',
  'primary-500',
  'primary-700',
  'primary-900',
  'secondary-300',
  'secondary-500',
  'secondary-700',
] as const
type ShadowColorOption = (typeof SHADOW_COLOR_OPTIONS)[number]

const SHADOW_COLOR_CLASS: Record<ShadowColorOption, string> = {
  default: '',
  foreground: 'shadow-foreground/20',
  muted: 'shadow-muted',
  destructive: 'shadow-destructive/30',
  ring: 'shadow-ring/20',
  'primary-300': 'shadow-fcu-primary-300/30',
  'primary-500': 'shadow-fcu-primary-500/30',
  'primary-700': 'shadow-fcu-primary-700/30',
  'primary-900': 'shadow-fcu-primary-900/30',
  'secondary-300': 'shadow-fcu-secondary-300/30',
  'secondary-500': 'shadow-fcu-secondary-500/30',
  'secondary-700': 'shadow-fcu-secondary-700/30',
}

const INSET_SHADOW_OPTIONS = [
  'none',
  '2xs',
  'xs',
  'sm',
] as const
type InsetShadowOption = (typeof INSET_SHADOW_OPTIONS)[number]

const INSET_SHADOW_CLASS: Record<InsetShadowOption, string> = {
  none: '',
  '2xs': 'inset-shadow-2xs',
  xs: 'inset-shadow-xs',
  sm: 'inset-shadow-sm',
}

interface BgColorEntry {
  value: string
  label: string
  cssVar: string
  isPrimary?: boolean
}

interface BgColorGroup {
  groupLabel: string
  items: BgColorEntry[]
}

const BG_COLOR_GROUPS: BgColorGroup[] = [
  {
    groupLabel: 'Neutral',
    items: [
      { value: 'white', label: 'White', cssVar: '#ffffff' },
      { value: 'neutral-50', label: 'Neutral 50', cssVar: 'oklch(0.985 0 0)' },
      { value: 'neutral-100', label: 'Neutral 100', cssVar: 'oklch(0.97 0 0)' },
      { value: 'neutral-200', label: 'Neutral 200', cssVar: 'oklch(0.922 0 0)' },
      { value: 'neutral-800', label: 'Neutral 800', cssVar: 'oklch(0.269 0 0)' },
      { value: 'neutral-900', label: 'Neutral 900', cssVar: 'oklch(0.205 0 0)' },
      { value: 'black', label: 'Black', cssVar: '#000000' },
    ],
  },
  {
    groupLabel: 'FCU Primary (Blue)',
    items: [
      { value: 'fcu-primary-50', label: '50', cssVar: 'var(--color-fcu-primary-50)' },
      { value: 'fcu-primary-100', label: '100', cssVar: 'var(--color-fcu-primary-100)' },
      { value: 'fcu-primary-200', label: '200', cssVar: 'var(--color-fcu-primary-200)' },
      { value: 'fcu-primary-300', label: '300', cssVar: 'var(--color-fcu-primary-300)' },
      { value: 'fcu-primary-400', label: '400', cssVar: 'var(--color-fcu-primary-400)' },
      { value: 'fcu-primary-500', label: '500', cssVar: 'var(--color-fcu-primary-500)' },
      { value: 'fcu-primary-600', label: '600', cssVar: 'var(--color-fcu-primary-600)' },
      { value: 'fcu-primary-700', label: '700', cssVar: 'var(--color-fcu-primary-700)' },
      { value: 'fcu-primary-800', label: '800', cssVar: 'var(--color-fcu-primary-800)' },
      { value: 'fcu-primary-900', label: '900', cssVar: 'var(--color-fcu-primary-900)', isPrimary: true },
      { value: 'fcu-primary-950', label: '950', cssVar: 'var(--color-fcu-primary-950)' },
    ],
  },
  {
    groupLabel: 'FCU Secondary (Green/Yellow)',
    items: [
      { value: 'fcu-secondary-50', label: '50', cssVar: 'var(--color-fcu-secondary-50)' },
      { value: 'fcu-secondary-100', label: '100', cssVar: 'var(--color-fcu-secondary-100)' },
      { value: 'fcu-secondary-200', label: '200', cssVar: 'var(--color-fcu-secondary-200)' },
      { value: 'fcu-secondary-300', label: '300', cssVar: 'var(--color-fcu-secondary-300)' },
      { value: 'fcu-secondary-400', label: '400', cssVar: 'var(--color-fcu-secondary-400)' },
      { value: 'fcu-secondary-500', label: '500', cssVar: 'var(--color-fcu-secondary-500)', isPrimary: true },
      { value: 'fcu-secondary-600', label: '600', cssVar: 'var(--color-fcu-secondary-600)' },
      { value: 'fcu-secondary-700', label: '700', cssVar: 'var(--color-fcu-secondary-700)' },
      { value: 'fcu-secondary-800', label: '800', cssVar: 'var(--color-fcu-secondary-800)' },
      { value: 'fcu-secondary-900', label: '900', cssVar: 'var(--color-fcu-secondary-900)' },
      { value: 'fcu-secondary-950', label: '950', cssVar: 'var(--color-fcu-secondary-950)' },
    ],
  },
  {
    groupLabel: 'FCU Green Faded',
    items: [
      { value: 'fcu-green-faded-50', label: '50', cssVar: 'var(--color-fcu-green-faded-50)' },
      { value: 'fcu-green-faded-100', label: '100', cssVar: 'var(--color-fcu-green-faded-100)' },
      { value: 'fcu-green-faded-200', label: '200', cssVar: 'var(--color-fcu-green-faded-200)' },
      { value: 'fcu-green-faded-300', label: '300', cssVar: 'var(--color-fcu-green-faded-300)' },
      { value: 'fcu-green-faded-400', label: '400', cssVar: 'var(--color-fcu-green-faded-400)' },
      { value: 'fcu-green-faded-500', label: '500', cssVar: 'var(--color-fcu-green-faded-500)', isPrimary: true },
      { value: 'fcu-green-faded-600', label: '600', cssVar: 'var(--color-fcu-green-faded-600)' },
      { value: 'fcu-green-faded-700', label: '700', cssVar: 'var(--color-fcu-green-faded-700)' },
      { value: 'fcu-green-faded-800', label: '800', cssVar: 'var(--color-fcu-green-faded-800)' },
      { value: 'fcu-green-faded-900', label: '900', cssVar: 'var(--color-fcu-green-faded-900)' },
      { value: 'fcu-green-faded-950', label: '950', cssVar: 'var(--color-fcu-green-faded-950)' },
    ],
  },
  {
    groupLabel: 'FCU Mint',
    items: [
      { value: 'fcu-mint-50', label: '50', cssVar: 'var(--color-fcu-mint-50)' },
      { value: 'fcu-mint-100', label: '100', cssVar: 'var(--color-fcu-mint-100)' },
      { value: 'fcu-mint-200', label: '200', cssVar: 'var(--color-fcu-mint-200)' },
      { value: 'fcu-mint-300', label: '300', cssVar: 'var(--color-fcu-mint-300)' },
      { value: 'fcu-mint-400', label: '400', cssVar: 'var(--color-fcu-mint-400)' },
      { value: 'fcu-mint-500', label: '500', cssVar: 'var(--color-fcu-mint-500)', isPrimary: true },
      { value: 'fcu-mint-600', label: '600', cssVar: 'var(--color-fcu-mint-600)' },
      { value: 'fcu-mint-700', label: '700', cssVar: 'var(--color-fcu-mint-700)' },
      { value: 'fcu-mint-800', label: '800', cssVar: 'var(--color-fcu-mint-800)' },
      { value: 'fcu-mint-900', label: '900', cssVar: 'var(--color-fcu-mint-900)' },
      { value: 'fcu-mint-950', label: '950', cssVar: 'var(--color-fcu-mint-950)' },
    ],
  },
]

const BG_COLOR_MAP: Record<string, string> = Object.fromEntries(
  BG_COLOR_GROUPS.flatMap((g) => g.items.map((i) => [i.value, i.cssVar])),
)

const SIZE_LABELS: Record<ButtonSize, string> = {
  xs: 'XS',
  sm: 'SM',
  default: 'MD',
  lg: 'LG',
  'icon-xs': 'XS',
  'icon-sm': 'SM',
  icon: 'MD',
  'icon-lg': 'LG',
}

const APPLY_TO_OPTIONS = ['all', ...ALL_VARIANTS] as const
type ApplyToOption = (typeof APPLY_TO_OPTIONS)[number]

interface VariantStyle {
  radius: RadiusOption
  paddingX: PaddingOption
  paddingY: PaddingOption
  borderWidth: BorderWidthOption
  borderStyle: BorderStyleOption
  borderColor: BorderColorOption
  shadow: ShadowOption
  shadowColor: ShadowColorOption
  insetShadow: InsetShadowOption
}

const DEFAULT_STYLE: VariantStyle = {
  radius: 'lg',
  paddingX: '2.5',
  paddingY: '1.5',
  borderWidth: '1',
  borderStyle: 'solid',
  borderColor: 'transparent',
  shadow: 'none',
  shadowColor: 'default',
  insetShadow: 'none',
}

function buildInitialStyles(): Record<ButtonVariant, VariantStyle> {
  return Object.fromEntries(
    ALL_VARIANTS.map((v) => [v, { ...DEFAULT_STYLE }]),
  ) as Record<ButtonVariant, VariantStyle>
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

function hydrateStyles(
  initialConfig: ComponentConfigPayload | null,
): Record<ButtonVariant, VariantStyle> {
  const saved = (
    initialConfig?.componentSpecificConfig as
      | { variantStyles?: Record<string, VariantStyle> }
      | undefined
  )?.variantStyles
  if (!saved) return buildInitialStyles()
  const result = buildInitialStyles()
  for (const v of ALL_VARIANTS) {
    if (saved[v]) result[v] = { ...DEFAULT_STYLE, ...saved[v] }
  }
  return result
}

interface Props {
  initialConfig: ComponentConfigPayload | null
}

export function ButtonShowcase({ initialConfig }: Props) {
  const [config, setConfig] = React.useState<ComponentConfigPayload>(
    initialConfig ?? {
      componentName: 'button',
      displayName: 'Button',
      category: 'actions',
      approvedVariants: [...ALL_VARIANTS],
      approvedSizes: [...ALL_SIZES],
      defaultVariant: 'default',
      defaultSize: 'default',
    },
  )

  const [showDisabled, setShowDisabled] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showIcons, setShowIcons] = React.useState(true)
  const [customLabel, setCustomLabel] = React.useState('')
  const [saveStatus, setSaveStatus] = React.useState<SaveStatus>('idle')
  const [previewBg, setPreviewBg] = React.useState('white')

  const [applyTo, setApplyTo] = React.useState<ApplyToOption>('all')
  const [variantStyles, setVariantStyles] = React.useState<
    Record<ButtonVariant, VariantStyle>
  >(() => hydrateStyles(initialConfig))

  const displayStyle: VariantStyle =
    applyTo === 'all' ? variantStyles.default : variantStyles[applyTo]

  function updateStyle(field: keyof VariantStyle, value: string) {
    setVariantStyles((prev) => {
      const next = { ...prev }
      const targets: readonly ButtonVariant[] =
        applyTo === 'all' ? ALL_VARIANTS : [applyTo]
      for (const variant of targets) {
        next[variant] = { ...next[variant], [field]: value }
      }
      return next
    })
  }

  const activeVariant = (config.previewConfig?.selectedVariant ??
    config.defaultVariant ??
    'default') as ButtonVariant

  function updatePreview(
    partial: Partial<NonNullable<ComponentConfigPayload['previewConfig']>>,
  ) {
    setConfig((prev) => ({
      ...prev,
      previewConfig: { ...prev.previewConfig, ...partial },
    }))
  }

  async function handleSave() {
    setSaveStatus('saving')
    const configToSave: ComponentConfigPayload = {
      ...config,
      componentSpecificConfig: {
        ...config.componentSpecificConfig,
        variantStyles,
      },
    }
    const result = await saveComponentConfig(configToSave)
    if (result.success) {
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } else {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  function renderTextButton(
    variant: ButtonVariant,
    size: ButtonSize,
    label: string,
    icon?: React.ReactNode,
  ) {
    const s = variantStyles[variant]
    return (
      <Button
        key={`${variant}-${size}`}
        variant={variant}
        size={size}
        disabled={showDisabled}
        className={`${RADIUS_CLASS[s.radius]} h-auto ${PADDING_X_CLASS[s.paddingX]} ${PADDING_Y_CLASS[s.paddingY]} ${BORDER_WIDTH_CLASS[s.borderWidth]} ${BORDER_STYLE_CLASS[s.borderStyle]} ${BORDER_COLOR_CLASS[s.borderColor]} ${SHADOW_CLASS[s.shadow]} ${SHADOW_COLOR_CLASS[s.shadowColor]} ${INSET_SHADOW_CLASS[s.insetShadow]}`}
      >
        {showLoading ? (
          <Loader2 className='animate-spin' />
        ) : (
          showIcons && icon
        )}
        {label}
        {showIcons && variant === 'link' && <ArrowRight />}
      </Button>
    )
  }

  function renderIconButton(variant: ButtonVariant, size: ButtonSize) {
    const s = variantStyles[variant]
    const iconMap: Record<ButtonVariant, React.ReactNode> = {
      default: <Plus />,
      secondary: <Search />,
      outline: <ExternalLink />,
      ghost: <X />,
      destructive: <Trash2 />,
      link: <ArrowRight />,
    }
    return (
      <Button
        key={`${variant}-${size}`}
        variant={variant}
        size={size}
        disabled={showDisabled}
        aria-label={VARIANT_META[variant].heading}
        className={`${RADIUS_CLASS[s.radius]} ${BORDER_WIDTH_CLASS[s.borderWidth]} ${BORDER_STYLE_CLASS[s.borderStyle]} ${BORDER_COLOR_CLASS[s.borderColor]} ${SHADOW_CLASS[s.shadow]} ${SHADOW_COLOR_CLASS[s.shadowColor]} ${INSET_SHADOW_CLASS[s.insetShadow]}`}
      >
        {showLoading ? (
          <Loader2 className='animate-spin' />
        ) : (
          iconMap[variant]
        )}
      </Button>
    )
  }

  return (
    <PlaygroundShell
      id='ui-button'
      title='Button'
      description='Primary action trigger with 6 visual hierarchy variants and 8 sizes. Supports icons, loading, disabled state, and asChild composition.'
      category='Actions'
      config={config}
      onConfigChange={setConfig}
      guidelines={config.variantGuidelines?.map((g) => ({
        variant: g.variant,
        usageNote: g.usageNote,
      }))}
      preview={
        <div
          className='w-full space-y-10 rounded-lg p-6 transition-colors'
          style={{ backgroundColor: BG_COLOR_MAP[previewBg] }}
        >
          {ALL_VARIANTS.map((variant) => {
            const meta = VARIANT_META[variant]
            const isActive = variant === activeVariant
            const label = customLabel || meta.label

            return (
              <div
                key={variant}
                className={`rounded-lg transition-all ${
                  isActive
                    ? 'bg-muted/50 ring-2 ring-ring/20 p-5 -mx-2'
                    : 'p-3 -mx-2'
                }`}
              >
                <div className='mb-1 flex items-center gap-2'>
                  <h3 className='text-sm font-semibold text-foreground'>
                    {meta.heading}
                  </h3>
                  <span className='rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground'>
                    variant=&quot;{variant}&quot;
                  </span>
                </div>
                <p className='mb-1 text-xs text-muted-foreground'>
                  {meta.purpose}
                </p>
                <p className='mb-4 text-[11px] italic text-muted-foreground/70'>
                  FCU: {meta.fcuExample}
                </p>

                <div className='space-y-3'>
                  {/* Text buttons in all sizes */}
                  <div>
                    <p className='mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60'>
                      Text Buttons
                    </p>
                    <div className='flex flex-wrap items-end gap-3'>
                      {TEXT_SIZES.map((size) => (
                        <div
                          key={size}
                          className='flex flex-col items-center gap-1.5'
                        >
                          {renderTextButton(
                            variant,
                            size,
                            label,
                            meta.icon,
                          )}
                          <span className='text-[9px] font-medium text-muted-foreground/50'>
                            {SIZE_LABELS[size]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Icon-only buttons in all sizes */}
                  <div>
                    <p className='mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60'>
                      Icon Only
                    </p>
                    <div className='flex flex-wrap items-end gap-3'>
                      {ICON_SIZES.map((size) => (
                        <div
                          key={size}
                          className='flex flex-col items-center gap-1.5'
                        >
                          {renderIconButton(variant, size)}
                          <span className='text-[9px] font-medium text-muted-foreground/50'>
                            {SIZE_LABELS[size]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      }
      controls={
        <>
          <ControlRow label='Background'>
            <Select
              value={previewBg}
              onValueChange={(v) => v !== null && setPreviewBg(v)}
            >
              <SelectTrigger size='sm' className='w-full'>
                <SelectValue>
                  {(() => {
                    const entry = BG_COLOR_GROUPS.flatMap((g) => g.items).find(
                      (i) => i.value === previewBg,
                    )
                    if (!entry) return previewBg
                    return (
                      <span className='flex items-center gap-2'>
                        <span
                          className='inline-block size-3 shrink-0 rounded-sm border border-foreground/15'
                          style={{ backgroundColor: entry.cssVar }}
                        />
                        <span className='truncate'>{entry.label}</span>
                      </span>
                    )
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className='max-h-72'>
                {BG_COLOR_GROUPS.map((group) => (
                  <SelectGroup key={group.groupLabel}>
                    <SelectLabel>{group.groupLabel}</SelectLabel>
                    {group.items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <span className='flex items-center gap-2'>
                          <span
                            className='inline-block size-3.5 shrink-0 rounded-sm border border-foreground/15'
                            style={{ backgroundColor: item.cssVar }}
                          />
                          <span className={item.isPrimary ? 'font-semibold' : ''}>
                            {item.label}
                          </span>
                          {item.isPrimary && (
                            <span className='rounded bg-fcu-primary-900/10 px-1 py-0.5 text-[9px] font-medium text-fcu-primary-900'>
                              Primary
                            </span>
                          )}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </ControlRow>

          <ControlRow label='Highlight Variant'>
            <VariantPicker
              options={[...ALL_VARIANTS]}
              value={activeVariant}
              onChange={(v) => updatePreview({ selectedVariant: v })}
              approved={config.approvedVariants}
              disabled={config.disabledVariants}
            />
          </ControlRow>

          <ControlRow label='Radius'>
            <VariantPicker
              options={[...RADIUS_OPTIONS]}
              value={displayStyle.radius}
              onChange={(v) => updateStyle('radius', v)}
            />
          </ControlRow>

          <ControlRow label='Padding X'>
            <VariantPicker
              options={[...PADDING_OPTIONS]}
              value={displayStyle.paddingX}
              onChange={(v) => updateStyle('paddingX', v)}
            />
          </ControlRow>

          <ControlRow label='Padding Y'>
            <VariantPicker
              options={[...PADDING_OPTIONS]}
              value={displayStyle.paddingY}
              onChange={(v) => updateStyle('paddingY', v)}
            />
          </ControlRow>

          <ControlRow label='Border Width'>
            <VariantPicker
              options={[...BORDER_WIDTH_OPTIONS]}
              value={displayStyle.borderWidth}
              onChange={(v) => updateStyle('borderWidth', v)}
            />
          </ControlRow>

          <ControlRow label='Border Style'>
            <VariantPicker
              options={[...BORDER_STYLE_OPTIONS]}
              value={displayStyle.borderStyle}
              onChange={(v) => updateStyle('borderStyle', v)}
            />
          </ControlRow>

          <ControlRow label='Border Colour'>
            <VariantPicker
              options={[...BORDER_COLOR_OPTIONS]}
              value={displayStyle.borderColor}
              onChange={(v) => updateStyle('borderColor', v)}
            />
          </ControlRow>

          <ControlRow label='Shadow'>
            <VariantPicker
              options={[...SHADOW_OPTIONS]}
              value={displayStyle.shadow}
              onChange={(v) => updateStyle('shadow', v)}
            />
          </ControlRow>

          <ControlRow label='Shadow Colour'>
            <VariantPicker
              options={[...SHADOW_COLOR_OPTIONS]}
              value={displayStyle.shadowColor}
              onChange={(v) => updateStyle('shadowColor', v)}
            />
          </ControlRow>

          <ControlRow label='Inset Shadow'>
            <VariantPicker
              options={[...INSET_SHADOW_OPTIONS]}
              value={displayStyle.insetShadow}
              onChange={(v) => updateStyle('insetShadow', v)}
            />
          </ControlRow>

          <ControlRow label='Custom Label'>
            <Input
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder='Use default per variant'
              className='h-8 text-xs'
            />
          </ControlRow>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>
              Show Icons
            </span>
            <Switch
              checked={showIcons}
              onCheckedChange={setShowIcons}
              size='sm'
            />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>
              Disabled State
            </span>
            <Switch
              checked={showDisabled}
              onCheckedChange={setShowDisabled}
              size='sm'
            />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium text-foreground'>
              Loading State
            </span>
            <Switch
              checked={showLoading}
              onCheckedChange={setShowLoading}
              size='sm'
            />
          </div>

          <Separator className='my-2' />

          <ControlRow label='Apply To'>
            <Select
              value={applyTo}
              onValueChange={(v) => setApplyTo(v as ApplyToOption)}
            >
              <SelectTrigger size='sm' className='w-full'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Variants</SelectItem>
                {ALL_VARIANTS.map((v) => (
                  <SelectItem key={v} value={v}>
                    {VARIANT_META[v].heading} ({v})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ControlRow>

          <Button
            size='sm'
            className='w-full'
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            variant={saveStatus === 'saved' ? 'secondary' : 'default'}
          >
            {saveStatus === 'saving' && (
              <Loader2 className='size-3.5 animate-spin' />
            )}
            {saveStatus === 'saved' && <Check className='size-3.5' />}
            {saveStatus === 'error' && <AlertCircle className='size-3.5' />}
            {saveStatus === 'idle' && <Save className='size-3.5' />}
            {saveStatus === 'saving'
              ? 'Saving...'
              : saveStatus === 'saved'
                ? 'Saved'
                : saveStatus === 'error'
                  ? 'Error'
                  : 'Save to Sanity'}
          </Button>
        </>
      }
    />
  )
}
