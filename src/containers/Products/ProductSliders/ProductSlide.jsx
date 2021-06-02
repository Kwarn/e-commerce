import React, { useContext } from 'react';
import styled from 'styled-components';
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

const StyledText = styled.div`
  margin: auto;
  text-align: center;
`;

const ProductSlide = ({ slide }) => {
  const layouts = useContext(LayoutsContext);
  return <StyledSlide {...layouts} background={slide.image}></StyledSlide>;
};

export default ProductSlide;
