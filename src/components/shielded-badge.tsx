'use client'

import Image from 'next/image'
import Script from 'next/script'

declare global {
  interface Window {
    ds07o6pcmkorn?: new (config: {
      openElementId: string
      modalID: string
    }) => { init: () => void }
  }
}

export function ShieldedBadge() {
  return (
    <>
      <button
        type='button'
        id='shielded-logo'
        aria-label="Women's Refuge Shielded Site"
        className='cursor-pointer bg-transparent p-0'
      >
        <Image
          src='https://shielded.co.nz/img/custom-logo.png'
          alt="Shielded - Women's Refuge"
          width={36}
          height={36}
        />
      </button>
      <Script
        src='https://staticcdn.co.nz/embed/embed.js'
        strategy='afterInteractive'
        onLoad={() => {
          const ShieldedWidget = window.ds07o6pcmkorn
          if (ShieldedWidget) {
            const widget = new ShieldedWidget({
              openElementId: '#shielded-logo',
              modalID: 'modal',
            })
            widget.init()
          }
        }}
      />
    </>
  )
}
