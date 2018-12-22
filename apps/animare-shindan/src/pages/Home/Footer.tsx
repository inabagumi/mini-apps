import * as React from 'react'
import { Link } from 'react-router-dom'
import { default as styled } from 'styled-components'
import * as pkg from '../../../package.json'

const Container = styled.footer`
  margin: 40px -20px 0;

  svg {
    display: block;
    margin: 0 auto;
  }

  @media (min-width: 500px) {
    margin: 20px 0 0;
  }

  @media (min-height: 900px) {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
  }
`

const Content = styled.div`
  background-color: #fff;
  border-top: solid #000 6px;
  padding: 20px 12px 32px;
  text-align: center;

  @media (min-width: 500px) {
    margin-left: -20px;
  }
`

const VersionLink = styled(Link)`
  color: #000;
  font-size: 1.2rem;
  text-decoration: underline;
`

const Copyright = styled.p`
  display: block;
  font-size: 100%;
  margin: 0;

  a {
    color: inherit;
    text-decoration: none;
  }
`

const version = pkg.version
  .split('.')
  .slice(0, 2)
  .join('.')

export default function Footer() {
  return (
    <Container>
      <svg height="200" width="200">
        <use xlinkHref="#nanashi" />
      </svg>

      <Content>
        <VersionLink to="/list">Version {version}</VersionLink>
        <Copyright>
          Copyright 2018{' '}
          <a href="" rel="noopener noreferrer" target="_blank">
            山岸 和利
          </a>
        </Copyright>
      </Content>
    </Container>
  )
}
