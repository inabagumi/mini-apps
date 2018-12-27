import { graphql } from 'gatsby'
import * as React from 'react'
import { default as Result } from './result'

interface Props {
  data: {
    result: AnalysisResult
  }
  location: Location
}

export default (({ data, location }) => (
  <Result location={location} result={data.result} />
)) as React.FunctionComponent<Props>

export const pageQuery = graphql`
  query($id: String!) {
    result: resultsJson(id: { eq: $id }) {
      attribute
      catchphrase
      embeddedHTML
      id
      image {
        publicURL
      }
      name
      type
      twitter
      youtube
    }
  }
`
