import styled from '@emotion/styled'
import React, { FunctionComponent, ReactElement } from 'react'
import MessageWindow from '../../components/message-window'
import { AnalysisResult } from '../../types'
import Evaluation from './evaluation'
import Graph from './graph'
import ShareButton from './share-button'

const Content = styled.div`
  padding: 20px;

  @media (min-width: 500px) {
    padding: 40px;
  }
`

const Title = styled.h2`
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

type Props = {
  result: AnalysisResult
  showShareButton: boolean
}

const MessageBox: FunctionComponent<Props> = ({
  result,
  showShareButton
}): ReactElement => (
  <MessageWindow>
    <Content>
      <Title>
        <span>
          アナタは
          <mark>{result.type}</mark>
          系の
        </span>
        <span>
          <mark>{result.attribute}</mark>
          好きです!
        </span>
      </Title>

      <Evaluation />

      {showShareButton && <ShareButton result={result} />}

      <Graph result={result} />
    </Content>
  </MessageWindow>
)

export default MessageBox
