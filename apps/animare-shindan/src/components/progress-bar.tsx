import styled from '@emotion/styled'
import React, { FunctionComponent, ReactElement } from 'react'

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  height: 12px;
`

const Bar = styled.div`
  background-color: #fff263;
  border-radius: 6px;
  height: 12px;
  transition: width 0.3s ease-out;
`

interface Props {
  max: number
  value: number
}

const ProgressBar: FunctionComponent<Props> = ({
  max,
  value
}): ReactElement => (
  <Container>
    <Bar style={{ width: `${(value / max) * 100}%` }} />
  </Container>
)

export default ProgressBar
