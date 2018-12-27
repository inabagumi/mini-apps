import * as React from 'react'
import { default as styled } from 'styled-components'

const FooterWrapper = styled.footer`
  background-color: #212121;
  margin: 56px -20px 0;

  @media (min-width: 500px) {
    margin-left: 0;
    margin-right: 0;
  }
`

const Footer = styled.div`
  margin: 0 auto;
  max-width: 680px;
  padding: 36px 20px 32px;

  @media (min-width: 500px) {
    padding: 48px 20px 44px;
  }
`

const Copyright = styled.p`
  color: #595959;
  font-size: 1.3rem;
  margin: 28px 0 0;
  letter-spacing: 0.04rem;
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }
`

export default () => (
  <FooterWrapper>
    <Footer>
      <Copyright>
        Copyright 2018{' '}
        <a href="https://ykzts.com/" rel="noopener noreferrer" target="_blank">
          山岸 和利
        </a>
      </Copyright>
    </Footer>
  </FooterWrapper>
)
