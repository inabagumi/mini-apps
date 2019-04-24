import styled from '@emotion/styled'
import { Link, graphql } from 'gatsby'
import React, { FunctionComponent, ReactElement } from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { AnalysisResult } from '../../types'
import Detail from './detail'
import MessageBox from './message-box'

const Content = styled.main`
  box-sizing: border-box;
  padding: 20px 0 30px;
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
  data: {
    result: AnalysisResult
  }
  location: Location
}

const Result: FunctionComponent<Props> = ({ location, data }): ReactElement => {
  const { result } = data

  return (
    <Layout>
      <SEO
        image={result.image}
        pathname={`/s/${result.id}?s=true`}
        title={`${result.name}が選ばれました！`}
      />

      <Content>
        <Title>オタクタイプ 診断結果</Title>

        <MessageBox location={location} result={result} />

        <SubTitle>
          総勢約7,000名のVTuberの中から【{result.type}
          好き】のアナタにマッチするVTuberが選ばれました!
        </SubTitle>

        <Detail result={result} />

        <Button role="button" to="/">
          オタクタイプを診断してみる
        </Button>
      </Content>
    </Layout>
  )
}

export default Result

export const pageQuery = graphql`
  query($id: String!) {
    result: resultsYaml(id: { eq: $id }) {
      attribute
      catchphrase
      embedHTML
      id
      image {
        publicURL
      }
      name
      parameters {
        label
        value
      }
      type
      twitter
      youtube
    }
  }
`
