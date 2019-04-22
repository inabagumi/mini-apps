import * as React from 'react'
import { default as styled } from 'styled-components'
import { AnalysisResult } from '../../types'

const Container = styled.section``

const Label = styled.p`
  color: #fff;
  font-size: 1.4rem;
  margin: 24px 0 0;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 2rem;
  }
`

const Content = styled.div`
  margin: 0 auto;

  @media (min-width: 500px) {
    width: 375px;
  }
`

const Profile = styled.header`
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  padding: 12px;
`

const Catchphrase = styled.p`
  color: #595959;
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  text-align: center;
`

const Name = styled.h3`
  color: #0588f7;
  margin: 0;
  font-size: 2.4rem;
  font-weight: 900;
  line-height: 1.6;
  text-align: center;

  a {
    color: inherit;
    display: block;
    text-decoration: none;
  }
`

const Movie = styled.div`
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
  width: 100%;
  z-index: 1;

  iframe {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }
`

const Headline = styled.h4`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1.6;
  margin: 20px 0 0;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 2.8rem;
  }
`

const Button = styled.a`
  align-items: center;
  background-color: #fbc02d;
  border-radius: 32px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 1.8rem;
  font-weight: 900;
  height: 64px;
  justify-content: center;
  line-height: 1.4;
  margin: 12px auto 0;
  max-width: 380px;
  padding: 0 20px;
  text-decoration: none;
  width: 100%;

  @media (min-width: 500px) {
    border-radius: 36px;
    font-size: 2.2rem;
    height: 72px;
  }
`

interface Props {
  result: AnalysisResult
}

export default React.memo((({ result }) => (
  <Container>
    <Label>「{result.name}」のおすすめ動画はこちら!</Label>

    <Content>
      <Profile>
        <Catchphrase>{result.catchphrase}</Catchphrase>
        <Name>
          <a href={result.twitter} rel="noopener noreferrer" target="_blank">
            {result.name}
          </a>
        </Name>
      </Profile>
      <div>
        <Movie dangerouslySetInnerHTML={{ __html: result.embedHTML }} />
      </div>
    </Content>

    <Headline>
      YouTubeにアクセスして、
      <br />「{result.name}」と会話しよう!
    </Headline>

    <Button
      href={result.youtube}
      rel="noopener noreferrer"
      role="button"
      target="_blank"
    >
      このVTuberに会いに行く!
    </Button>
  </Container>
)) as React.FunctionComponent<Props>)
