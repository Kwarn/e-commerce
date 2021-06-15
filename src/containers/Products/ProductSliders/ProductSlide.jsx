import React, { useContext } from 'react';
import styled from 'styled-components';
import productUnderlineImg from '../../../assets/productDivider.png';
import fullScreenIcon from '../../../assets/fullScreen.png';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledSlide = styled.li`
  height: 40vh;
  position: relative;
  display: flex;
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  margin: auto;
`;

const StyledContentWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: 0.3s ease-in-out;
  bottom: 0;
  left: ${props =>
    props.isDesktop ? 'calc(50% - (50% / 2) )' : 'calc(50% - (80% / 2) )'};
  color: white;
  width: ${props => (props.isDesktop ? '50%' : '80%')};
  background-color: ${props =>
    props.isImageDark ? 'rgba(225, 225, 225, 0.5)' : 'rgba(0, 0, 0, 0.5)'};

  &:hover:hover {
    cursor: pointer;
  }
`;

const StyledProductUnderline = styled.img`
  margin: auto auto 10px auto;
  width: 150px;
  height: 20px;
`;

const StyledTitle = styled.h3`
  margin: 10px auto 0px auto;
`;

const StyledDescription = styled.p`
  padding: 10px;
  margin: auto;
`;

const StyledFullImages = styled.p`
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  position: absolute;
  display: flex;
  top: 0;
  right: -15px;
  width: 150px;
  height: 20px;
  font-size: ${props => (props.isMobile ? '0.8em' : '1em')};
`;

const StyledMaximizeIcon = styled.img`
  text-align: center;
  cursor: pointer;
  z-index: 2;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
`;

const ProductSlide = ({ title, image, description, showModalCb }) => {
  const layouts = useContext(LayoutsContext);
  return (
    <>
      <StyledSlide background={image}>
        <StyledContentWrapper {...layouts} onClick={showModalCb}>
          {layouts.isMobile ? null : (
            <StyledFullImages {...layouts}>See Full Images</StyledFullImages>
          )}
          {layouts.isMobile ? (
            <StyledMaximizeIcon src={fullScreenIcon} alt="maximize" />
          ) : null}
          <StyledTitle>{title.toUpperCase()}</StyledTitle>
          <StyledProductUnderline src={productUnderlineImg} alt="underline" />
          {description ? (
            <StyledDescription>{description}</StyledDescription>
          ) : null}
        </StyledContentWrapper>
      </StyledSlide>
    </>
  );
};

export default ProductSlide;
