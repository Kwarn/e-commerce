import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../backdrop/Backdrop';
import styled from 'styled-components';
import closeIcon from '../../../assets/whiteCross.png';

const StyledModal = styled.div`
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-100vh)')};
  opacity: ${props => (props.show ? '1' : '0')};
  z-index: 500;
  position: fixed;
  left: 10%;
  top: 20%;
  background-color: white;
  width: 80%;
  max-width: 800px;
  max-height: 800px;
  padding: 16px;
  box-sizing: border-box;
  transition: all 0.3s ease-in;
`;
const StyledCloseIcon = styled.div`
  position: absolute;
  top: -35px;
  right: -35px;
  height: 30px;
  width: auto;
  cursor: pointer;
`;
const StyledContent = styled.div`
  text-align: center;
  width: auto;
  height: 100%;
  img {
    max-height: 500px;
    max-width: 100%;
    width: auto;
  }
`;

const Modal = ({ show, hide, children }) => {
  return (
    <>
      <Backdrop show={show} hide={hide} />
      <Modal show={show} hide={hide}>
        <StyledCloseIcon onClick={hide} src={closeIcon} alt="close modal" />
        <div className={classes.Content}>{children}</div>
      </Modal>
    </>
  );
};

export default Modal;
