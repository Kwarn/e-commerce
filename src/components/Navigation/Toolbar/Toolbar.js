import React, { useState, useEffect } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styled from 'styled-components';

const StyledVariableToolbar = styled.header`
  min-width: 100%;
  height: ${props => (props.mobile ? '14vh' : props.tablet ? '12vh' : '10vh')};
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
  transition: top 0.6s;
  top: ${props => (!props.hide ? '0' : '-15vh')};
`;

const Toolbar = ({ toggleSideDrawFn, layoutMode }) => {
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

  return (
    <StyledVariableToolbar
      mobile={layoutMode === 'mobile'}
      tablet={layoutMode === 'tablet'}
      desktop={layoutMode === 'desktop'}
      hide={!scrollPos.visible}
    >
      <NavigationItems
        layoutMode={layoutMode}
        sideDrawToggleFn={
          layoutMode === 'mobile' || layoutMode === 'tablet'
            ? toggleSideDrawFn
            : null
        }
      />
    </StyledVariableToolbar>
  );
};

export default Toolbar;
