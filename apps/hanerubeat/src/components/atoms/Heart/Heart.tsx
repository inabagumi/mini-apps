import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import React, { FC } from 'react'
import { ReactComponent as HeartIcon } from './Heart.svg'

const beat = keyframes`
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
  }
`

const AnimatedHeart = styled(HeartIcon)`
  animation: ${beat} 0.8s ease-in-out infinite;
  color: #fff59d;
  display: block;
  fill: currentColor;
  height: auto;
  width: 100%;
`

const Heart: FC = () => <AnimatedHeart />

export default Heart
