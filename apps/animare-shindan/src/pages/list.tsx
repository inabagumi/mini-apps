import { format } from 'date-fns'
import { graphql } from 'gatsby'
import React, { FunctionComponent, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import Copyright from '../components/copyright'
import Header from '../components/header'
import Layout from '../components/layout'
import Message from '../components/message'

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

const Footer = styled.footer`
  background-color: #fff;
  border-top: solid #000 6px;
  margin: 40px -20px 0;
  padding: 20px 12px 32px;
`

type Props = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            date: string
            title: string
          }
          html: string
          id: string
        }
      }[]
    }
  }
}

const List: FunctionComponent<Props> = ({ data }): ReactElement => {
  return (
    <Layout>
      <Helmet>
        <title>お知らせ</title>
      </Helmet>

      <Header />

      <Content>
        <Message>
          {data.allMarkdownRemark.edges.map(edge => (
            <Section key={edge.node.id}>
              <Time dateTime={edge.node.frontmatter.date}>
                {format(new Date(edge.node.frontmatter.date), 'yyyy.MM.dd')}
              </Time>
              <Title>{edge.node.frontmatter.title}</Title>

              <SectionBody
                dangerouslySetInnerHTML={{ __html: edge.node.html }}
              />
            </Section>
          ))}
        </Message>
      </Content>

      <Footer>
        <Copyright />
      </Footer>
    </Layout>
  )
}

export default List

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//versions/[^/]+.md$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
          }
          html
          id
        }
      }
    }
  }
`
