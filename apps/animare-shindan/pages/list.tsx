import { format } from 'date-fns'
import type { GetStaticProps } from 'next'
import type { FC } from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import Layout from '../components/layout'
import Message from '../components/message'
import SEO from '../components/seo'
import { convert } from '../utils/markdown'
import { Release, getAllReleases } from '../utils/releases'

const Content = styled.main`
  padding-top: 30px;
`

const Section = styled.section`
  box-sizing: border-box;
  padding: 30px 0 0;
  margin: 30px 24px 0;

  :first-of-type {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  @media (min-width: 500px) {
    border-top: solid #ececec 2px;
    margin: 50px auto 0;
    max-width: 500px;
    padding: 50px 24px 0;
    width: 100%;
  }
`

const Title = styled.h2`
  color: #0588f7;
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 0.04rem;
  line-height: 1.4;
  margin: 0 0 6px;

  @media (min-width: 500px) {
    font-size: 3.6rem;
    margin-bottom: 12px;
  }
`

const Time = styled.time`
  display: block;
  font-size: 1.3rem;
  line-height: 1;

  @media (min-width: 500px) {
    font-size: 1.4rem;
  }
`

const SectionBody = styled.div`
  p {
    font-size: 1.4rem;
    line-height: 1.6;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 12px 0 0;
    padding: 0;
  }

  li {
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    width: 50%;
  }

  li::before {
    color: #0588f7;
    content: 'arrow_right';
    display: block;
    font-family: Material Icons;
    font-size: 2rem;
    margin-left: -5px;
  }

  @media (min-width: 500px) {
    ul {
      margin-top: 18px;
    }
  }
`

type Props = {
  releases: Release[]
}

const List: FC<Props> = ({ releases }) => {
  return (
    <Layout>
      <SEO title="お知らせ" />

      <Header />

      <Content>
        <Message>
          {releases.map((release) => {
            return (
              <Section key={release.slug}>
                <Time dateTime={release.date}>
                  {format(new Date(release.date), 'yyyy.MM.dd')}
                </Time>
                <Title>{release.title}</Title>

                <SectionBody
                  dangerouslySetInnerHTML={{ __html: release.content }}
                />
              </Section>
            )
          })}
        </Message>
      </Content>
    </Layout>
  )
}

export default List

export const getStaticProps: GetStaticProps<Props> = async () => {
  const releases = await getAllReleases()
  const parsedReleases = await Promise.all(
    releases.map((release) =>
      convert(release.content).then((content) => ({
        ...release,
        content
      }))
    )
  )

  return {
    props: {
      releases: parsedReleases
    },
    revalidate: 600
  }
}
