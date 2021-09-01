import Head from 'next/head'
import type { FC } from 'react'
import pkg from '../package.json'
import mainVisual from '../assets/main-visual.jpg'

const defaultTitle = 'あなたのオタクタイプ診断 by あにまーれ'

interface Props {
  description?: string
  image?: string
  pathname?: string
  title?: string
}

const SEO: FC<Props> = ({
  description = '好みと推しVTuberを無意識から探る！',
  image,
  pathname,
  title
}) => {
  return (
    <Head>
      <title>
        {title ? `${title} | #あにまーれオタクタイプ診断` : defaultTitle}
      </title>
      <meta content={description} name="description" />

      {pathname && (
        <>
          <meta content="website" property="og:type" />
          <meta
            content={new URL(pathname, pkg.homepage).toString()}
            property="og:url"
          />
          <meta
            content={new URL(image ?? mainVisual.src, pkg.homepage).toString()}
            property="og:image"
          />
          <meta content={title ?? defaultTitle} property="og:title" />
          <meta content={description} property="og:description" />
          <meta content="summary_large_image" name="twitter:card" />

          <link
            href={new URL(pathname, pkg.homepage).toString()}
            rel="canonical"
          />
        </>
      )}
    </Head>
  )
}

export default SEO
