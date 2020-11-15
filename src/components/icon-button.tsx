import styled from 'styled-components'

const IconButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  display: inline-flex;
  flex-direction: column;
  height: 1em;
  justify-content: center;
  line-height: 1;
  padding: 0.2em;
  transition: background-color 0.3s ease;
  width: 1em;

  :focus {
    background-color: rgba(255, 255, 255, 0.3);
    outline: 0;
  }
`

export default IconButton
