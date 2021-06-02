import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'infinite-react-carousel';
import LayoutContext from '../../../Layout/LayoutsContext';
import ProductSlide from './ProductSlide';
import rightChev from '../../../assets/rightChev.png';
import leftChev from '../../../assets/leftChev.png';
import styled from 'styled-components';

const StyledCarouselContainer = styled.div`
  width: 100%;
  margin: 5px;
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
  const layouts = useContext(LayoutContext);
  const history = useHistory();
  let slidesContent = [];
  images.forEach(img =>
    slidesContent.push({ title: productTitle, image: img })
  );

  const slides = slidesContent.map(slide => (
    <ProductSlide key={slide.title} slide={slide} />
  ));

  const rightChevImg = (
    <img
      style={{
        position: 'absolute',
        height: '30px',
        width: '15px',
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
        height: '30px',
        width: '15px',
        top: 'calc(50% - 15px)',
        left: '10px',
      }}
      src={leftChev}
      alt="left"
    />
  );

  let dots = [];
  for (let i = 0; i < slidesContent.length; i++) {
    dots.push(
      <li>
        <StyledSlideDot />
      </li>
    );
  }

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
