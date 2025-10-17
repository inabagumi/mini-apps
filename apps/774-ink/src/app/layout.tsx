import type { Metadata } from 'next'
import { appleTouchIcon, card, favicon256x256 } from '@/assets'
import './globals.css'

const canonical = 'https://774.ink/'

export const metadata: Metadata = {
  title: '774 ink.',
  description: 'もしかして: 774 inc.',
  icons: {
    icon: favicon256x256.src,
    apple: appleTouchIcon.src,
  },
  other: {
    theme_color: '#544643',
  },
  alternates: {
    canonical,
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: new URL(card.src, canonical).toString(),
        width: card.width,
        height: card.height,
        alt: 'Did you mean: 774 inc.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
