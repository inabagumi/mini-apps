import { type FC, type ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Footer from './footer'

const GlobalStyle = createGlobalStyle`
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

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => (
  <>
    <GlobalStyle />

    <Wrapper>
      <Content>{children}</Content>

      <Footer />
    </Wrapper>
  </>
)

export default Layout
