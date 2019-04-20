import React, { FunctionComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import GraphBar from '../../components/graph-bar'

const show = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const a = keyframes`
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
`

const Container = styled.section`
  margin: 0 0 20px;
`

const Title = styled.h3`
  background-color: #ececec;
  font-size: 1.4rem;
  margin: 26px -20px 0;
  padding: 8px;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.6rem;
    margin: 28px 0 0;
  }
`

const Body = styled.dl`
  margin: 0;
  padding: 24px 0 20px;

  @media (min-width: 500px) {
    padding: 44px 0 0;
  }
`

const Parameter = styled.div`
  display: flex;
  height: 44px;
  margin: 16px 0;
`

const ParameterLabel = styled.dt`
  align-items: center;
  animation: ${show} 0.4s linear;
  display: flex;
  flex-basis: 60px;
  font-size: 1rem;
  letter-spacing: 0.04rem;
  line-height: 1.4;
  position: relative;

  ::after {
    border-right: 1px solid #ececec;
    content: '';
    display: block;
    height: 76px;
    position: absolute;
    right: 0;
  }
`

const ParameterValue = styled.dd`
  align-items: center;
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  position: relative;
`

type Props = {
  result: AnalysisResult
}

const Graph: FunctionComponent<Props> = ({ result }) => {
  return (
    <Container>
      <Title>オタクパラメーター</Title>

      <Body>
        {result.parameters.map((parameter, i) => (
          <Parameter key={parameter.label}>
            <ParameterLabel>{parameter.label}</ParameterLabel>
            <ParameterValue>
              <GraphBar blue={i === 0} value={parameter.value} />
            </ParameterValue>
          </Parameter>
        ))}
      </Body>
    </Container>
  )
}

export default Graph
