import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'

const Base = styled.p<{ invert: boolean }>`
  color: ${props => props.invert ? '#595959' : 'inherit'};
  font-size: 1.3rem;
  margin: 28px 0 0;
  letter-spacing: 0.04rem;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }
`

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`

type Props = {
  invert?: boolean
}

const Copyright: FunctionComponent<Props> = ({ invert }): ReactElement => (
  <Base invert={invert}>
    {'Copyright 2018-2019 '}
    <Link href="https://haneru.dev/" rel="noopener noreferrer" target="_blank">
      Haneru Developers
    </Link>
  </Base>
)

export default Copyright
