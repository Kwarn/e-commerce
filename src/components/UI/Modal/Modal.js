import React, { useState, useContext } from 'react';
import Backdrop from '../backdrop/Backdrop';
import styled from 'styled-components';
import closeIcon from '../../../assets/closeIcon.png';
import swipeIcon from '../../../assets/swipeIcon.png';
import LayoutsContext from '../../../Layout/LayoutsContext';
import { useSwipeable } from 'react-swipeable';

const StyledModal = styled.div`
  transform: ${props =>
    props.isShown ? 'translateY(0)' : 'translateY(-100vh)'};
  opacity: ${props => (props.isShown ? '1' : '0')};
  z-index: 500;
  position: fixed;
  background-color: #fff;
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
  position: relative;
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
  margin: 5px;
  cursor: pointer;
`;

const StyledSwipeIcon = styled.img`
  position: absolute;
  bottom: 0px;
  left: calc(50% - 35px);
  width: 70px;
  height: 70px;
`;

const Modal = ({ isVisible, closeFn, children }) => {
  if (isVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  const layouts = useContext(LayoutsContext);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  let images = [];
  let thumbnails = [];
  if (children) {
    images = Array.from(children);
    thumbnails = images.map((image, idx) => (
      <StyledThumbnail
        onClick={() => setMainImageIndex(idx)}
        key={`modal-image-${idx}`}
        src={image}
        alt={`modal-${idx}`}
        isFocus={mainImageIndex === idx}
      />
    ));
  }

  const goRight = () => {
    if (mainImageIndex === images.length - 1) {
      setMainImageIndex(0);
    } else {
      setMainImageIndex(mainImageIndex + 1);
    }
  };

  const goLeft = () => {
    if (mainImageIndex === 0) {
      setMainImageIndex(images.length - 1);
    } else {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goRight(),
    onSwipedRight: () => goLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const imageResetHelperFn = () => {
    setMainImageIndex(0);
  };

  return (
    <>
      <Backdrop
        isShown={isVisible}
        closeFn={closeFn}
        imageResetFn={imageResetHelperFn}
      />
      <StyledModal {...handlers} isShown={isVisible} closeFn={closeFn}>
        <StyledCloseIcon
          onClick={() => {
            imageResetHelperFn();
            closeFn();
          }}
          src={closeIcon}
          alt="close modal"
        />
        <StyledContent>
          <StyledMainImageWrapper
            {...layouts}
            background={images[mainImageIndex]}
          >
            <StyledSwipeIcon src={swipeIcon} alt="Swipe" />
          </StyledMainImageWrapper>
          {thumbnails ? (
            <StyledThumbnailWrapper>{thumbnails}</StyledThumbnailWrapper>
          ) : null}
        </StyledContent>
      </StyledModal>
    </>
  );
};

export default React.memo(Modal);
