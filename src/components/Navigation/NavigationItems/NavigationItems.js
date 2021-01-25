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
`;

const StyledDesktopNavItemsContainer = styled.div`
  background-color: 'green';
  position: absolute;
  left: 200px;
  height: 100%;
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const StyledDesktopNavItem = styled.h3`
  cursor: pointer;
  margin: auto;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid #474747;
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

  const desktopNavItemsContent = [
    { title: 'PRODUCTS', link: 'products' },
    { title: 'HELP', link: 'help' },
    { title: 'CONTACT', link: 'contact' },
  ];

  const DesktopNavItems = desktopNavItemsContent.map(content => (
    <StyledDesktopNavItem
      key={content.title}
      onClick={() => history.push(`/${content.link}`)}
    >
      {content.title}
    </StyledDesktopNavItem>
  ));

  return (
    <StyledNavItems {...layouts} className={isDesktop ? 'isDesktop' : ''}>
      {isDesktop ? logoComponent : drawToggleComponent}
      {isDesktop ? (
        <StyledDesktopNavItemsContainer>
          {DesktopNavItems}
        </StyledDesktopNavItemsContainer>
      ) : null}
      {isDesktop ? null : logoComponent}
      {isDesktop ? null : contactIconComponent}
    </StyledNavItems>
  );
};

export default withRouter(NavigationItems);
