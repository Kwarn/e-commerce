import React, { useState, useEffect, useContext } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledVariableToolbar = styled.header`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 100;
  transition: top 0.6s;
  height: ${props =>
    props.isMobile ? '14vh' : props.isTablet ? '12vh' : '10vh'};
  top: ${props => (!props.hide ? '0' : '-15vh')};
`;

const Toolbar = ({ toggleSideDrawFn }) => {
  const layouts = useContext(LayoutsContext);
  const { isDesktop } = layouts;
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
    <StyledVariableToolbar {...layouts} hide={!scrollPos.visible}>
      <NavigationItems
        sideDrawToggleFn={!isDesktop ? toggleSideDrawFn : null}
      />
    </StyledVariableToolbar>
  );
};

export default Toolbar;
