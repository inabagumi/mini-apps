const React = require('react')

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      as="style"
      href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:700,900|Material+Icons"
      key="preloaded-fonts"
      rel="preload"
    />
  ])

  setPostBodyComponents([
    <script
      src="https://polyfill.io/v3/polyfill.min.js?features=URL"
      key="polyfills"
    />,
    <link
      href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:700,900|Material+Icons"
      key="fonts"
      rel="stylesheet"
    />
  ])
}
