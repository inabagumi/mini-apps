const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      src="https://polyfill.io/v3/polyfill.min.js?features=URL"
      key="polyfills"
    />
  ])
}
