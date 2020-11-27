import React from 'react';
import styled from 'styled-components';

const StyledTextSection = styled.div`
  display: flex;
  height: 30vh;
  text-align: center;
  margin: auto;
  padding: 0 5% 0 5%;
  font-size: 1.5em;
  white-space: pre-line;
  text-decoration: none;
`;

export default function TextSection({ text }) {
  return (
    <StyledTextSection>
      <p>{text}</p>
    </StyledTextSection>
  );
}
