import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as styled } from 'styled-components'
import { default as Header } from '../components/header'
import { default as Layout } from '../components/layout'
import { default as Message } from '../components/message'

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin: 10px 24px 0;
`

const Description = styled.p`
  font-size: 1.2rem;
  margin: 10px 24px 0;
`

export default () => (
  <Layout>
    <Helmet>
      <title>404 Not found</title>
    </Helmet>

    <Header />

    <Message>
      <Title>404 Not found</Title>

      <Description>おさがしのページを見つけることができませんでした。</Description>
    </Message>
  </Layout>
)
