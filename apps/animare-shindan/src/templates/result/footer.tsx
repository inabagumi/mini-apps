import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'
import Copyright from '../../components/copyright'

const Base = styled.footer`
  background-color: #212121;
  margin: 56px -20px 0;

  @media (min-width: 500px) {
    margin-left: 0;
    margin-right: 0;
  }
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 680px;
  padding: 36px 20px 32px;

  @media (min-width: 500px) {
    padding: 48px 20px 44px;
  }
`

const Footer: FunctionComponent = (): ReactElement => (
  <Base>
    <Content>
      <Copyright invert />
    </Content>
  </Base>
)

export default Footer
