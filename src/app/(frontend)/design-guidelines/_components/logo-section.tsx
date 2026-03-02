'use client'

import Image from 'next/image'
import { SectionWrapper, Subsection } from './section-wrapper'
import { CodeBlock } from './code-block'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'

const LOGO_DONTS = [
  'Stretch or distort the proportions',
  'Rotate or skew the logo',
  'Change the brand colours',
  'Add drop shadows, outlines, or effects',
  'Place on busy backgrounds without contrast',
  'Crop or rearrange logo elements',
]

const LOGO_DOS = [
  'Use the original, unmodified logo file',
  'Maintain the minimum clear space',
  'Place on clean, uncluttered backgrounds',
  'Ensure the logo is legible at the displayed size',
]

export function LogoSection() {
  return (
    <SectionWrapper
      id='logo'
      title='Logo'
      description='The First Credit Union logo is the cornerstone of our brand identity. Consistent and correct usage builds recognition and trust.'
    >
      <Subsection title='Primary Logo'>
        <div className='grid gap-6'>
          <div className='group relative flex items-center justify-center rounded-2xl border border-border bg-card p-12 transition-shadow hover:shadow-lg'>
            <Image
              src='/fcu-logo.png'
              alt='First Credit Union logo'
              width={240}
              height={80}
              className='h-auto w-60'
              priority
            />
            <Badge
              variant='outline'
              className='absolute top-3 left-3 border-fcu-primary-900/20 text-[10px] text-fcu-primary-900'
            >
              Primary Usage
            </Badge>
          </div>
        </div>
      </Subsection>

      <Subsection
        title='Clear Space'
        description="Always maintain a minimum exclusion zone around the logo equal to the height of the 'F' in 'First'. This ensures the logo breathes and isn't visually crowded."
      >
        <div className='flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-16'>
          <div className='relative'>
            {/* Clear space indicators */}
            <div className='absolute -inset-8 rounded-xl border-2 border-dashed border-fcu-secondary-500/40' />
            <div className='absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-3'>
              <span className='rounded-full bg-fcu-secondary-500/10 px-2 py-0.5 text-[9px] font-bold text-fcu-secondary-500'>
                1x
              </span>
            </div>
            <div className='absolute -right-8 top-1/2 -translate-y-1/2 translate-x-3'>
              <span className='rounded-full bg-fcu-secondary-500/10 px-2 py-0.5 text-[9px] font-bold text-fcu-secondary-500'>
                1x
              </span>
            </div>
            <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-3'>
              <span className='rounded-full bg-fcu-secondary-500/10 px-2 py-0.5 text-[9px] font-bold text-fcu-secondary-500'>
                1x
              </span>
            </div>
            <div className='absolute -left-8 top-1/2 -translate-x-3 -translate-y-1/2'>
              <span className='rounded-full bg-fcu-secondary-500/10 px-2 py-0.5 text-[9px] font-bold text-fcu-secondary-500'>
                1x
              </span>
            </div>
            <Image
              src='/fcu-logo.png'
              alt='Logo with clear space'
              width={200}
              height={66}
              className='relative h-auto w-48'
            />
          </div>
        </div>
      </Subsection>

      <Subsection
        title='Minimum Size'
        description='Never display the logo smaller than the minimum dimensions to ensure legibility.'
      >
        <div className='flex flex-wrap items-end gap-8 rounded-2xl border border-border bg-card p-8'>
          <div className='text-center'>
            <Image
              src='/fcu-logo.png'
              alt='Logo at minimum digital size'
              width={120}
              height={40}
              className='h-auto w-30'
            />
            <p className='mt-3 text-xs font-medium text-foreground'>
              Digital minimum
            </p>
            <p className='text-[10px] text-muted-foreground'>120px wide</p>
          </div>
          <div className='text-center'>
            <Image
              src='/fcu-logo.png'
              alt='Logo at recommended size'
              width={200}
              height={66}
              className='h-auto w-50'
            />
            <p className='mt-3 text-xs font-medium text-foreground'>
              Recommended
            </p>
            <p className='text-[10px] text-muted-foreground'>200px+ wide</p>
          </div>
        </div>
      </Subsection>

      <Subsection title="Usage Do's and Don'ts">
        <div className='grid gap-4 sm:grid-cols-2'>
          {/* Do's */}
          <div className='rounded-2xl border border-fcu-secondary-500 p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <span className='flex size-6 items-center justify-center rounded-full bg-fcu-secondary-500 text-white'>
                <Check className='size-3.5' />
              </span>
              <h4 className='text-sm font-bold text-fcu-secondary-500'>Do</h4>
            </div>
            <ul className='space-y-2.5'>
              {LOGO_DOS.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-2 text-xs leading-relaxed text-foreground/80'
                >
                  <Check className='mt-0.5 size-3 shrink-0 text-fcu-secondary-500' />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className='rounded-2xl border border-red-200 bg-red-50/30 p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <span className='flex size-6 items-center justify-center rounded-full bg-red-500 text-white'>
                <X className='size-3.5' />
              </span>
              <h4 className='text-sm font-bold text-red-800'>Don&apos;t</h4>
            </div>
            <ul className='space-y-2.5'>
              {LOGO_DONTS.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-2 text-xs leading-relaxed text-red-700'
                >
                  <X className='mt-0.5 size-3 shrink-0 text-red-400' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Subsection>

      <Subsection title='Favicon & App Icons'>
        <div className='flex flex-wrap gap-6 rounded-2xl border border-border bg-card p-8'>
          {[
            {
              size: '16×16',
              file: 'favicon-16x16.png',
              src: '/favicon-16x16.png',
            },
            {
              size: '32×32',
              file: 'favicon-32x32.png',
              src: '/favicon-32x32.png',
            },
            {
              size: '180×180',
              file: 'apple-touch-icon.png',
              src: '/apple-touch-icon.png',
            },
            {
              size: '192×192',
              file: 'android-chrome-192x192.png',
              src: '/android-chrome-192x192.png',
            },
            {
              size: '512×512',
              file: 'android-chrome-512x512.png',
              src: '/android-chrome-512x512.png',
            },
          ].map((icon) => (
            <div key={icon.file} className='text-center'>
              <div className='mb-2 inline-flex items-center justify-center rounded-xl border border-border bg-muted/50 p-3'>
                <Image
                  src={icon.src}
                  alt={`${icon.size} favicon`}
                  width={32}
                  height={32}
                  className='size-8'
                />
              </div>
              <p className='text-[10px] font-bold text-foreground'>
                {icon.size}
              </p>
              <p className='text-[9px] text-muted-foreground'>{icon.file}</p>
            </div>
          ))}
        </div>

        <CodeBlock
          label='HTML usage'
          className='mt-4'
          code={`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`}
        />
      </Subsection>
    </SectionWrapper>
  )
}
