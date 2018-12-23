import * as React from 'react'
import { Helmet } from 'react-helmet'
import { default as Layout } from '../components/layout'

export default () => (
  <Layout>
    <Helmet>
      <title>診断中...</title>
    </Helmet>

    <p>questions</p>
  </Layout>
)
