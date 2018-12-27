import * as React from 'react'

interface Props {
  body: string
  bodyAttributes: object
  headComponents: React.ReactNode
  htmlAttributes: object
  postBodyComponents: React.ReactNode
  preBodyComponents: React.ReactNode
}

export default (({
  body,
  bodyAttributes,
  headComponents,
  htmlAttributes,
  postBodyComponents,
  preBodyComponents
}) => (
  <html {...htmlAttributes}>
    <head>
      <meta charSet="UTF-8" />
      <meta content="width=device-width" name="viewport" />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        id="___gatsby"
        key="body"
      />
      <script src="https://cdn.polyfill.io/v2/polyfill.js?features=URL" />
      {postBodyComponents}
    </body>
  </html>
)) as React.FunctionComponent<Props>
