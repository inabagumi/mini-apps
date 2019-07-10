import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadata {
  description: string
  siteUrl: string
  title: string
}

interface Site {
  siteMetadata: SiteMetadata
}

interface SiteDate {
  site: Site
}

export default (): SiteMetadata => {
  const { site }: SiteDate = useStaticQuery(
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
