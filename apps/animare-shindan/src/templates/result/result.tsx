import { Link } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as styled } from 'styled-components'
import { default as Layout } from '../../components/layout'
import { default as SEO } from '../../components/seo'
import { default as Detail } from './detail'
import { default as Footer } from './footer'
import { default as MessageBox } from './message-box'

const Content = styled.main`
  box-sizing: border-box;
  padding: 20px 0 0;
  width: 100%;

  @media (min-width: 500px) {
    margin: 0 auto;
    max-width: 500px;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.08rem;
  margin: 0;
  padding: 8px;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 2.4rem;
    margin-bottom: 24px;
    padding: 0;
  }
`

const SubTitle = styled.h2`
  color: #fff;
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: 0.08rem;
  line-height: 1.4;
  margin: 44px auto 8px;
  padding: 0 8px;

  @media (min-width: 500px) {
    font-size: 3.6rem;
    margin-top: 64px;
  }
`

const Button = styled(Link)`
  align-items: center;
  background-color: #fff;
  border: solid #14b9ff 4px;
  border-radius: 28px;
  box-sizing: border-box;
  color: #14b9ff;
  display: flex;
  height: 56px;
  justify-content: center;
  margin: 40px auto 0;
  max-width: 416px;
  text-decoration: none;
  width: 100%;
`

interface Props {
  location: Location
  result: AnalysisResult
}

export default (({ location, result }) => (
  <Layout>
    <SEO image={result.image} pathname={`/s/${result.id}?s=true`} />

    <Content>
      <Title>オタクタイプ 診断結果</Title>

      <MessageBox location={location} result={result} />

      <SubTitle>
        総勢約6,000名のVTuberの中から【{result.type}
        好き】のアナタにマッチするVTuberが選ばれました!
      </SubTitle>

      <Detail result={result} />

      <Button role="button" to="/">
        オタクタイプを診断してみる
      </Button>
    </Content>

    <Footer />
  </Layout>
)) as React.FunctionComponent<Props>
