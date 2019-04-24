import styled from '@emotion/styled'
import React, { FunctionComponent, memo } from 'react'

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
      border-width: 4px;
      height: 80px;
      text-align: center;
      width: 80px;
    }
  }
`

const Caption = styled.figcaption`
  color: #000;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 4px;
  text-align: center;
`

const ResultEvaluation: FunctionComponent = () => (
  <Container>
    <Avatar>
      <svg height="56" width="56">
        <use xlinkHref="#nanashi" />
      </svg>

      <Caption>黒猫 ななし</Caption>
    </Avatar>

    <Comment>あにまーれは仲良しです♩</Comment>
  </Container>
)

export default memo(ResultEvaluation)
