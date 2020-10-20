import type { FC } from 'react'
import styled from 'styled-components'
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
    background-image: url('${nanashi}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    display: block;
    height: 63px;
    left: 0;
    position: absolute;
    right: 0;
    top: -63px;
  }
`

type Props = {
  className?: string
}

const MessageWindow: FC<Props> = ({ children, className }) => (
  <Root className={className}>{children}</Root>
)

export default MessageWindow
