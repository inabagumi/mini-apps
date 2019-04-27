import styled from '@emotion/styled'
import { Link, graphql } from 'gatsby'
import React, { FunctionComponent, ReactElement } from 'react'
import Layout from '../../components/layout'
import MessageWindow from '../../components/message-window'
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
    padding: 24px 20px 30px;
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
    padding: 0 0 24px;
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

const Footer = styled.div`
  padding-top: 38px;
`

const Message = styled(MessageWindow)`
  margin-left: auto;
  margin-right: auto;
  max-width: 416px;
  width: 100%;
`

const MessageParagraph = styled.p`
  font-size: 1.7rem;
  font-weight: 900;
  line-height: 1.6;
  margin: 16px 20px 0;
  text-align: center;
`

const MessageButton = styled.a`
  align-items: center;
  background-color: #0588f7;
  border-radius: 28px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 1.6rem;
  height: 56px;
  justify-content: center;
  margin: 12px 20px 20px;
  text-decoration: none;

  ::after {
    content: 'launch';
    display: inline-block;
    font-family: Material Icons;
    font-size: 1.8rem;
    font-weight: normal;
    line-height: 1;
    margin-left: 4px;
  }
`

interface Props {
  data: {
    result: AnalysisResult
  }
  location: Location
}

const Result: FunctionComponent<Props> = ({ location, data }): ReactElement => {
  const { result } = data
  const queryString = (typeof location !== 'undefined' && location.search) || ''
  const isShared = queryString.indexOf('s=true') < 1

  return (
    <Layout>
      <SEO
        image={result.image}
        pathname={`/s/${result.id}?s=true`}
        title={`${result.name}が選ばれました！`}
      />

      <Content>
        <Title>オタクタイプ 診断結果</Title>

        <MessageBox result={result} showShareButton={isShared} />

        {!isShared && (
          <Button role="button" to="/">
            オタクタイプを診断してみる
          </Button>
        )}

        <SubTitle>
          総勢約7,000名のVTuberの中から【{result.type}
          好き】のアナタにマッチするVTuberが選ばれました!
        </SubTitle>

        <Detail result={result} />

        <Footer>
          <Message>
            <MessageParagraph>
              その他のVTuberや詳しい情報は
              <br />
              YouTubeをチェックしてみてね！
            </MessageParagraph>

            <MessageButton
              href="https://www.youtube.com/"
              rel="noreferrer noopener"
              role="button"
              target="_blank"
            >
              YouTube公式ウェブサイト
            </MessageButton>
          </Message>

          <Button role="button" to="/">
            オタクタイプを診断してみる
          </Button>
        </Footer>
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
