import * as React from 'react'
import { default as styled } from 'styled-components'

const Container = styled.div`
  background-color: #fff;
  border: solid #000 4px;
  border-radius: 20px;
  box-sizing: border-box;
  color: #000;
  margin: 0 auto;
  max-width: 680px;
  padding: 25px 0;
  width: 100%;

  @media (min-width: 500px) {
    margin-top: 50px;
    padding-bottom: 40px;
    padding-top: 40px;
  }
`

export default (({ children }) => (
  <Container>{children}</Container>
)) as React.FunctionComponent
