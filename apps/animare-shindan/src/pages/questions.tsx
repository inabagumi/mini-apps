import { navigate } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as styled, keyframes } from 'styled-components'
import { default as Layout } from '../components/layout'
import { default as ProgressBar } from '../components/progress-bar'

const loading = keyframes`
  0% {
    content: '';
  }

  25% {
    content: '.';
  }

  50% {
    content: '..';
  }

  75% {
    content: '...';
  }

  100% {
    content: '';
  }
`

const Question = styled.section`
  box-sizing: border-box;
  padding-top: 28px;

  @media (min-width: 500px) {
    margin: 0 auto;
    max-width: 500px;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const QuestionHeader = styled.header`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 164px;

  @media (min-width: 500px) {
    min-height: 195px;
  }
`

const Title = styled.h2`
  color: #fff;
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: 0.04rem;
  line-height: 1.5;
  margin: 16px 0 0;
  padding: 0 8px;

  @media (min-width: 500px) {
    font-size: 3rem;
  }
`

const Number = styled.h3`
  align-items: center;
  background-color: #fbc02d;
  border-radius: 22px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 2.2rem;
  font-weight: 900;
  height: 40px;
  justify-content: center;
  letter-spacing: 0.16rem;
  margin: 0;
  padding-bottom: 5px;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.04);
  width: 80px;
`

const CounterContainer = styled.div`
  padding: 0 6px;
`

const Counter = styled.p`
  color: #fff;
  height: 40px;
  font-size: 1rem;
  font-weight: 900;
  line-height: 36px;
  margin: -2px 0 2px;
  text-align: right;

  mark {
    color: #fff263;
    background-color: transparent;
    font-size: 2rem;
    margin-right: 1px;
  }
`

const AnswerList = styled.div`
  margin: 20px 0 0;
  padding: 0 5px;
`

const Answer = styled.button`
  align-items: center;
  background-color: #fff;
  border: solid #000 3px;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  justify-content: flex-start;
  line-height: 1.4;
  min-height: 70px;
  padding: 0 20px;
  width: 100%;

  :not(:first-child) {
    margin-top: 10px;
  }

  @media (min-width: 500px) {
    font-size: 2rem;
    line-height: 1.6;
    min-height: 86px;
  }
`

const NowAnalysing = styled.div`
  align-items: center;
  bottom: 0;
  color: #fff;
  display: flex;
  font-size: 2rem;
  font-weight: 900;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;

  p {
    margin: -15px 0 0 -22px;
  }

  p::after {
    animation: ${loading} 1s infinite;
    content: '';
    display: inline-block;
    margin: 0 0 0 2px;
    position: absolute;
  }
`

interface State {
  analysing: boolean
}

interface Props {}

export default class Questions extends React.Component<Props, State> {
  state: State = {
    analysing: false
  }

  shouldComponentUpdate(_: Props, nextState: State) {
    const { analysing } = this.state

    return analysing !== nextState.analysing
  }

  handleAnswer = () => {
    this.setState({ analysing: true }, () => {
      setTimeout(() => {
        navigate('/s/hUuAaZpw')
      }, 500)
    })
  }

  render() {
    const { analysing } = this.state

    return (
      <Layout>
        <Helmet>
          <title>診断中...</title>
          <link href="https://shindan.animare.care/" rel="canonical" />
        </Helmet>

        <main>
          {!analysing ? (
            <Question>
              <QuestionHeader>
                <Number>Q1</Number>
                <Title>あなたが好きなのは?</Title>
              </QuestionHeader>
              <CounterContainer>
                <Counter>
                  残り
                  <mark>1</mark>問
                </Counter>
                <ProgressBar max={1} value={1} />
              </CounterContainer>
              <AnswerList>
                <Answer onClick={this.handleAnswer}>メガネ</Answer>
                <Answer onClick={this.handleAnswer}>黒スト</Answer>
                <Answer onClick={this.handleAnswer}>うさぎ耳</Answer>
                <Answer onClick={this.handleAnswer}>清楚</Answer>
              </AnswerList>
            </Question>
          ) : (
            <NowAnalysing>
              <p>あなたのオタクタイプを分析中</p>
            </NowAnalysing>
          )}
        </main>
      </Layout>
    )
  }
}
