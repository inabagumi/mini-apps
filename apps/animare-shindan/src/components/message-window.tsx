import styled from '@emotion/styled'
import React, { FunctionComponent, ReactElement } from 'react'
import nanashi from '../assets/nanashi.svg'

const Root = styled.div`
  background-color: #fff;
  border: solid #000 3px;
  border-radius: 20px;
  box-sizing: border-box;
  margin-top: 52px;
  position: relative;

  ::before {
    background-color: transparent;
    background-image: url("${nanashi}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    display: block;
    height: 63px;
    left: 0;
    position: absolute;
    right: 0;
    top: -63px;
  }
`

interface Props {
  className?: string
}

const MessageWindow: FunctionComponent<Props> = ({
  children,
  className
}): ReactElement => <Root className={className}>{children}</Root>

export default MessageWindow
