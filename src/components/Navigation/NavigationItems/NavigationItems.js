import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';
import DrawToggle from '../Sidebar/DrawToggle/DrawToggle';
import { withRouter } from 'react-router-dom';
import contactIcon from '../../../assets/contactIcon.png';

const StyledNavItems = styled.div`
  padding: 0;
  margin: ${props => (props.desktop ? '0 2vw 0 2vw' : '0 5vw 0 5vw')};
  max-width: 100%;
  display: flex;
  flex-direction: row;
  -webkit-justify-content: 'space-between';
  height: ${props =>
    props.mobile
      ? '14vh'
      : props.tablet
      ? '12vh'
      : props.desktop
      ? '10vh'
      : null};
`;
const StyledLogo = styled.img`
  cursor: pointer;
  margin: auto;
  height: ${props => (props.desktop ? '100%' : '80%')};
`;

const StyledContactIcon = styled.img`
  cursor: pointer;
  margin-top: ${props => (props.mobile ? '5vh' : props.tablet ? '3vh' : '2vh')};
  text-align: right;
  height: ${props => (props.desktop ? '65%' : '5vh')};
  width: auto;
`;

const NavigationItems = ({ layoutMode, sideDrawToggleFn, history }) => {
  return (
    <StyledNavItems
      mobile={layoutMode === 'mobile'}
      tablet={layoutMode === 'tablet'}
      desktop={layoutMode === 'desktop'}
    >
      {layoutMode === 'mobile' || layoutMode === 'tablet' ? (
        <DrawToggle layoutMode={layoutMode} toggleFn={sideDrawToggleFn} />
      ) : null}
      <StyledLogo
        desktop={layoutMode === 'desktop'}
        src={logo}
        alt="Twelve Oak"
        onClick={() => history.push('/home')}
      />
      <StyledContactIcon
        mobile={layoutMode === 'mobile'}
        tablet={layoutMode === 'tablet'}
        desktop={layoutMode === 'desktop'}
        onClick={() => history.push('/contact')}
        src={contactIcon}
        alt="contact"
      />
    </StyledNavItems>
  );
};

export default withRouter(NavigationItems);
