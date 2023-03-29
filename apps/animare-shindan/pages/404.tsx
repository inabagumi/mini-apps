import { type NextPage } from 'next'
import styled from 'styled-components'

import Header from '../components/header'
import Layout from '../components/layout'
import Message from '../components/message'
import SEO from '../components/seo'

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin: 10px 24px 0;
`

const Description = styled.p`
  font-size: 1.2rem;
  margin: 10px 24px 0;
`

const NotFound: NextPage = () => (
  <Layout>
    <SEO title="404 Not found" />

    <Header />

    <Message>
      <Title>404 Not found</Title>

      <Description>
        おさがしのページを見つけることができませんでした。
      </Description>
    </Message>
  </Layout>
)

export default NotFound
