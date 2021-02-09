import React, { useState, useEffect } from 'react';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import ScrollToTop from './ScrollToTop';
import styled from 'styled-components';
import SideDraw from '../components/Navigation/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import LayoutsContext from './LayoutsContext';
import LoginNavItem from '../components/Navigation/NavigationItems/LoginNavItem';

const StyledMainContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props =>
    props.isMobile ? '14vh' : props.isTablet ? '12vh' : '10vh'};
  max-width: 100%;
  min-height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
  background-color: #eee;
`;

export default function Layout({ children }) {
  const [showSideDraw, setShowSideDraw] = useState(false);
  const yScrollBarWidth = window.innerWidth - document.body.clientWidth;
  const [showLogin, setShowLogin] = useState(false);
  const toggleLogin = () => setShowLogin(!showLogin);

  // Controls Navbar animations
  const [scrollPos, setScrollPos] = useState({
    posY: window.pageYOffset,
    visible: true,
  });

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  const scrollHandler = () => {
    const newScrollPos = window.pageYOffset;
    const visible = scrollPos.posY > newScrollPos;
    setScrollPos({ posY: newScrollPos, visible: visible });
  };

  //Strange bug: Scrollbar width not detected on init when trying to refactor onResize() into useEffect
  //Suspect something to do with document.body not being available (?)
  //Low priority

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
      <Toolbar
        scrollPos={scrollPos}
        toggleLoginCallback={toggleLogin}
        toggleSideDrawFn={sideDrawToggleHandler}
      />
      {layoutModeProps.isDesktop ? (
        <LoginNavItem
          scrollPos={scrollPos}
          isHidden={!showLogin}
          toggleCallback={() => toggleLogin()}
        />
      ) : null}
      <SideDraw isOpen={showSideDraw} closeFn={sideDrawerClosedHandler} />
      <StyledMainContentContainer {...layoutModeProps}>
        {children}
      </StyledMainContentContainer>
      <Footer />
    </LayoutsContext.Provider>
  );
}
