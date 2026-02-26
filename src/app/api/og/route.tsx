import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'First Credit Union'

  return new ImageResponse(
    (
      <div
        tw='flex h-full w-full flex-col items-center justify-center'
        style={{
          background: 'linear-gradient(135deg, #1a4d6e 0%, #2a6d8e 50%, #1a4d6e 100%)',
        }}
      >
        <div tw='flex flex-col items-center px-20 text-center'>
          <div
            tw='mb-8 text-2xl font-semibold tracking-wide'
            style={{ color: '#c4d54a' }}
          >
            FIRST CREDIT UNION
          </div>
          <div
            tw='text-6xl font-bold leading-tight'
            style={{ color: '#ffffff', maxWidth: '900px' }}
          >
            {title}
          </div>
          <div tw='mt-8 text-xl' style={{ color: 'rgba(255,255,255,0.7)' }}>
            www.firstcreditunion.co.nz
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
