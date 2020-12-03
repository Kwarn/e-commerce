import React, { useState } from 'react';
import Toolbar from '../components/navigation/Toolbar/Toolbar';
import ScrollToTop from './ScrollToTop';
import styled from 'styled-components';
import SideDraw from '../components/navigation/Toolbar/Sidebar/Sidebar';
import Footer from '../components/footer/Footer';

const StyledSiteDimensionsWrapper = styled.div`
  max-width: 100%;
`;

const StyledMainContentContainer = styled.div`
  margin-top: 16vh;
  min-height: 150vh;
  max-width: 100%;
`;

export default function Layout({ children }) {
  const [showSideDraw, setShowSideDraw] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDraw(false);
  };

  const sideDrawToggleHandler = () => {
    setShowSideDraw(!showSideDraw);
  };

  return (
    <StyledSiteDimensionsWrapper>
      <ScrollToTop />
      <Toolbar toggleSideDrawFn={sideDrawToggleHandler} />
      <SideDraw isOpen={showSideDraw} closeFn={sideDrawerClosedHandler} />
      <StyledMainContentContainer>{children}</StyledMainContentContainer>
      <Footer />
    </StyledSiteDimensionsWrapper>
  );
}
