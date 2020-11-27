import React, { useState } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';

const StyledNavItems = styled.ul`
  padding: 0;
  margin: 0 5% 0 5%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 15vh;
  .navItem {
    border-bottom: ${props => (props.active ? '4px solid #474747' : '')};
  }
`;
const StyledLogo = styled.img`
  margin: auto;
  height: 80%;
`;

const NavigationItems = () => {
  const [activeClass, setActiveClass] = useState({
    home: false,
    contact: false,
  });

  const setActiveClassHandler = id => {
    if (id === 'home') {
      setActiveClass({ home: true, contact: false });
    } else {
      setActiveClass({ home: false, contact: true });
    }
  };

  return (
    <StyledNavItems>
      <NavigationItem
        className="navItem"
        onClick={() => setActiveClass('home')}
        active={activeClass.home}
        link="/"
      >
        Home
      </NavigationItem>
      <StyledLogo src={logo} alt="Twelve Oak" />
      <NavigationItem
        className="navItem"
        onClick={() => setActiveClass('contact')}
        active={activeClass.contact}
        link="/contact"
      >
        Contact
      </NavigationItem>
    </StyledNavItems>
  );
};

export default NavigationItems;
