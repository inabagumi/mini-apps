import * as React from 'react'
import { default as styled } from 'styled-components'

interface Props {
  max: number
  value: number
}

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  height: 12px;
`

const Bar = styled.div`
  background-color: #fff263;
  border-radius: 6px;
  height: 12px;
`

export default ({ max, value }: Props) => (
  <Container>
    <Bar style={{ width: `${(value / max) * 100}%` }} />
  </Container>
)
