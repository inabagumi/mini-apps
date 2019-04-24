import styled from '@emotion/styled'
import React, { FunctionComponent, ReactElement } from 'react'
import { AnalysisResult } from '../../types'
import Evaluation from './evaluation'
import Graph from './graph'
import ShareButton from './share-button'

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

  span:first-of-type {
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

  span:first-of-type mark {
    margin-right: 2px;
  }

  span:last-of-type mark {
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

interface Props {
  location: Location
  result: AnalysisResult
}

const MessageBox: FunctionComponent<Props> = ({
  location,
  result
}): ReactElement => {
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

        {showShareButton && <ShareButton result={result} />}

        <Graph result={result} />
      </Content>
    </Container>
  )
}

export default MessageBox
