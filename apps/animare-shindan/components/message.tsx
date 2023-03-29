import { type FC, type ReactNode } from 'react'
import styled from 'styled-components'

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

type Props = {
  children: ReactNode
}

const Message: FC<Props> = ({ children }) => {
  return <Container>{children}</Container>
}

export default Message
