import { type GetStaticPaths, type GetStaticProps } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import nanashiAvatar from '../../assets/avatar.svg'
import Avatar from '../../components/avatar'
import Graph from '../../components/graph'
import Layout from '../../components/layout'
import MessageWindow from '../../components/message-window'
import SEO from '../../components/seo'
import {
  type Result,
  getAnalysisResult,
  getAnalysisResultIDs
} from '../../lib/analysis'
import { createTweetURL } from '../../lib/share'
import pkg from '../../package.json'

function createYouTubeEmbedURL(url: string): string {
  const { pathname, searchParams } = new URL(url)

  let id: string | null = null

  if (pathname === '/watch' && searchParams.has('id')) {
    id = searchParams.get('v')
  } else {
    id = pathname.slice(1)
  }

  if (!id) {
    throw new TypeError('An invalid URL was given as an argument.')
  }

  return `https://www.youtube.com/embed/${id}`
}

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

const MessageBox = styled(MessageWindow)`
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

const Evaluation = styled.div`
  display: flex;
  margin: 20px 0 0;
`

const EvaluationAvatar = styled.figure`
  margin: 2px 0 0;
`

const EvaluationCaption = styled.figcaption`
  color: #000;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 4px;
  text-align: center;
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

const DetailTitle = styled.h2`
  color: #fff;
  font-size: 1.4rem;
  margin: 24px 0 0;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 2rem;
  }
`

const DetailContent = styled.div`
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

const ProfileName = styled.h3`
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

const DetailButton = styled.a`
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

type Props = {
  result: Result
}

export default function AnalysisResult({ result }: Props): JSX.Element {
  const [isShared, setIsShared] = useState(true)

  useEffect(() => {
    const queryString =
      (typeof location !== 'undefined' && location.search) || ''

    setIsShared(queryString.indexOf('s=true') < 1)
  }, [])

  const path = `/s/${result.slug}?s=true`
  const url = new URL(path, pkg.homepage).toString()

  return (
    <Layout>
      <SEO
        image={`/images/results/${result.slug}.png`}
        pathname={path}
        title={`${result.talent.name}が選ばれました！`}
      />

      <Content>
        <Title>オタクタイプ 診断結果</Title>

        <MessageBox>
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

          <Evaluation>
            <EvaluationAvatar>
              <Avatar src={nanashiAvatar.src} />
              <EvaluationCaption>黒猫 ななし</EvaluationCaption>
            </EvaluationAvatar>

            <EvaluationComment>あにまーれは仲良しです♩</EvaluationComment>
          </Evaluation>

          {isShared && (
            <>
              <ShareButton
                href={createTweetURL(
                  url,
                  `アナタは${result.type}系【${result.attribute}好き】です！\n`
                )}
                rel="noopener noreferrer"
                role="button"
                target="_blank"
              >
                診断結果をツイートする
              </ShareButton>
              <RetryButton href="/" role="button">
                もう一度診断する
              </RetryButton>
            </>
          )}

          <Graph parameters={result.parameters} title="オタクパラメーター" />
        </MessageBox>

        {!isShared && (
          <Button href="/" role="button">
            オタクタイプを診断してみる
          </Button>
        )}

        <SubTitle>
          総勢約8,000名のVTuberの中から【{result.type}
          好き】のアナタにマッチするVTuberが選ばれました!
        </SubTitle>

        {(result.recommendedVideo || result.talent.youtube) && (
          <section>
            {result.recommendedVideo && (
              <>
                <DetailTitle>
                  「{result.talent.name}」のおすすめ動画はこちら!
                </DetailTitle>

                <DetailContent>
                  <Profile>
                    <Catchphrase>{result.catchphrase}</Catchphrase>
                    <ProfileName>
                      {result.talent.twitter ? (
                        <a
                          href={`https://twitter.com/${result.talent.twitter}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {result.talent.name}
                        </a>
                      ) : (
                        result.talent.name
                      )}
                    </ProfileName>
                  </Profile>
                  <div>
                    <Movie>
                      <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder={0}
                        height={315}
                        src={createYouTubeEmbedURL(result.recommendedVideo.url)}
                        width={560}
                      ></iframe>
                    </Movie>
                  </div>
                </DetailContent>
              </>
            )}

            {result.talent.youtube && (
              <>
                <Headline>
                  YouTubeにアクセスして、
                  <br />「{result.talent.name}」と会話しよう!
                </Headline>

                <DetailButton
                  href={`https://www.youtube.com/channel/${result.talent.youtube}`}
                  rel="noopener noreferrer"
                  role="button"
                  target="_blank"
                >
                  このVTuberに会いに行く!
                </DetailButton>
              </>
            )}
          </section>
        )}

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

          <Button href="/" role="button">
            オタクタイプを診断してみる
          </Button>
        </Footer>
      </Content>
    </Layout>
  )
}

type Params = {
  slug: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}) => {
  if (params?.slug) {
    const result = await getAnalysisResult(params.slug)

    if (result) {
      return {
        props: {
          result
        },
        revalidate: 30
      }
    }
  }

  return {
    notFound: true,
    revalidate: 5
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const results = await getAnalysisResultIDs()

  return {
    fallback: 'blocking',
    paths: results.map((slug) => `/s/${slug}`)
  }
}
