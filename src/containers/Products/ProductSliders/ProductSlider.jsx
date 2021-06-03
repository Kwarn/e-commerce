import React, { useContext } from 'react';
import Slider from 'infinite-react-carousel';
import ProductSlide from './ProductSlide';
import rightChev from '../../../assets/rightChev.png';
import leftChev from '../../../assets/leftChev.png';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledCarouselContainer = styled.div`
  width: ${props => (props.isDesktop ? '80%' : '100%')};
  margin: auto;
`;


export default function ProductSlider({ productTitle, images }) {
  const layouts = useContext(LayoutsContext);
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
        prevArrow={leftChevImg}
        nextArrow={rightChevImg}
        dots
      >
        {slides}
      </Slider>
    </StyledCarouselContainer>
  );
}
