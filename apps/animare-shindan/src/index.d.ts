interface AnalysisResult {
  attribute: string
  catchphrase: string
  embedHTML: string
  id: string
  image?: {
    publicURL: string
  }
  name: string
  type: string
  twitter: string
  youtube: string
}

declare module '*.jpg'
declare module '*.png'
declare module '*.svg'
