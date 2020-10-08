import Head from 'next/head'
import React from 'react'
import type { FC } from 'react'
import { homepage as siteUrl } from '../../package.json'
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
            content={new URL(pathname, siteUrl).toString()}
            property="og:url"
          />
          <meta
            content={new URL(image ?? mainVisual, siteUrl).toString()}
            property="og:image"
          />
          <meta content={title} property="og:title" />
          <meta content={description} property="og:description" />
          <meta content="summary_large_image" name="twitter:card" />

          <link href={new URL(pathname, siteUrl).toString()} rel="canonical" />
        </>
      )}
    </Head>
  )
}

export default SEO
