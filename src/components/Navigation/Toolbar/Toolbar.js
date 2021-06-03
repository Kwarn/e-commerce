import React, { useContext } from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import ExtraNavItems from '../NavigationItems/ExtraNavItems';
import LogoNavItem from '../NavigationItems/LogoNavItem';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledNavBar = styled.header`
  z-index: 10;
  display: flex;
  justify-content: center;
  width: ${props => (props.isDesktop ? '80%' : '100%')};
  position: fixed;
  right: 0;
  top: ${props => (props.isDesktop ? (props.isMainNavBar ? '10vh' : 0) : 0)};
  background-color: white;
  transition: top 0.6s;
  height: ${props =>
    props.isMobile ? '14vh' : props.isTablet ? '12vh' : '10vh'};

  top: ${props =>
    props.isDesktop
      ? props.isMainNavBar
        ? !props.hide
          ? '10vh'
          : 0
        : !props.hide
        ? 0
        : '-10vh'
      : props.isTablet
      ? !props.hide
        ? 0
        : '-12vh'
      : !props.hide
      ? 0
      : '-14vh'};
`;

const StyledLogoNavBar = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 100;
  transition: top 0.6s;
  height: 20vh;
  transition: height 0.6s;
  top: ${props => (!props.hide ? 0 : 0)};
  height: ${props => (!props.hide ? '20vh' : '10vh')};
`;

const Toolbar = ({ toggleSideDrawFn, toggleLoginCallback, scrollPos }) => {
  const layouts = useContext(LayoutsContext);
  const { isDesktop } = layouts;

  const navbar = layouts.isDesktop ? (
    <>
      <StyledLogoNavBar hide={!scrollPos.visible}>
        <LogoNavItem />
      </StyledLogoNavBar>
      <StyledNavBar isMainNavBar={true} {...layouts} hide={!scrollPos.visible}>
        <NavigationItems
          toggleLoginCallback={toggleLoginCallback}
          sideDrawToggleFn={!isDesktop ? toggleSideDrawFn : null}
        />
      </StyledNavBar>
      <StyledNavBar {...layouts} hide={!scrollPos.visible}>
        <ExtraNavItems />
      </StyledNavBar>
    </>
  ) : (
    <StyledNavBar isMainNavBar={true} {...layouts} hide={!scrollPos.visible}>
      <NavigationItems
        sideDrawToggleFn={!isDesktop ? toggleSideDrawFn : null}
      />
    </StyledNavBar>
  );

  return navbar;
};

export default Toolbar;
