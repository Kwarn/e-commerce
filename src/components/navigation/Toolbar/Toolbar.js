import React, { useState, useEffect } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styled from 'styled-components';

const StyledToolbar = styled.header`
  display: flex;
  height: 15vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ee;
  z-index: 100;
  transition: top 0.6s;
  top: ${props => (!props.hide ? '0' : '-15vh')};
`;

const Toolbar = () => {
  const [scrollPos, setScrollPos] = useState({
    posY: window.pageYOffset,
    visible: true,
  });

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });

  const scrollHandler = () => {
    const newScrollPos = window.pageYOffset;
    const visible = scrollPos.posY > newScrollPos;
    setScrollPos({ posY: newScrollPos, visible: visible });
  };

  return (
    <StyledToolbar hide={!scrollPos.visible}>
      <nav>
        <NavigationItems />
      </nav>
    </StyledToolbar>
  );
};

export default Toolbar;
