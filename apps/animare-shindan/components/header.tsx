import Link from 'next/link'
import type { FC } from 'react'
import styled from 'styled-components'
import lineLogo from '../assets/line.svg'
import twitterLogo from '../assets/twitter.svg'
import pkg from '../package.json'
import { createLineShareURL, createTweetURL } from '../utils/share'

const Container = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 680px;
  padding: 20px 0;
  width: 100%;
`

const Logo = styled.a`
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

const Header: FC = () => {
  return (
    <Container>
      <Link href="/" passHref prefetch={false}>
        <Logo>ANiMARE</Logo>
      </Link>

      <Navigation>
        <ul>
          <li>
            <ShareButton
              href={createTweetURL(new URL('/', pkg.homepage).toString())}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ShareLogo
                alt="Twitter"
                height="24"
                src={twitterLogo.src}
                width="24"
              />
            </ShareButton>
          </li>
          <li>
            <ShareButton
              href={createLineShareURL(new URL('/', pkg.homepage).toString())}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ShareLogo alt="Line" height="24" src={lineLogo.src} width="24" />
            </ShareButton>
          </li>
        </ul>
      </Navigation>
    </Container>
  )
}

export default Header
