import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  display: inline-block;
  width: fit-content;
  font-size: ${props => (props.fontsize ? `${props.fontsize}em` : '1.2em')};
  height: 100%;
  color: ${props => (props.isDarkText ? '#474747' : '#eee')};
  border: 1px solid ${props => (props.isDarkText ? '#474747' : '#eee')};
  background-color: ${props =>
    props.isDarkText ? 'rgba(255,255,255,0.2)' : 'rgba(0, 0, 0, 0.2)'}; ;
`;

export default function Button({
  text,
  callback,
  emFontSize,
  isDarkText = null,
}) {
  return (
    <StyledButton
      fontsize={emFontSize}
      isDarkText={isDarkText}
      onClick={callback}
    >
      {text}
    </StyledButton>
  );
}
