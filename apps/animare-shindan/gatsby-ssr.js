import React from 'react'
import { URL } from 'url'

global.URL = URL

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      as="style"
      href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:700,900&amp;display=swap"
      key="font-noto-sans-jp"
      rel="preload"
    />,
    <link
      as="style"
      href="https://fonts.googleapis.com/css?family=Material+Icons"
      key="font-material-icons"
      rel="preload"
    />
  ])

  setPostBodyComponents([
    <script
      src="https://polyfill.io/v3/polyfill.min.js?features=URL"
      key="polyfills"
    />,
    <link
      href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:700,900&amp;display=swap"
      key="font-noto-sans-jp"
      rel="stylesheet"
    />,
    <link
      href="https://fonts.googleapis.com/css?family=Material+Icons"
      key="font-material-icons"
      rel="stylesheet"
    />
  ])
}
