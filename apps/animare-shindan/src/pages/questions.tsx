import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Layout from '../components/layout'
import ProgressBar from '../components/progress-bar'
import SEO from '../components/seo'
import { Question, getAnalysisResultIDs, getQuestions } from '../utils/analysis'

const Container = styled.section`
  box-sizing: border-box;
  padding: 28px 0 200px;

  @media (min-width: 500px) {
    margin: 0 auto;
    max-width: 500px;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const Header = styled.header`
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

  mark.last {
    font-size: 1.3rem;
  }
`

const Content = styled.div`
  overflow-x: hidden;
`

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  transition: transform 0.3s ease;
`

type AnswerListProps = {
  hide?: boolean
}

const AnswerList = styled.div<AnswerListProps>`
  backface-visibility: hidden;
  box-sizing: border-box;
  flex-basis: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 20px 0 0;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  padding: 0 5px;
  transition: opacity 0.4s linear;
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

  :not(:first-of-type) {
    margin-top: 10px;
  }

  @media (min-width: 500px) {
    font-size: 2rem;
    line-height: 1.6;
    min-height: 86px;
  }
`

const PrevButton = styled.button<{ hide: boolean }>`
  align-items: center;
  background-color: #fff;
  border: 3px solid #0588f7;
  border-radius: 22px;
  color: #0588f7;
  display: flex;
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 700;
  height: 44px;
  justify-content: center;
  margin: 20px 0 0 4px;
  opacity: ${(props): number => (props.hide ? 0 : 1)};
  outline: 0;
  transition: opacity ease-in 0.2s;
  width: 140px;

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }

  ::before {
    content: 'keyboard_arrow_left';
    display: inline-block;
    font-family: Material Icons;
    font-size: 24px;
    font-weight: normal;
    line-height: 1;
    margin-left: -9px;
  }
`

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

type NowAnalysingProps = {
  show?: boolean
}

const NowAnalysing = styled.div<NowAnalysingProps>`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  color: #fff;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  font-size: 2rem;
  font-weight: 900;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;

  p::after {
    animation: ${loading} 1s infinite;
    content: '';
    display: inline-block;
    margin: 0 0 0 2px;
    position: absolute;
  }
`

type Props = {
  questions: Question[]
  results: string[]
}

const Questions: NextPage<Props> = ({ questions, results }) => {
  const [count, setCount] = useState(0)
  const [analysing, setAnalysing] = useState(false)
  const router = useRouter()

  const handleAnswer = useCallback(() => {
    if (count < questions.length - 1) {
      setCount((count) => count + 1)
    } else {
      setAnalysing(true)

      const slug = results[Math.floor(Math.random() * results.length)]

      setTimeout(() => {
        void router.push(`/s/${slug}`)
      }, 1_500)
    }
  }, [count, questions.length, results, router])

  const handlePrev = useCallback(() => {
    setCount((count) => count - 1)
  }, [])

  return (
    <Layout>
      <Head>
        <meta content="noindex,follow" name="robots" />
      </Head>

      <SEO title="診断中..." />

      <Container>
        <Header>
          <Number>{`Q${count + 1}`}</Number>
          <Title>{questions[count].title}</Title>
        </Header>

        <CounterContainer>
          <Counter>
            {count < questions.length - 1 ? (
              <>
                残り
                <mark>{questions.length - count}</mark>問
              </>
            ) : (
              <mark className="last">ラスト</mark>
            )}
          </Counter>
          <ProgressBar max={questions.length} value={count + 1} />
        </CounterContainer>

        <Content>
          <AnswerContainer
            style={{ transform: `translateX(-${100 * count}%)` }}
          >
            {questions.map((question, i) => (
              <AnswerList
                aria-hidden={count !== i ? 'true' : undefined}
                hide={count !== i}
                key={question.title}
              >
                {question.answers.map((answer, i) => (
                  <Answer key={`answer-${i}`} onClick={handleAnswer}>
                    {answer}
                  </Answer>
                ))}
              </AnswerList>
            ))}
          </AnswerContainer>
        </Content>

        <PrevButton hide={count < 1} onClick={handlePrev} type="button">
          1つ前に戻る
        </PrevButton>
      </Container>

      <NowAnalysing show={analysing}>
        <p>あなたのオタクタイプを分析中</p>
      </NowAnalysing>
    </Layout>
  )
}

export default Questions

export const getStaticProps: GetStaticProps<Props> = async () => {
  const questions = await getQuestions()
  const results = await getAnalysisResultIDs()

  return {
    props: {
      questions,
      results
    }
  }
}
