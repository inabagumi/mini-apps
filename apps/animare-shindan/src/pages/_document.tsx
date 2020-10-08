import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    let initialProps: DocumentInitialProps

    try {
      initialProps = await super.getInitialProps({
        ...ctx,
        renderPage: () =>
          ctx.renderPage({
            enhanceApp: (App) => (props) =>
              sheet.collectStyles(<App {...props} />)
          })
      })
      initialProps.styles = (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      )
    } catch {
      initialProps = await super.getInitialProps(ctx)
    } finally {
      sheet.seal()
    }

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="ja" prefix="og: https://ogp.me/ns#">
        <Head>
          <link
            as="style"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:700,900&amp;display=swap"
            rel="preload"
          />
          <link
            as="style"
            href="https://fonts.googleapis.com/css?family=Material+Icons"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:700,900&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Material+Icons"
            rel="stylesheet"
          />
          <link
            href="/images/favicon-192x192.png"
            rel="icon"
            sizes="192x192"
            type="image/png"
          />
          <link
            href="/images/favicon-512x512.png"
            rel="icon"
            sizes="512x512"
            type="image/png"
          />
          <link
            href="/images/favicon-192x192.png"
            rel="apple-touch-icon"
            sizes="192x192"
            type="image/png"
          />
          <link href="/manifest.webmanifest" rel="manifest" />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
