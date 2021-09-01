import type { NextApiHandler } from 'next'
import type { WebAppManifest } from 'web-app-manifest'

import favicon192x192 from '../../assets/favicon-192x192.png'
import favicon512x512 from '../../assets/favicon-512x512.png'

const handler: NextApiHandler<WebAppManifest> = (_req, res) => {
  res.setHeader('Cache-Control', 'max-age=60, s-maxage=120')
  res.setHeader('Content-Type', 'application/manifest+json')
  res.status(200).json({
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
  })
}

export default handler
