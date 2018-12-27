import * as React from 'react'
import { default as styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  margin: 20px 0 0;
`

const Comment = styled.p`
  background-color: #ececec;
  border-radius: 10px;
  flex: 1;
  margin: 8px 0 0 16px;
  padding: 10px;
  position: relative;

  ::after {
    border-color: transparent #ececec transparent transparent;
    border-style: solid;
    border-width: 7px 10px 7px 0;
    content: '';
    display: block;
    height: 0;
    left: -10px;
    position: absolute;
    top: 16px;
    width: 0;
  }

  @media (min-width: 500px) {
    margin-top: 20px;
  }
`

const Avatar = styled.figure`
  margin: 2px 0 0;

  svg {
    border: solid #14b9ff 2px;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: 56px;
    width: 56px;
  }

  @media (min-width: 500px) {
    svg {
      border-weight: 4px;
      height: 80px;
      text-align: center;
      width: 80px;
    }
  }
`

const Caption = styled.figcaption`
  font-size: 1rem;
`

export default React.memo((() => (
  <Container>
    <Avatar>
      <svg height="56" width="56">
        <use xlinkHref="#nanashi" />
      </svg>

      <Caption>黒猫 ななし</Caption>
    </Avatar>

    <Comment>あにまーれは仲良しです♩</Comment>
  </Container>
)) as React.FunctionComponent)
