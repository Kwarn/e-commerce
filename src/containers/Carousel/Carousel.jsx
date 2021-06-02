import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'infinite-react-carousel';
import LayoutContext from '../../Layout/LayoutsContext';
import Slide from './Slide/Slide';
import slideImage1 from '../../assets/slideImage1.jpg';
import slideImage2 from '../../assets/slideImage2.jpg';
import slideImage3 from '../../assets/slideImage3.jpg';
import slideImage4 from '../../assets/slideImage4.jpg';
import rightChev from '../../assets/rightChev.png';
import leftChev from '../../assets/leftChev.png';
import styled from 'styled-components';

const StyledCarouselContainer = styled.div`
  width: 100%;
`;

const StyledSlideDot = styled.button`
  z-index: 5;
  position: absolute;
  top: -10vh;
  width: 25px;
  background-color: black;
  height: 25px;
`;

export default function Carousel() {
  const layouts = useContext(LayoutContext);
  const history = useHistory();
  const slidesContentArray = [
    {
      title: 'NEED FLOORING ADVICE? BOOK A CONSULTATION',
      image: slideImage4,
      callbackFn: () => history.push('/products'),
    },
    {
      title: 'VIEW OUR BEAUTIFUL COLLECTION OF WOOD FLOORING',
      image: slideImage1,
      isImageDark: false,
      callbackFn: () => history.push('/products'),
    },
    {
      title: 'CREATE A BEAUTIFUL SPACE',
      image: slideImage3,
      callbackFn: () => history.push('/products'),
    },
    {
      title: 'HEAR FROM OUR CUSTOMERS',
      image: slideImage2,
      isImageDark: false,
      callbackFn: () => history.push('/testimonials'),
    },
  ];
  const slides = slidesContentArray.map(slide => (
    <Slide key={slide.title} slide={slide} />
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
  for (let i = 0; i < slidesContentArray.length; i++) {
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
        autoplay={true}
        autoplaySpeed={5000}
        duration={500}
        dots
      >
        {slides}
      </Slider>
    </StyledCarouselContainer>
  );
}
