import Link from 'next/link'
import styled from 'styled-components'

import pkg from '../package.json'

const Content = styled.footer`
  align-items: center;
  background-color: #fff;
  border-top: solid #000 6px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 20px 12px 32px;
`

const ReleaseLink = styled(Link)`
  color: #000;
  display: block;
  font-size: 1.2rem;
  text-decoration: underline;
`

const Copyright = styled.p`
  font-size: 1.3rem;
  margin: 28px 0 0;
  letter-spacing: 0.04rem;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default function Footer(): JSX.Element {
  return (
    <Content>
      <ReleaseLink href="/list" prefetch={false}>
        Version {pkg.version.split('.').slice(0, 2).join('.')}
      </ReleaseLink>

      <Copyright>
        {'Copyright 2018-2023 '}
        <a href="https://haneru.dev/" rel="noopener noreferrer" target="_blank">
          Haneru Developers
        </a>
      </Copyright>
    </Content>
  )
}
