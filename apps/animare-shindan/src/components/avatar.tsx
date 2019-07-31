import styled from '@emotion/styled'
import React, { FC } from 'react'

const Image = styled.img`
  border: solid #14b9ff 2px;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  height: 56px;
  width: 56px;

  @media (min-width: 500px) {
    border-width: 4px;
    height: 80px;
    text-align: center;
    width: 80px;
  }
`

interface Props {
  src: string
}

const Avatar: FC<Props> = ({ src }) => {
  return <Image alt="" height="128" src={src} width="128" />
}

export default Avatar
