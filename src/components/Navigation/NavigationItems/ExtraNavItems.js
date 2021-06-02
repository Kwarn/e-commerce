import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  color: #ad5d32;
  margin: 6vh 250px 0 0;
  display: flex;
`;

const StyledLink = styled.p`
  margin: auto;
`;
const StyledDivider = styled.h3`
  margin: auto 10px auto 10px;
`;

export default function ExtraNavItems() {
  return (
    <StyledContainer>
      <StyledLink>Where to find us</StyledLink>
      <StyledDivider>|</StyledDivider>
      <StyledLink>Speak with us: 09090897878</StyledLink>
    </StyledContainer>
  );
}
