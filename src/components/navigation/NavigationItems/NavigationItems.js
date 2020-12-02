import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';
import DrawToggle from '../Toolbar/Sidebar/DrawToggle/DrawToggle';
import { withRouter } from 'react-router-dom';
import contactIcon from '../../../assets/contactIcon.png';

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

const StyledContactIcon = styled.img`
  cursor: pointer;
  margin-top: 6vh;
  height: 5vh;
  width: auto;
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
      <StyledContactIcon
        onClick={() => history.push('/contact')}
        src={contactIcon}
        alt="contact"
      />
    </StyledNavItems>
  );
};

export default withRouter(NavigationItems);
