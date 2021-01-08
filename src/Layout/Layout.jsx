import React, { useState, useEffect } from 'react';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import ScrollToTop from './ScrollToTop';
import styled from 'styled-components';
import SideDraw from '../components/Navigation/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';

const StyledSiteDimensionsWrapper = styled.div`
  max-width: 100%;
`;

const StyledMainContentContainer = styled.div`
  margin-top: 16vh;
  max-width: 100%;
  background-color: #eee;
`;

export default function Layout({ children }) {
  const [showSideDraw, setShowSideDraw] = useState(false);
  const [layoutMode, setLayoutMode] = useState('');

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  const onResize = () => {
    setLayoutMode(
      window.innerWidth > 1024
        ? 'desktop'
        : window.innerWidth > 450 && window.innerWidth < 1025
        ? 'tablet'
        : 'mobile'
    );
  };

  const sideDrawerClosedHandler = () => {
    setShowSideDraw(false);
  };

  const sideDrawToggleHandler = () => {
    setShowSideDraw(!showSideDraw);
  };

  return (
    <StyledSiteDimensionsWrapper>
      <ScrollToTop />
      <Toolbar
        layoutMode={layoutMode}
        toggleSideDrawFn={sideDrawToggleHandler}
      />
      <SideDraw isOpen={showSideDraw} closeFn={sideDrawerClosedHandler} />
      <StyledMainContentContainer>{children}</StyledMainContentContainer>
      <Footer />
    </StyledSiteDimensionsWrapper>
  );
}
