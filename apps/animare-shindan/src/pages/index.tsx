import { Link } from 'gatsby'
import * as React from 'react'
import { default as styled } from 'styled-components'
import * as pkg from '../../package.json'
import { default as Header } from '../components/header'
import { default as Layout } from '../components/layout'
import { default as Message } from '../components/message'
import { default as SEO } from '../components/seo'

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

const Disclaimer = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 25px auto 0;
  padding: 0 25px;

  a {
    color: #14b9ff;
    text-decoration: none;
    transition: color 0.5s;
  }

  a:hover {
    color: #0588f7;
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

  @media (min-height: 1024px) {
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

export default (() => (
  <Layout>
    <SEO pathname="/" />

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

        <Disclaimer>
          ※このサービスは
          <a
            href="https://duo7.co.jp/"
            rel="noopener noreferrer"
            target="_blank"
          >
            株式会社DUO
          </a>
          が提供するアプリである
          <a
            href="https://iriam.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            IRIAM
          </a>
          の関連サービスである
          <a
            href="https://shindan.iriam.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            あなたのオタクタイプ診断 by IRIAM
          </a>
          をオリジナルとするファンメイドの非公式サービスです。
          <a
            href="https://animare-official.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            有閑喫茶あにまーれ
          </a>
          やその運営者とは一切関係ない第三者である
          <a
            href="https://ykzts.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            山岸 和利
          </a>
          によって制作されています。
          <br />
          制作者である山岸和利以外の人物や団体に対してこのサービスに関する問い合わせを行うのはお止めください。
        </Disclaimer>
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
          <a
            href="https://ykzts.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            山岸 和利
          </a>
        </Copyright>
      </FooterContent>
    </Footer>
  </Layout>
)) as React.FunctionComponent
