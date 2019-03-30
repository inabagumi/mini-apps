import React, { FunctionComponent, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../hooks/use-site-metadata'
import mainVisual from '../images/main-visual.jpg'

type Props = {
  description?: string
  image?: {
    publicURL: string
  }
  pathname: string
  title?: string
}

const SEO: FunctionComponent<Props> = ({
  description,
  image,
  pathname,
  title
}): ReactElement => {
  const {
    description: defaultDescription,
    siteUrl,
    title: defaultTitle
  } = useSiteMetadata()

  return (
    <Helmet>
      <link href={`${new URL(pathname, siteUrl)}`} rel="canonical" />
      <meta content={description || defaultDescription} name="description" />
      <meta content="website" property="og:type" />
      <meta content={`${new URL(pathname, siteUrl)}`} property="og:url" />
      <meta
        content={`${new URL(image ? image.publicURL : mainVisual, siteUrl)}`}
        property="og:image"
      />
      <meta content={defaultTitle} property="og:site_name" />
      <meta
        content={title || 'あなたのオタクタイプを今すぐ診断'}
        property="og:title"
      />
      <meta
        content={description || defaultDescription}
        property="og:description"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta
        content={`${new URL(image ? image.publicURL : mainVisual, siteUrl)}`}
        name="twitter:image"
      />
      <meta content={title || defaultTitle} name="twitter:title" />
      <meta
        content={description || defaultDescription}
        name="twitter:description"
      />
      <title>{title || defaultTitle}</title>
    </Helmet>
  )
}

export default SEO
