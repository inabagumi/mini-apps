import { graphql } from 'gatsby'
import * as React from 'react'
import { default as Result } from './result'

interface Props {
  data: {
    resultsJson: AnalysisResult
  }
  location: Location
}

export default (({ data, location }) => (
  <Result location={location} result={data.resultsJson} />
)) as React.FunctionComponent<Props>

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
