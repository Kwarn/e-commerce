import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  color: #ad5d32;
  margin: 6vh 250px 0 0;
  display: flex;
`;

const StyledLink = styled.a`
  margin: auto;
  color: inherit;
`;
const StyledDivider = styled.h3`
  margin: auto 10px auto 10px;
`;

export default function ExtraNavItems() {
  return (
    <StyledContainer>
      <StyledLink href="https://goo.gl/maps/9n7kboFp7JqX23WB8" target="_blank">
        How to find us
      </StyledLink>
      <StyledDivider>|</StyledDivider>
      <StyledLink>Speak with us: 03333 110 888</StyledLink>
    </StyledContainer>
  );
}
