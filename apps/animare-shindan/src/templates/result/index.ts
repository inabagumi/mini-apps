import { graphql } from 'gatsby'

export { default } from './result'
export const pageQuery = graphql`
  query($id: String!) {
    resultsJson(id: { eq: $id }) {
      attribute
      catchphrase
      embeddedHTML
      id
      name
      type
      twitter
      youtube
    }
  }
`
