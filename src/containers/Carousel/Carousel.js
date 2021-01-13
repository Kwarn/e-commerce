import React, { useState, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import Slide from './Slide/Slide';
import styled from 'styled-components';
import rightChevronImage from '../../assets/rightChevron.png';
import leftChevronImage from '../../assets/leftChevron.png';
import LayoutsContext from '../../Layout/LayoutsContext';
import slideImage1 from '../../assets/slideImage1.jpg';
import slideImage2 from '../../assets/slideImage2.jpeg';

const StyledSlideContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  min-width: 100%;
  height: 100%;
  transition: 0.5s;
`;

const StyledCarouselControl = styled.div`
  cursor: pointer;
  text-align: center;
  position: absolute;
  background: none;
  top: 50%;
  width: 10%;
  height: 100%;
  transform: translateY(-50%);
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledCarouselChevron = styled.img`
  position: relative;
  top: 45%;
  width: 3vw;
  height: auto;
`;

const StyledCarousel = styled.div`
  position: relative;
  min-width: 100%;

  height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};

  box-sizing: border-box;
  padding: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Carousel = () => {
  const layouts = useContext(LayoutsContext);
  const [x, setX] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => goRight(),
    onSwipedRight: () => goLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const slidesArr = [
    {
      title: 'slide0',
      image: slideImage1,
    },
    { title: 'slide1', image: slideImage2 },
    { title: 'slide2' },
    { title: 'slide3' },
  ];

  const slides = slidesArr.map(slide => {
    return (
      <StyledSlideContainer
        key={slide.title}
        style={{ transform: `translateX(${x}%)` }}
      >
        <Slide slide={slide} />
      </StyledSlideContainer>
    );
  });

  const goLeft = () => {
    x === 0 ? setX(-100 * (slides.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    x === -100 * (slides.length - 1) ? setX(0) : setX(x - 100);
  };

  return (
    <StyledCarousel {...layouts} {...handlers}>
      {slides}
      <StyledCarouselControl onClick={goLeft} style={{ left: 0 }}>
        <StyledCarouselChevron src={leftChevronImage} alt="go left" />
      </StyledCarouselControl>
      <StyledCarouselControl onClick={goRight} style={{ right: 0 }}>
        <StyledCarouselChevron src={rightChevronImage} alt="go right" />
      </StyledCarouselControl>
    </StyledCarousel>
  );
};

export default Carousel;
