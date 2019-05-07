import React from 'react'
import { URL } from 'url'

global.URL = URL

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      src="https://polyfill.io/v3/polyfill.min.js?features=URL"
      key="polyfills"
    />
  ])
}
