import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadata {
  description: string
  siteUrl: string
  title: string
}

interface Site {
  siteMetadata: SiteMetadata
}

export default (): SiteMetadata => {
  const { site } = useStaticQuery<{ site: Site }>(
    graphql`
      query {
        site {
          siteMetadata {
            description
            siteUrl
            title
          }
        }
      }
    `
  )

  return site.siteMetadata
}
