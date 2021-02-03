import React, { useState, useEffect } from 'react';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import ScrollToTop from './ScrollToTop';
import styled from 'styled-components';
import SideDraw from '../components/Navigation/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import LayoutsContext from './LayoutsContext';

const StyledMainContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props =>
    props.isMobile ? '14vh' : props.isTablet ? '12vh' : '20vh'};
  max-width: 100%;
  min-height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '80vh'};
  background-color: #ccc;
`;

export default function Layout({ children }) {
  const [showSideDraw, setShowSideDraw] = useState(false);
  const yScrollBarWidth = window.innerWidth - document.body.clientWidth;

  //Strange bug detecting scrollbar on inital load when trying to refactor this code

  const [layoutModeProps, setLayoutModeProps] = useState(
    window.innerWidth > 1024
      ? {
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          yScrollBarWidth,
        }
      : window.innerWidth > 450 && window.innerWidth < 1025
      ? {
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          yScrollBarWidth,
        }
      : {
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          yScrollBarWidth,
        }
  );

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onResize = () => {
    setLayoutModeProps(
      window.innerWidth > 1024
        ? {
            isMobile: false,
            isTablet: false,
            isDesktop: true,
            yScrollBarWidth,
          }
        : window.innerWidth > 450 && window.innerWidth < 1025
        ? {
            isMobile: false,
            isTablet: true,
            isDesktop: false,
            yScrollBarWidth,
          }
        : {
            isMobile: true,
            isTablet: false,
            isDesktop: false,
            yScrollBarWidth,
          }
    );
  };

  const sideDrawerClosedHandler = () => {
    setShowSideDraw(false);
  };

  const sideDrawToggleHandler = () => {
    setShowSideDraw(!showSideDraw);
  };

  return (
    <LayoutsContext.Provider value={layoutModeProps}>
      <ScrollToTop />
      <Toolbar toggleSideDrawFn={sideDrawToggleHandler} />
      <SideDraw isOpen={showSideDraw} closeFn={sideDrawerClosedHandler} />
      <StyledMainContentContainer {...layoutModeProps}>
        {children}
      </StyledMainContentContainer>
      <Footer />
    </LayoutsContext.Provider>
  );
}
