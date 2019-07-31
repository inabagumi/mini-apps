export interface AnalysisResult {
  attribute: string
  catchphrase: string
  embedHTML: string
  fields: {
    slug: string
  }
  image?: {
    publicURL: string
  }
  name: string
  parameters: {
    label: string
    value: number
  }[]
  type: string
  twitter: string
  youtube: string
}
