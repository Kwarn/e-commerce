import React, { useState, useContext } from 'react';
import Backdrop from '../backdrop/Backdrop';
import styled from 'styled-components';
import closeIcon from '../../../assets/closeIcon.png';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledModal = styled.div`
  transform: ${props =>
    props.isShown ? 'translateY(0)' : 'translateY(-100vh)'};
  opacity: ${props => (props.isShown ? '1' : '0')};
  z-index: 500;
  position: fixed;
  background-color: white;
  width: 90%;
  height: 100%;
  max-height: 90%;
  top: 5vh;
  padding: 1px;
  box-sizing: border-box;
  transition: all 0.2s ease-in;
`;

const StyledCloseIcon = styled.img`
  z-index: 1000;
  position: absolute;
  top: -35px;
  right: -35px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: auto;
  height: 100%;
`;

const StyledMainImageWrapper = styled.div`
  margin: auto;
  width: 100%;
  max-width: ${props => (props.isDesktop ? '70%' : '100%;')};
  height: ${props => (props.isDesktop ? '80%' : '100%;')};
  background-image: url(${({ background }) => background});
  background-size: cover;
`;

const StyledThumbnailWrapper = styled.div`
  margin: auto;
  width: 100%;
  height: fit-content;
`;

const StyledThumbnail = styled.img`
  border: ${props => (props.isFocus ? '2px solid green' : 'none')};
  width: 60px;
  height: 60px;
  margin: auto;
`;

const Modal = ({ isVisible, closeFn, children }) => {
  const layouts = useContext(LayoutsContext);
  const [mainImage, setMainImage] = useState(0);
  let images = [];
  let thumbnails = [];
  if (children) {
    images = Array.from(children);
    thumbnails = images.map((image, idx) => (
      <StyledThumbnail
        onClick={() => setMainImage(idx)}
        key={`modal-image-${idx}`}
        src={image}
        alt={`modal-${idx}`}
        isFocus={mainImage === idx}
      />
    ));
  }
  console.log('thumbs', thumbnails);
  console.log(images);
  return (
    <>
      <Backdrop isShown={isVisible} closeFn={closeFn} />
      <StyledModal isShown={isVisible} closeFn={closeFn}>
        <StyledCloseIcon onClick={closeFn} src={closeIcon} alt="close modal" />
        <StyledContent>
          <StyledMainImageWrapper {...layouts} background={images[mainImage]} />
          {thumbnails ? (
            <StyledThumbnailWrapper>{thumbnails}</StyledThumbnailWrapper>
          ) : null}
        </StyledContent>
      </StyledModal>
    </>
  );
};

export default Modal;
