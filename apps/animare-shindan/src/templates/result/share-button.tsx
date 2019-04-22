import { Link } from 'gatsby'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import useSiteMetadata from '../../hooks/use-site-metadata'
import { AnalysisResult } from '../../types'

const Button = styled.a`
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
  result: AnalysisResult
}

const ShareButton: FunctionComponent<Props> = ({ result }) => {
  const { siteUrl } = useSiteMetadata()
  const hashtag = 'あにまーれオタクタイプ診断'
  const text = `アナタは${result.type}系【${result.attribute}好き】です！\n`
  const url = new URL(`/s/${result.id}?s=true`, siteUrl).toString()
  const tweetURL = `https://twitter.com/intent/tweet?hashtags=${encodeURIComponent(
    hashtag
  )}&text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`

  return (
    <>
      <Button
        href={tweetURL}
        rel="noopener noreferrer"
        role="button"
        target="_blank"
      >
        診断結果をツイートする
      </Button>
      <RetryButton role="button" to="/">
        もう一度診断する
      </RetryButton>
    </>
  )
}

export default ShareButton
