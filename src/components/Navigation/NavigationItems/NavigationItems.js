import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';
import DrawToggle from '../Sidebar/DrawToggle/DrawToggle';
import { withRouter } from 'react-router-dom';
import contactIcon from '../../../assets/contactIcon.png';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledNavItems = styled.div`
  position: relative;
  padding: 0;
  width: ${props => (props.isDesktop ? '100%' : 'auto')};
  max-width: 100%;
  display: ${props => (props.isDesktop ? 'inline-flex' : 'flex')};
  justify-content: space-between;
  height: ${props =>
    props.isMobile
      ? '14vh'
      : props.isTablet
      ? '12vh'
      : props.isDesktop
      ? '10vh'
      : null};
`;
const StyledLogo = styled.img`
  cursor: pointer;
  margin: auto;
  max-height: ${props => (props.isDesktop ? '100%' : '80%')};
  ${({ isDesktop }) =>
    isDesktop &&
    `position: absolute;
    left: 20px
  `}
`;

const StyledContactIcon = styled.img`
  cursor: pointer;
  margin-top: ${props =>
    props.isMobile ? '5vh' : props.isTablet ? '4vh' : '2vh'};
  margin-right: ${props => (props.isDesktop ? 'auto' : '5vw')};
  height: ${props => (props.isDesktop ? '60%' : '5vh')};
  ${({ isDesktop }) =>
    isDesktop &&
    `position: absolute;
    right: 20px
  `}
  }
`;

const NavigationItems = ({ sideDrawToggleFn, history }) => {
  const layouts = useContext(LayoutsContext);
  const { isDesktop } = layouts;

  const drawToggleComponent = <DrawToggle toggleFn={sideDrawToggleFn} />;
  const logoComponent = (
    <StyledLogo
      isDesktop={isDesktop}
      src={logo}
      alt="Twelve Oak"
      onClick={() => history.push('/home')}
    />
  );
  const contactIconComponent = (
    <StyledContactIcon
      {...layouts}
      onClick={() => history.push('/contact')}
      src={contactIcon}
      alt="contact"
    />
  );
  return (
    <StyledNavItems {...layouts} className={isDesktop ? 'isDesktop' : ''}>
      {isDesktop ? logoComponent : drawToggleComponent}
      {isDesktop ? null : logoComponent}
      {contactIconComponent}
    </StyledNavItems>
  );
};

export default withRouter(NavigationItems);
