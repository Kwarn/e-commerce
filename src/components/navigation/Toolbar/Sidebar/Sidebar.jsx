import React from 'react';
import NavigationItems from '../../NavigationItems/NavigationItems';
import Backdrop from '../../../UI/backdrop/Backdrop';
import Logo from '../../../../assets/logo.png';
import styled, { css } from 'styled-components';

const StyledSideDraw = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  .logo {
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

const sideDraw = ({ isOpen, closeFn }) => {
  return (
    <>
      <Backdrop show={isOpen} closeFn={closeFn} />
      <StyledSideDraw onClick={closeFn} show={isOpen}>
        <div>
          <img className="logo" src={Logo} alt="Twelve Oak" />
        </div>
        <div>Products</div>
        <div>Contact</div>
      </StyledSideDraw>
    </>
  );
};

export default sideDraw;
