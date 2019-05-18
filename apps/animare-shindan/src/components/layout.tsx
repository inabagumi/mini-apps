import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import React, { FunctionComponent, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import Footer from './footer'

const globalStyles = css`
  html {
    background-color: #0588f7;
    background-image: repeating-linear-gradient(
      150deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05) 9px,
      transparent 10px,
      transparent 19px
    );
    font-family: Noto Sans JP, sans-serif;
    font-size: 10px;
    font-weight: 700;
    height: 100%;
    line-height: 1.8;
  }

  body {
    font-size: 1.5rem;
    height: 100%;
    margin: 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.div`
  box-sizing: border-box;
  flex-basis: 0;
  flex-grow: 1;
  padding: 0 20px;

  @media (min-width: 500px) {
    padding: 0;
  }
`

const Layout: FunctionComponent = ({ children }): ReactElement => (
  <>
    <Helmet titleTemplate="%s | #あにまーれオタクタイプ診断">
      <html lang="ja" />
      <title>あなたのオタクタイプ診断 by あにまーれ</title>
      <link href="/assets/icon-128x128.png" rel="icon" />
    </Helmet>

    <Global styles={globalStyles} />

    <Wrapper>
      <Content>{children}</Content>

      <Footer />
    </Wrapper>
  </>
)

export default Layout
