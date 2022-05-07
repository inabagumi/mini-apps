import Document, {
  type DocumentContext,
  type DocumentInitialProps,
  type DocumentProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const MyDocument = (props: DocumentProps): JSX.Element => {
  return (
    <Html>
      <Head prefix="og: https://ogp.me/ns#">
        {props.locale === 'ja' && (
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:700,900&amp;display=optional"
            rel="stylesheet"
          />
        )}
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons&amp;display=swap"
          rel="stylesheet"
        />
        <link href="/manifest.webmanifest" rel="manifest" />
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');`
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const sheet = new ServerStyleSheet()
  let initialProps: DocumentInitialProps

  try {
    initialProps = await Document.getInitialProps({
      ...ctx,
      renderPage: () =>
        ctx.renderPage({
          enhanceApp: (App) =>
            function EnhancedApp(props) {
              return sheet.collectStyles(<App {...props} />)
            }
        })
    })
    initialProps.styles = [initialProps.styles, sheet.getStyleElement()]
  } catch {
    initialProps = await Document.getInitialProps(ctx)
  } finally {
    sheet.seal()
  }

  return initialProps
}

export default MyDocument
