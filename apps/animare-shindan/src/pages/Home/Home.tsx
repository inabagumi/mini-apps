import * as React from 'react'
import { Link } from 'react-router-dom'
import { default as styled } from 'styled-components'
import { default as Header } from '../../components/Header'
import { default as Footer } from './Footer'

const MessageBox = styled.main`
  background-color: #fff;
  border: solid #000 4px;
  border-radius: 20px;
  box-sizing: border-box;
  color: #000;
  font-weight: 900;
  margin: 30px auto 0;
  max-width: 680px;
  padding: 25px 0;
  width: 100%;

  @media (min-width: 500px) {
    margin-top: 50px;
    padding-bottom: 40px;
    padding-top: 40px;
  }
`

const MessageTitle = styled.h1`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 10vw;
  font-weight: inherit;
  justify-content: center;
  letter-spacing: 0.038rem;
  line-height: 1.4;
  margin: -8px 0 0;

  span {
    display: block;
  }

  span:first-child {
    font-size: 2rem;
  }

  @media (min-width: 500px) {
    font-size: 4.6rem;

    span:first-child {
      font-size: 2.4rem;
    }
  }
`

const MessageDescription = styled.p`
  font-size: 1.3rem;
  letter-spacing: 0.04rem;
  line-height: 1.7;
  margin: 20px 0 0;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.6rem;
    line-height: 1.8;
    margin-top: 30px;
  }
`

const MessageIntro = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.04rem;
  margin: 22px 0 0;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.8rem;
    margin-top: 24px;
  }
`

const Button = styled(Link)`
  align-items: center;
  background-color: #0588f7;
  border: solid #000 4px;
  border-radius: 28px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 1.8rem;
  height: 56px;
  justify-content: center;
  margin: 10px auto 0;
  max-width: 380px;
  text-decoration: none;
  width: 80%;

  @media (min-width: 500px) {
    border-radius: 36px;
    font-size: 2.4rem;
    height: 72px;
  }
`

export default function Home() {
  return (
    <>
      <Header />

      <MessageBox>
        <MessageTitle>
          <span>アナタの</span>
          <span>オタクタイプ診断</span>
        </MessageTitle>
        <MessageDescription>
          アナタの隠されたオタクタイプを徹底診断!
          <br />
          アナタにマッチするVライバーから、
          <br />
          スペシャルなボイスメッセージも…?
        </MessageDescription>

        <MessageIntro>アナタはどんなオタクタイプ?</MessageIntro>
        <Button role="button" to="/questions">
          診断スタート!
        </Button>
      </MessageBox>

      <Footer />
    </>
  )
}
