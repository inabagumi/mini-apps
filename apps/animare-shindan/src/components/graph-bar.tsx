import React from 'react'
import type { FC } from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  position: absolute;
  width: 100%;
`

const show = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const progress = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
`

const Bar = styled.div<{ blue: boolean }>`
  animation: ${show} 0.4s linear, ${progress} 1.8s ease-in;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.15) 0.75rem,
    transparent 0.75rem,
    transparent 1.5rem
  );
  background-color: ${(props) => (props.blue ? '#14b9ff' : '#d1d1d1')};
  border-radius: 0 3px 3px 0;
  height: 44px;
`

type Props = {
  blue: boolean
  value: number
}

const GraphBar: FC<Props> = ({ blue, value }) => {
  return (
    <Container style={{ width: `${value * 100}%` }}>
      <Bar blue={blue} />
    </Container>
  )
}

export default GraphBar
