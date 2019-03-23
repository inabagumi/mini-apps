import { Link } from 'gatsby'
import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'
import lineLogo from '../images/line.svg'
import twitterLogo from '../images/twitter.svg'

const Container = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 680px;
  padding: 20px 0;
  width: 100%;
`

const Logo = styled(Link)`
  background-color: #212121;
  border-radius: 3px;
  color: #fff;
  display: block;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 7px;
  line-height: 2;
  padding: 0 0.2em 0 0.5em;
  text-decoration: none;
`

const Navigation = styled.nav`
  ul {
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    display: block;
    margin: 0 4px;
    padding: 0;
  }
`

const ShareButton = styled.a`
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  height: 32px;
  justify-content: center;
  width: 32px;

  @media (min-width: 500px) {
    height: 48px;
    width: 48px;
  }
`

const ShareLogo = styled.img`
  height: 16px;
  width: 16px;

  @media (min-width: 500px) {
    height: 24px;
    width: 24px;
  }
`

const Header: FunctionComponent = (): ReactElement => (
  <Container>
    <Logo to="/">ANiMARE</Logo>

    <Navigation>
      <ul>
        <li>
          <ShareButton
            href="https://twitter.com/intent/tweet?hashtags=%E3%81%82%E3%81%AB%E3%81%BE%E3%83%BC%E3%82%8C%E3%82%AA%E3%82%BF%E3%82%AF%E3%82%BF%E3%82%A4%E3%83%97%E8%A8%BA%E6%96%AD&amp;text=&amp;url=https%3A%2F%2Fshindan.animare.cafe%2F"
            rel="noopener noreferrer"
            target="_blank"
          >
            <ShareLogo alt="Twitter" height="24" src={twitterLogo} width="24" />
          </ShareButton>
        </li>
        <li>
          <ShareButton
            href="https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fshindan.animare.cafe%2F"
            rel="noopener noreferrer"
            target="_blank"
          >
            <ShareLogo alt="Line" height="24" src={lineLogo} width="24" />
          </ShareButton>
        </li>
      </ul>
    </Navigation>
  </Container>
)

export default Header
