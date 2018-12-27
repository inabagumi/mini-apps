import { Link } from 'gatsby'
import * as React from 'react'
import { default as styled } from 'styled-components'
import { default as Evaluation } from './evaluation'

const Container = styled.div`
  svg {
    display: block;
    margin: 0 auto;
  }
`

const Content = styled.div`
  background-color: #fff;
  border: solid #000 3px;
  border-radius: 20px;
  padding: 20px;

  @media (min-width: 500px) {
    padding: 40px;
  }
`

const MessageTitle = styled.h2`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  font-weight: 700;
  justify-content: center;
  margin: 0;

  span {
    display: block;
  }

  span:first-child {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1;
    margin: 4px 0 4px 2px;
  }

  mark {
    background-color: transparent;
    background-image: linear-gradient(transparent 80%, #fff263 80%);
    font-size: 1.8rem;
    font-weight: 900;
  }

  span:first-child mark {
    margin-right: 2px;
  }

  span:last-child mark {
    display: inline-block;
    font-size: 3.6rem;
    height: 46px;
    letter-spacing: 0.08rem;
    line-height: 1.4;
  }

  @media (min-width: 500px) {
    font-size: 2.2rem;
  }
`

const ShareButton = styled.a`
  align-items: center;
  background-color: #55acee;
  border-radius: 28px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 1.6rem;
  height: 56px;
  justify-content: center;
  margin: 40px auto 0;
  text-decoration: none;
  width: 100%;

  @media (min-width: 500px) {
    font-size: 1.8rem;
    width: 320px;
  }
`

const RetryButton = styled(Link)`
  align-items: center;
  background-color: #fff;
  border: solid #ececec 3px;
  border-radius: 28px;
  box-sizing: border-box;
  color: #505050;
  display: flex;
  font-size: 1.6rem;
  height: 56px;
  justify-content: center;
  margin: 12px auto 0;
  text-decoration: none;
  width: 100%;

  @media (min-width: 500px) {
    font-size: 1.8rem;
    width: 320px;
  }
`

interface Props {
  location: Location
  result: AnalysisResult
}

export default (({ location, result }) => {
  const queryString = (typeof location !== 'undefined' && location.search) || ''
  const showShareButton = queryString.indexOf('s=true') < 1

  return (
    <Container>
      <svg height="56" width="56">
        <use xlinkHref="#nanashi" />
      </svg>
      <Content>
        <MessageTitle>
          <span>
            アナタは
            <mark>{result.type}</mark>
            系の
          </span>
          <span>
            <mark>{result.attribute}</mark>
            好きです!
          </span>
        </MessageTitle>

        <Evaluation />

        {showShareButton &&
          (() => {
            const hashtag = 'あにまーれオタクタイプ診断'
            const text = `アナタは${result.type}系【${
              result.attribute
            }好き】です！\n`
            const url = `https://shindan.animare.cafe/s/${result.id}?s=true`
            const tweetURL = `https://twitter.com/intent/tweet?hashtags=${encodeURIComponent(
              hashtag
            )}&text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`

            return (
              <>
                <ShareButton
                  href={tweetURL}
                  rel="noopener noreferrer"
                  role="button"
                  target="_blank"
                >
                  診断結果をツイートする
                </ShareButton>
                <RetryButton role="button" to="/">
                  もう一度診断する
                </RetryButton>
              </>
            )
          })()}
      </Content>
    </Container>
  )
}) as React.FunctionComponent<Props>
