import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import React, { FC } from 'react'
import Footer from 'components/organisms/Footer'
import placeholder from './placeholder.jpg'

const mainVisual = process.env.INABA_JINJA_MAIN_VISUAL_URL ?? '/main-visual.jpg'

const globalStyles = css`
  html {
    background-attachment: fixed;
    background-color: #757575;
    background-image:
      linear-gradient(
        rgba(0, 0, 0, 0.54),
        rgba(0, 0, 0, 0.54)
      ),
      url('${mainVisual}?auto=compress,format'),
      url('${mainVisual}?auto=compress,format&w=10');
    background-image:
      linear-gradient(
        rgba(0, 0, 0, 0.54),
        rgba(0, 0, 0, 0.54)
      ),
      image-set(
        url('${mainVisual}?auto=compress,format&w=0.5') 1x,
        url('${mainVisual}?auto=compress,format') 2x
      ),
      url('${placeholder}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fafafa;
  }

  @media (orientation: portrait) {
    html {
      background-image:
        linear-gradient(
          rgba(0, 0, 0, 0.54),
          rgba(0, 0, 0, 0.54)
        ),
        url('${mainVisual}?ar=0.8:1&auto=compress,format&fit=crop'),
        url('${mainVisual}?ar=0.8:1&auto=compress,format&w=10&fit=crop');
      background-image:
        linear-gradient(
          rgba(0, 0, 0, 0.54),
          rgba(0, 0, 0, 0.54)
        ),
        image-set(
          url('${mainVisual}?ar=0.8:1&auto=compress,format&fit=crop&w=0.5') 1x,
          url('${mainVisual}?ar=0.8:1&auto=compress,format&fit=crop') 2x
        ),
        url('${placeholder}');
    }
  }

  a {
    color: #f57f17;
  }

  a:hover {
    color: #ff6f00;
  }
`

const Content = styled.div`
  flex-grow: 1;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 0;
`

const Layout: FC = ({ children }) => (
  <>
    <Head>
      <link
        as="image"
        href={`${mainVisual}?auto=compress,format`}
        media="(orientation: landscape) and (min-resolution: 1.1dppx)"
        rel="preload"
      />
      <link
        as="image"
        href={`${mainVisual}?auto=compress,format&w=0.5`}
        media="(orientation: landscape) and (max-resolution: 1dppx)"
        rel="preload"
      />
      <link
        as="image"
        href={`${mainVisual}?ar=0.8:1&auto=compress,format&fit=crop`}
        media="(orientation: portrait) and (min-resolution: 1.1dppx)"
        rel="preload"
      />
      <link
        as="image"
        href={`${mainVisual}?ar=0.8:1&auto=compress,format&fit=crop&w=2x`}
        media="(orientation: portrait) and (max-resolution: 1dppx)"
        rel="preload"
      />
    </Head>

    <Global styles={globalStyles} />

    <Wrapper>
      <Content>{children}</Content>

      <Footer />
    </Wrapper>
  </>
)

export default Layout
