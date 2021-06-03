import React from 'react';
import styled from 'styled-components';

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

const ProductSlide = ({ image }) => {
  return <StyledSlide background={image} />;
};

export default ProductSlide;
