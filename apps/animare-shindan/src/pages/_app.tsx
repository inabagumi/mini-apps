import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useCallback, useEffect } from 'react'

import favicon192x192 from '../assets/favicon-192x192.png'
import favicon512x512 from '../assets/favicon-512x512.png'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  const handleRouterChangeComplete = useCallback((url: string) => {
    const trackingID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

    if (!trackingID) return

    setTimeout(() => {
      gtag('config', trackingID, {
        page_location: url,
        page_title: document.title
      })
    }, 0)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouterChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouterChangeComplete)
    }
  }, [router.events, handleRouterChangeComplete])

  return (
    <>
      <Head>
        <link
          href={favicon192x192}
          rel="icon"
          sizes="192x192"
          type="image/png"
        />
        <link
          href={favicon512x512}
          rel="icon"
          sizes="512x512"
          type="image/png"
        />
        <link
          href={favicon192x192}
          rel="apple-touch-icon"
          sizes="192x192"
          type="image/png"
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default App
