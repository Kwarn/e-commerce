import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  color: #ad5d32;
  margin: 6vh auto auto auto;
  display: flex;
  justify-content: space-evenly;
  min-width: 700px;
`;

const StyledLink = styled.p`
  margin: auto;
`;
const StyledDivider = styled.h3`
  margin: auto;
`;

export default function ExtraNavItems() {
  return (
    <StyledContainer>
      <StyledLink>Order your free samples</StyledLink>
      <StyledDivider>|</StyledDivider>
      <StyledLink>Visit us</StyledLink>
      <StyledDivider>|</StyledDivider>
      <StyledLink>Book an online consultation</StyledLink>
      <StyledDivider>|</StyledDivider>
      <StyledLink>Speak with us: 09090897878</StyledLink>
    </StyledContainer>
  );
}
