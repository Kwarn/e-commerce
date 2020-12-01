import Toolbar from '../components/navigation/Toolbar/Toolbar';
import React from 'react';
import ScrollToTop from './ScrollToTop';
import styled from 'styled-components';

const StyledSiteDimensionsWrapper = styled.div`
  max-width: 100%;
`;

const StyledMainContentContainer = styled.div`
  margin-top: 16vh;
  min-height: 150vh;
  max-width: 100%;
`;

export default function Layout({ children }) {
  return (
    <StyledSiteDimensionsWrapper>
      <ScrollToTop />
      <Toolbar />
      <StyledMainContentContainer>{children}</StyledMainContentContainer>
    </StyledSiteDimensionsWrapper>
  );
}
