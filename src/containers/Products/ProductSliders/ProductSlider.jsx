import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'infinite-react-carousel';
import ProductSlide from './ProductSlide';
import rightChev from '../../../assets/rightChev.png';
import leftChev from '../../../assets/leftChev.png';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledCarouselContainer = styled.div`
  width: ${props => (props.isDesktop ? '60%' : '100%')};
  margin: auto;
`;

const StyledSlideDot = styled.button`
  z-index: 5;
  position: absolute;
  top: -10vh;
  width: 25px;
  background-color: black;
  height: 25px;
`;

export default function ProductSlider({ productTitle, images }) {
  // TO DO: Issue mixing VW & % for CSS
  // Causes product sliders to bug out of container
  const layouts = useContext(LayoutsContext);
  let slideImages = [];
  const slides = images.map((image, idx) => (
    <ProductSlide key={idx} image={image} title={productTitle} />
  ));

  const rightChevImg = (
    <img
      style={{
        position: 'absolute',
        height: '35px',
        width: '20px',
        top: 'calc(50% - 15px)',
        right: '10px',
      }}
      src={rightChev}
      alt="right"
    />
  );
  const leftChevImg = (
    <img
      style={{
        position: 'absolute',
        height: '35px',
        width: '20px',
        top: 'calc(50% - 15px)',
        left: '10px',
      }}
      src={leftChev}
      alt="left"
    />
  );

  return (
    <StyledCarouselContainer {...layouts}>
      <Slider
        customPaging={i => <StyledSlideDot>{i + 1}</StyledSlideDot>}
        prevArrow={leftChevImg}
        nextArrow={rightChevImg}
        dots
      >
        {slides}
      </Slider>
    </StyledCarouselContainer>
  );
}
