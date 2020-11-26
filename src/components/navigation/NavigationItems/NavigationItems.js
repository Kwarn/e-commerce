import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';

const StyledNavItems = styled.ul`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  height: 15vh;
`;
const StyledLogo = styled.img`
  height: 80%;
  width: auto;
`;

const NavigationItems = () => {
  return (
    <StyledNavItems>
      <NavigationItem link="/">Home</NavigationItem>
      <StyledLogo src={logo} alt="Twelve Oak" />
      <NavigationItem link="/contact">Contact</NavigationItem>
    </StyledNavItems>
  );
};

export default NavigationItems;
