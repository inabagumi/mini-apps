import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import Layout from '../components/layout'
import Message from '../components/message'
import SEO from '../components/seo'

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

  span:first-of-type {
    font-size: 2rem;
  }

  @media (min-width: 500px) {
    font-size: 4.6rem;

    span:first-of-type {
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

const Button = styled.a`
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

const Index: NextPage = () => (
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
          アナタにマッチするVTuberの、
          <br />
          オススメ動画も…?
        </Description>

        <Intro>アナタはどんなオタクタイプ?</Intro>
        <Link href="/questions" passHref>
          <Button role="button">診断スタート!</Button>
        </Link>

        <Disclaimer>
          ※このサービスは
          <a
            href="https://www.live.iriam.com/company"
            rel="noopener noreferrer"
            target="_blank"
          >
            株式会社IRIAM
          </a>
          が提供するアプリである『
          <a
            href="https://www.live.iriam.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            IRIAM
          </a>
          』 の関連サービスとして公開されていた『あなたのオタクタイプ診断 by
          IRIAM』をオリジナルとして、
          <a
            href="https://www.774.ai/"
            rel="noopener noreferrer"
            target="_blank"
          >
            774 inc.
          </a>{' '}
          が運営しているバーチャルYouTuberグループ『有閑喫茶
          あにまーれ』をモチーフにして株式会社IRIAMや774 inc. とは一切関係のない
          <a
            href="https://haneru.dev/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Haneru Developers
          </a>
          によって開発と運営が行われている非公式のサービスになります。
          <br />
          このサービスに関するお問い合わせをHaneru
          Developers以外の団体や個人に対して行うのはお止めください。
        </Disclaimer>
      </Message>
    </Content>
  </Layout>
)

export default Index
