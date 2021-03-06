import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useCallback, useEffect } from 'react'

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
      <Component {...pageProps} />
    </>
  )
}

export default App
