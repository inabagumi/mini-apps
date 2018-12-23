import { Link } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as styled } from 'styled-components'
import { default as Layout } from '../../components/layout'
import { default as Result } from '../../components/result'
import { default as neruVisual } from '../../images/neru-visual.jpg'

const Content = styled.main`
  box-sizing: border-box;
  padding: 20px 0 0;
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

const MessageWrapper = styled.div`
  svg {
    display: block;
    margin: 0 auto;
  }
`

const Message = styled.div`
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

const Evaluation = styled.div`
  display: flex;
  margin: 20px 0 0;
`

const EvaluationComment = styled.p`
  background-color: #ececec;
  border-radius: 10px;
  flex: 1;
  margin: 8px 0 0 16px;
  padding: 10px;
  position: relative;

  ::after {
    border-color: transparent #ececec transparent transparent;
    border-style: solid;
    border-width: 7px 10px 7px 0;
    content: '';
    display: block;
    height: 0;
    left: -10px;
    position: absolute;
    top: 16px;
    width: 0;
  }

  @media (min-width: 500px) {
    margin-top: 20px;
  }
`

const Avatar = styled.figure`
  margin: 2px 0 0;

  svg {
    border: solid #14b9ff 2px;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: 56px;
    width: 56px;
  }

  @media (min-width: 500px) {
    svg {
      border-weight: 4px;
      height: 80px;
      text-align: center;
      width: 80px;
    }
  }
`

const AvatarCaption = styled.figcaption`
  font-size: 1rem;
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

const Button = styled(Link)`
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

const FooterWrapper = styled.footer`
  background-color: #212121;
  margin: 56px -20px 0;
`

const Footer = styled.div`
  margin: 0 auto;
  max-width: 680px;
  padding: 36px 20px 32px;

  @media (min-width: 500px) {
    padding: 48px 20px 44px;
  }
`

const Copyright = styled.p`
  color: #595959;
  font-size: 1.3rem;
  margin: 28px 0 0;
  letter-spacing: 0.04rem;
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }
`

export default () => {
  const queryString = (typeof location !== 'undefined' && location.search) || ''
  const showShareButton = queryString.indexOf('s=true') < 1

  return (
    <Layout>
      <Helmet>
        <link href="https://shindan.animare.cafe/s/hUuAaZpw" rel="canonical" />
        <meta content="好みと推しVTuberを無意識から探る！" name="description" />
        <meta content="website" property="og:type" />
        <meta
          content="https://shindan.animare.cafe/s/hUuAaZpw"
          property="og:url"
        />
        <meta
          content={`${new URL(neruVisual, 'https://shindan.animare.cafe/')}`}
          property="og:image"
        />
        <meta
          content="あなたのオタクタイプ診断 by あにまーれ"
          property="og:site_name"
        />
        <meta content="あなたのオタクタイプを今すぐ診断" property="og:title" />
        <meta
          content="好みと推しVTuberを無意識から探る！"
          property="og:description"
        />
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          content={`${new URL(neruVisual, 'https://shindan.animare.cafe/')}`}
          name="twitter:image"
        />
        <meta
          content="あなたのオタクタイプ診断 by あにまーれ"
          name="twitter:title"
        />
        <meta
          content="好みと推しVTuberを無意識から探る！"
          name="twitter:description"
        />
      </Helmet>

      <Content>
        <Title>オタクタイプ 診断結果</Title>

        <MessageWrapper>
          <svg height="56" width="56">
            <use xlinkHref="#nanashi" />
          </svg>
          <Message>
            <MessageTitle>
              <span>
                アナタは
                <mark>清楚</mark>
                系の
              </span>
              <span>
                <mark>うさぎ</mark>
                好きです!
              </span>
            </MessageTitle>

            <Evaluation>
              <Avatar>
                <svg height="56" width="56">
                  <use xlinkHref="#nanashi" />
                </svg>

                <AvatarCaption>黒猫 ななし</AvatarCaption>
              </Avatar>

              <EvaluationComment>あにまーれは仲良しです♩</EvaluationComment>
            </Evaluation>

            {showShareButton && (
              <>
                <ShareButton
                  href="https://twitter.com/intent/tweet?hashtags=%E3%81%82%E3%81%AB%E3%81%BE%E3%83%BC%E3%82%8C%E3%82%AA%E3%82%BF%E3%82%AF%E3%82%BF%E3%82%A4%E3%83%97%E8%A8%BA%E6%96%AD&amp;text=%E3%82%A2%E3%83%8A%E3%82%BF%E3%81%AF%E6%B8%85%E6%A5%9A%E7%B3%BB%E3%80%90%E3%81%86%E3%81%95%E3%81%8E%E5%A5%BD%E3%81%8D%E3%80%91%E3%81%A7%E3%81%99%EF%BC%81%0A&amp;url=https%3A%2F%2Fshindan.animare.cafe%2Fs%2FhUuAaZpw%3Fs%3Dtrue"
                  rel="noopener noreferrer"
                  role="button"
                  target="_blank"
                >
                  診断結果をツイートする
                </ShareButton>
                <Button role="button" to="/">
                  もう一度診断する
                </Button>
              </>
            )}
          </Message>
        </MessageWrapper>

        <SubTitle>
          総勢約6,000名のVTuberの中から【清楚好き】のアナタにマッチするVTuberが選ばれました!
        </SubTitle>

        <Result />
      </Content>

      <FooterWrapper>
        <Footer>
          <Copyright>
            Copyright 2018{' '}
            <a href="" rel="noopener noreferrer" target="_blank">
              山岸 和利
            </a>
          </Copyright>
        </Footer>
      </FooterWrapper>
    </Layout>
  )
}
