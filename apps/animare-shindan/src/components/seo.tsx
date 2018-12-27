import { StaticQuery, graphql } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as mainVisual } from '../images/main-visual.jpg'

const query = graphql`
  query {
    site {
      siteMetadata {
        defaultDescription: description
        siteUrl
      }
    }
  }
`

interface Props {
  description?: string
  image?: {
    publicURL: string
  }
  pathname: string
}

export default (({ description, image, pathname }) => (
  <StaticQuery
    query={query}
    render={({ site }) => {
      const { defaultDescription, siteUrl } = site.siteMetadata

      return (
        <Helmet>
          <link href={`${new URL(pathname, siteUrl)}`} rel="canonical" />
          <meta
            content={description || defaultDescription}
            name="description"
          />
          <meta content="website" property="og:type" />
          <meta content={`${new URL(pathname, siteUrl)}`} property="og:url" />
          <meta
            content={`${new URL(
              image ? image.publicURL : mainVisual,
              siteUrl
            )}`}
            property="og:image"
          />
          <meta
            content="あなたのオタクタイプ診断 by あにまーれ"
            property="og:site_name"
          />
          <meta
            content="あなたのオタクタイプを今すぐ診断"
            property="og:title"
          />
          <meta
            content={description || defaultDescription}
            property="og:description"
          />
          <meta content="summary_large_image" name="twitter:card" />
          <meta
            content={`${new URL(
              image ? image.publicURL : mainVisual,
              siteUrl
            )}`}
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
    }}
  />
)) as React.FunctionComponent<Props>
