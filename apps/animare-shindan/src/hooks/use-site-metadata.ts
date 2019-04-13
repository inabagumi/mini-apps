import { graphql, useStaticQuery } from 'gatsby'

type SiteMetadata = {
  description: string
  siteUrl: string
  title: string
}

type Site = {
  siteMetadata: SiteMetadata
}

type SiteDate = {
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
