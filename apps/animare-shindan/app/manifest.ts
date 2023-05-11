import { type MetadataRoute } from 'next'

import favicon512x512 from './icon1.png'
import favicon192x192 from './icon2.png'

export const runtime = 'edge'
export const revalidate = 120

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#fff',
    display: 'standalone',
    icons: [
      {
        sizes: `${favicon192x192.width}x${favicon192x192.height}`,
        src: favicon192x192.src,
        type: 'image/png'
      },
      {
        sizes: `${favicon512x512.width}x${favicon512x512.height}`,
        src: favicon512x512.src,
        type: 'image/png'
      }
    ],
    name: 'あなたのオタクタイプ診断 by あにまーれ',
    scope: '/',
    short_name: 'あにまーれ診断',
    start_url: '/',
    theme_color: '#0588f7'
  }
}
