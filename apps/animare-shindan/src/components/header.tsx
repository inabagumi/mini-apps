import { Link } from 'gatsby'
import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-metadata'
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

const createLineShareURL = (url: string): string => {
  const lineShareURL = new URL(
    '/lineit/share',
    'https://social-plugins.line.me'
  )
  lineShareURL.searchParams.set('url', url)

  return lineShareURL.toString()
}

const createTweetURL = (url: string): string => {
  const tweetURL = new URL('/intent/tweet', 'https://twitter.com')
  tweetURL.searchParams.set('hashtags', 'あにまーれオタクタイプ診断')
  tweetURL.searchParams.set('text', '')
  tweetURL.searchParams.set('url', url)

  return tweetURL.toString()
}

const Header: FunctionComponent = (): ReactElement => {
  const { siteUrl } = useSiteMetadata()
  const url = new URL('/', siteUrl).toString()

  return (
    <Container>
      <Logo to="/">ANiMARE</Logo>

      <Navigation>
        <ul>
          <li>
            <ShareButton
              href={createTweetURL(url)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ShareLogo
                alt="Twitter"
                height="24"
                src={twitterLogo}
                width="24"
              />
            </ShareButton>
          </li>
          <li>
            <ShareButton
              href={createLineShareURL(url)}
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
}

export default Header
