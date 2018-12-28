import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as styled } from 'styled-components'
import { default as Header } from '../components/header'
import { default as Layout } from '../components/layout'
import { default as Message } from '../components/message'

const Content = styled.main`
  padding-top: 30px;
`

const Section = styled.section`
  box-sizing: border-box;
  padding: 30px 0 0;
  margin: 30px 24px 0;

  :first-of-type {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  @media (min-width: 500px) {
    border-top: solid #ececec 2px;
    margin: 50px auto 0;
    max-width: 500px;
    padding: 50px 24px 0;
    width: 100%;
  }
`

const Title = styled.h2`
  color: #0588f7;
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 0.04rem;
  line-height: 1.4;
  margin: 0 0 6px;

  @media (min-width: 500px) {
    font-size: 3.6rem;
    margin-bottom: 12px;
  }
`

const Time = styled.time`
  display: block;
  font-size: 1.3rem;
  line-height: 1;

  @media (min-width: 500px) {
    font-size: 1.4rem;
  }
`

const SectionBody = styled.div`
  p {
    font-size: 1.4rem;
    line-height: 1.6;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 12px 0 0;
    padding: 0;
  }

  li {
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    width: 50%;
  }

  li::before {
    color: #0588f7;
    content: 'arrow_right';
    display: block;
    font-family: Material Icons;
    font-size: 2rem;
    margin-left: -5px;
  }

  @media (min-width: 500px) {
    ul {
      margin-top: 18px;
    }
  }
`

const Footer = styled.footer`
  background-color: #fff;
  border-top: solid #000 6px;
  margin: 40px -20px 0;
  padding: 20px 12px 32px;
`

const Copyright = styled.p`
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default (() => (
  <Layout>
    <Helmet>
      <title>お知らせ</title>
    </Helmet>

    <Header />

    <Content>
      <Message>
        <Section>
          <Time dateTime="2018-12-29">2018.12.29</Time>
          <Title>Version 1.1</Title>

          <SectionBody>
            <p>
              診断結果に表示されるVTuberが追加されました。
              <br />
              1.1で診断結果に追加されたVTuberは以下の通りです。
            </p>
            <ul>
              <li>因幡はねる</li>
              <li>因幡はねる</li>
            </ul>
          </SectionBody>
        </Section>

        <Section>
          <Time dateTime="2018-12-24">2018.12.24</Time>
          <Title>Version 1.0</Title>

          <SectionBody>
            <p>
              あにまーれオタクタイプ診断を公開しました。
              <br />
              Version
              1.0で診断結果に表示されるVTuberは以下の通りです。(※今後も随時追加予定)
            </p>
            <ul>
              <li>因幡はねる</li>
            </ul>
          </SectionBody>
        </Section>
      </Message>
    </Content>

    <Footer>
      <Copyright>
        Copyright 2018{' '}
        <a href="https://ykzts.com/" rel="noopener noreferrer" target="_blank">
          山岸 和利
        </a>
      </Copyright>
    </Footer>
  </Layout>
)) as React.FunctionComponent
