import styled from '@emotion/styled'
import React, { FunctionComponent, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../components/header'
import Layout from '../components/layout'
import Message from '../components/message'

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin: 10px 24px 0;
`

const Description = styled.p`
  font-size: 1.2rem;
  margin: 10px 24px 0;
`

const NotFound: FunctionComponent = (): ReactElement => (
  <Layout>
    <Helmet defer={false}>
      <title>404 Not found</title>
    </Helmet>

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
