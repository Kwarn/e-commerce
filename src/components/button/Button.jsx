import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 1.2em;
  width: 100%;
  height: 100%;
  color: white;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function Button({ text }) {
  return <StyledButton>{text}</StyledButton>;
}
