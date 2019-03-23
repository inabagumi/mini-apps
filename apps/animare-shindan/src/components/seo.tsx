import { graphql, useStaticQuery } from 'gatsby'
import React, { FunctionComponent, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import mainVisual from '../images/main-visual.jpg'

type Props = {
  description?: string
  image?: {
    publicURL: string
  }
  pathname: string
}

const SEO: FunctionComponent<Props> = ({
  description,
  image,
  pathname
}): ReactElement => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            defaultDescription: description
            siteUrl
          }
        }
      }
    `
  )
  const { defaultDescription, siteUrl } = site.siteMetadata

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
      <meta
        content="あなたのオタクタイプ診断 by あにまーれ"
        property="og:site_name"
      />
      <meta content="あなたのオタクタイプを今すぐ診断" property="og:title" />
      <meta
        content={description || defaultDescription}
        property="og:description"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta
        content={`${new URL(image ? image.publicURL : mainVisual, siteUrl)}`}
        name="twitter:image"
      />
      <meta
        content="あなたのオタクタイプ診断 by あにまーれ"
        name="twitter:title"
      />
      <meta
        content={description || defaultDescription}
        name="twitter:description"
      />
    </Helmet>
  )
}

export default SEO
