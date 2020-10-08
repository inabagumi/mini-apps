import { NextApiHandler } from 'next'

const handler: NextApiHandler<WebAppManifest> = (_req, res) => {
  res.setHeader('Cache-Control', 'max-age=60, s-maxage=120')
  res.setHeader('Content-Type', 'application/manifest+json')
  res.status(200).json({
    background_color: '#fff',
    display: 'standalone',
    icons: [
      {
        sizes: '192x192',
        src: '/images/favicon-192x192.png',
        type: 'image/png'
      },
      {
        sizes: '512x512',
        src: '/images/favicon-512x512.png',
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
