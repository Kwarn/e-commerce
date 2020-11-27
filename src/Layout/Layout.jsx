import Toolbar from '../components/navigation/Toolbar/Toolbar';
import React from 'react';
import styled from 'styled-components';

const StyledSiteDimensionsWrapper = styled.div`
  max-width: 100%;
`;

const StyledMainContentContainer = styled.div`
  margin-top: 15vh;
  min-height: 150vh;
  max-width: 100%;
`;

export default function Layout({ children }) {
  return (
    <StyledSiteDimensionsWrapper>
      <Toolbar></Toolbar>
      <StyledMainContentContainer>{children}</StyledMainContentContainer>
    </StyledSiteDimensionsWrapper>
  );
}
