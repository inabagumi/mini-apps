import styled from 'styled-components'

import type { VFC } from 'react'

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

type Props = {
  max: number
  value: number
}

const ProgressBar: VFC<Props> = ({ max, value }) => (
  <Container>
    <Bar style={{ width: `${(value / max) * 100}%` }} />
  </Container>
)

export default ProgressBar
