import React from 'react';
import styled from 'styled-components';

const StyledTextSection = styled.div`
  overflow: auto;
  width: 100%;
  h1,
  h2,
  h3,
  h4,
  p {
    text-align: center;
  }
`;

export default function TextSection({ children }) {
  return <StyledTextSection>{children}</StyledTextSection>;
}
