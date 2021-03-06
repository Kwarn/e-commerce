import React, { useContext } from 'react';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledSlide = styled.li`
  height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
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
  top: 50%;
  margin-top: -60px;
  min-height: 120px;
  left: 50%;
  color: white;
  margin-left: ${props =>
    props.isMobile ? '-120px' : props.isTablet ? '-150px' : '-200px'};
  width: ${props =>
    props.isMobile ? '240px' : props.isTablet ? '300px' : '400px'};
  background-color: ${props =>
    props.isImageDark ? 'rgba(225, 225, 225, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
`;

const StyledCallToAction = styled.div`
  cursor: pointer;
  display: flex;
  margin: auto;
  height: 60px;
  width: ${props =>
    props.isMobile ? '180px' : props.isTablet ? '200px' : '300px'};
  border: 2px solid white;
`;

const StyledText = styled.div`
  margin: auto;
  text-align: center;
`;

const Slide = ({ slide }) => {
  const layouts = useContext(LayoutsContext);
  return (
    <StyledSlide {...layouts} background={slide.image}>
      <StyledContentWrapper {...layouts} isImageDark={slide.isImageDark}>
        <StyledCallToAction
          onClick={slide.callbackFn}
          {...layouts}
          isImageDark={slide.isImageDark}
        >
          <StyledText>{slide.title}</StyledText>
        </StyledCallToAction>
      </StyledContentWrapper>
    </StyledSlide>
  );
};

export default Slide;
