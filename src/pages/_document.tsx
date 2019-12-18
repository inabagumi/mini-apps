import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="https://www.google-analytics.com" rel="preconnect" />
          <link href="https://www.googletagmanager.com" rel="preconnect" />
          <link
            as="style"
            href="https://fonts.googleapis.com/css?display=swap&amp;family=Roboto:300,400,500,700|Roboto+Slab:300,400,500,700|Noto+Sans+JP:300,400,500,700|Noto+Serif+JP:300,400,500,700"
            rel="preload"
          />
        </Head>
        <body>
          <Main />

          <NextScript />

          <link
            href="https://fonts.googleapis.com/css?display=swap&amp;family=Roboto:300,400,500,700|Roboto+Slab:300,400,500,700|Noto+Sans+JP:300,400,500,700|Noto+Serif+JP:300,400,500,700"
            rel="stylesheet"
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
