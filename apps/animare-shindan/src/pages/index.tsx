import { Link, withPrefix } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as styled } from 'styled-components'
import * as pkg from '../../package.json'
import { default as Header } from '../components/header'
import { default as Layout } from '../components/layout'
import { default as Message } from '../components/message'
import { default as mainVisual } from '../images/main-visual.png'

const version = pkg.version
  .split('.')
  .slice(0, 2)
  .join('.')

const Content = styled.main`
  padding-top: 30px;
`

const Title = styled.h1`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 10vw;
  font-weight: inherit;
  justify-content: center;
  letter-spacing: 0.038rem;
  line-height: 1.4;
  margin: -8px 0 0;

  span {
    display: block;
  }

  span:first-child {
    font-size: 2rem;
  }

  @media (min-width: 500px) {
    font-size: 4.6rem;

    span:first-child {
      font-size: 2.4rem;
    }
  }
`

const Description = styled.p`
  font-size: 1.3rem;
  letter-spacing: 0.04rem;
  line-height: 1.7;
  margin: 20px 0 0;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.6rem;
    line-height: 1.8;
    margin-top: 30px;
  }
`

const Intro = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.04rem;
  margin: 22px 0 0;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.8rem;
    margin-top: 24px;
  }
`

const Button = styled(Link)`
  align-items: center;
  background-color: #0588f7;
  border: solid #000 4px;
  border-radius: 28px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 1.8rem;
  height: 56px;
  justify-content: center;
  margin: 10px auto 0;
  max-width: 380px;
  text-decoration: none;
  width: 80%;

  @media (min-width: 500px) {
    border-radius: 36px;
    font-size: 2.4rem;
    height: 72px;
  }
`

const Footer = styled.footer`
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

const FooterContent = styled.div`
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

export default () => (
  <Layout>
    <Helmet>
      <link href="https://shindan.animare.cafe/" rel="canonical" />
      <meta content="好みと推しVTuberを無意識から探る！" name="description" />
      <meta content="website" property="og:type" />
      <meta content="https://shindan.animare.cafe/" property="og:url" />
      <meta
        content={`${new URL(mainVisual, 'https://shindan.animare.cafe/')}`}
        property="og:image"
      />
      <meta
        content="あなたのオタクタイプ診断 by あにまーれ"
        property="og:site_name"
      />
      <meta content="あなたのオタクタイプを今すぐ診断" property="og:title" />
      <meta
        content="好みと推しVTuberを無意識から探る！"
        property="og:description"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta
        content={`${new URL(mainVisual, 'https://shindan.animare.cafe/')}`}
        name="twitter:image"
      />
      <meta
        content="あなたのオタクタイプ診断 by あにまーれ"
        name="twitter:title"
      />
      <meta
        content="好みと推しVTuberを無意識から探る！"
        name="twitter:description"
      />
    </Helmet>

    <Header />

    <Content>
      <Message>
        <Title>
          <span>アナタの</span>
          <span>オタクタイプ診断</span>
        </Title>
        <Description>
          アナタの隠されたオタクタイプを徹底診断!
          <br />
          アナタにマッチするVライバーから、
          <br />
          スペシャルなボイスメッセージも…?
        </Description>

        <Intro>アナタはどんなオタクタイプ?</Intro>
        <Button role="button" to="/questions">
          診断スタート!
        </Button>
      </Message>
    </Content>

    <Footer>
      <svg height="200" width="200">
        <use xlinkHref="#nanashi" />
      </svg>

      <FooterContent>
        <VersionLink to="/list">Version {version}</VersionLink>
        <Copyright>
          Copyright 2018{' '}
          <a href="" rel="noopener noreferrer" target="_blank">
            山岸 和利
          </a>
        </Copyright>
      </FooterContent>
    </Footer>
  </Layout>
)
