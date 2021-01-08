import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  display: inline-block;
  width: fit-content;
  font-size: 1.2em;
  height: 100%;
  color: white;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function Button({ text, callback }) {
  return <StyledButton onClick={callback}>{text}</StyledButton>;
}
