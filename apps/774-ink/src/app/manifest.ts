import type { MetadataRoute } from 'next'
import { favicon192x192, favicon512x512 } from '@/assets'

export default function manifest(): MetadataRoute.Manifest {
  const name = '774 ink.'

  return {
    background_color: '#fff',
    display: 'standalone',
    icons: [
      {
        sizes: `${favicon192x192.width}x${favicon192x192.height}`,
        src: favicon192x192.src,
        type: 'image/png',
      },
      {
        sizes: `${favicon512x512.width}x${favicon512x512.height}`,
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
}
