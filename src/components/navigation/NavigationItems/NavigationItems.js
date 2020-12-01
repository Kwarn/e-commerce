import React, { useState } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';
import DrawToggle from '../Toolbar/Sidebar/DrawToggle/DrawToggle';
import { withRouter } from 'react-router-dom';

const StyledNavItems = styled.ul`
  padding: 0;
  margin: 0 5% 0 5%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 15vh;
`;
const StyledLogo = styled.img`
  cursor: pointer;
  margin: auto;
  height: 80%;
`;

const NavigationItems = ({ sideDrawToggleFn, history }) => {
  return (
    <StyledNavItems>
      <DrawToggle toggleFn={sideDrawToggleFn} />
      <StyledLogo
        src={logo}
        alt="Twelve Oak"
        onClick={() => history.push('/home')}
      />
      <NavigationItem link="/contact">Contact</NavigationItem>
    </StyledNavItems>
  );
};

export default withRouter(NavigationItems);
