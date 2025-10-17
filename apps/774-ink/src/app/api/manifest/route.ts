import { NextResponse } from 'next/server'
import type { WebAppManifest } from 'web-app-manifest'
import { favicon192x192, favicon512x512 } from '@/assets'

export async function GET() {
  const name = '774 ink.'
  const manifest: WebAppManifest = {
    background_color: '#fff',
    display: 'standalone',
    icons: [
      {
        sizes: [favicon192x192.width, favicon192x192.height].join('x'),
        src: favicon192x192.src,
        type: 'image/png',
      },
      {
        sizes: [favicon512x512.width, favicon512x512.height].join('x'),
        src: favicon512x512.src,
        type: 'image/png',
      },
    ],
    name,
    scope: '/',
    short_name: name,
    start_url: '/',
    theme_color: '#544643',
  }

  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'max-age=60,s-maxage=120',
      'Content-Type': 'application/manifest+json',
    },
  })
}
