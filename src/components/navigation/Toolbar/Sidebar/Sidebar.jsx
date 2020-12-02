import React, { useEffect } from 'react';
import NavigationItems from '../../NavigationItems/NavigationItems';
import Backdrop from '../../../UI/backdrop/Backdrop';
import Logo from '../../../../assets/logo.png';
import styled, { css } from 'styled-components';
import { useLocation, withRouter } from 'react-router-dom';
import background from '../../../../assets/sidebarBackground.jpg';
import closeButton from '../../../../assets/closeButton.png';

const StyledSideDraw = styled.div`
  position: relative;
  background-image: url(${background});
  background-size: cover;
  position: fixed;
  width: 280px;
  max-width: 80%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  .logo {
    text-align: center;
    height: 100px;
    width: auto;
  }

  ${props =>
    props.show &&
    css`
      transform: translateX(0);
    `};
  ${props =>
    !props.show &&
    css`
      transform: translateX(-100%);
    `}
`;

const StyledCloseButton = styled.img`
  cursor: pointer;
  height: 3vh;
  width: auto;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledMenuContainer = styled.div`
  margin-top: 20%;
`;

const StyledMenuItem = styled.div`
  margin: auto;
  width: 80%;
  height: 30px;
  h1 {
    color: white;
    text-align: center;
    font-size: 1.3em;
    font-weight: lighter;
  }
  border-bottom: 4px solid ${props => (props.isCurrentPage ? '#eee' : 'none')};
`;

const SideDraw = ({ isOpen, closeFn, history }) => {
  const userPageLocation = useLocation();

  const changeRouteHandler = pageId => {
    history.push(`/${pageId}`);
  };

  return (
    <>
      <Backdrop show={isOpen} closeFn={closeFn} />
      <StyledSideDraw onClick={closeFn} show={isOpen}>
        <StyledCloseButton src={closeButton} alt="close"></StyledCloseButton>
        <StyledMenuContainer>
          <StyledMenuItem
            onClick={() => changeRouteHandler('products')}
            isCurrentPage={userPageLocation.pathname === '/products'}
          >
            <h1>OUR PRODUCTS</h1>
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => changeRouteHandler('about')}
            isCurrentPage={userPageLocation.pathname === '/about'}
          >
            <h1>ABOUT</h1>
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => changeRouteHandler('contact')}
            isCurrentPage={userPageLocation.pathname === '/contact'}
          >
            <h1>CONTACT</h1>
          </StyledMenuItem>
        </StyledMenuContainer>
      </StyledSideDraw>
    </>
  );
};

export default withRouter(SideDraw);

// <div>
//   <img
//     className="logo"
//     src={Logo}
//     alt="Twelve Oak"
//     onClick={() => history.push('/home')}
//   />
// </div>;