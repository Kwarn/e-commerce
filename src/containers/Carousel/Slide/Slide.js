import React, { useContext } from 'react';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledSlide = styled.div`
  margin: auto;
  color: #474747;
  max-width: 100%;
  text-align: center;
`;

const StyledImage = styled.img`
  min-height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
  width: 100%;
  object-fit: cover;
`;

const Slide = ({ slide }) => {
  const layouts = useContext(LayoutsContext);

  return (
    <StyledSlide>
      <StyledImage {...layouts} src={slide.image} />
    </StyledSlide>
  );
};

export default Slide;
