import React, { useState, useContext, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useHistory } from 'react-router-dom';
import Slide from './Slide/Slide';
import styled from 'styled-components';
import rightChevronImage from '../../assets/rightChevron.png';
import leftChevronImage from '../../assets/leftChevron.png';
import LayoutsContext from '../../Layout/LayoutsContext';
import slideImage1 from '../../assets/slideImage1.jpg';
import slideImage2 from '../../assets/slideImage2.jpg';
import slideImage3 from '../../assets/slideImage3.jpg';
import slideImage4 from '../../assets/slideImage4.jpg';

const StyledSlideContainer = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  justify-content: center;
  height: 100%;
  transition: 0.5s;
`;

const StyledCarouselControl = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  top: 50%;
  width: 10%;
  height: 100%;
  transform: translateY(-50%);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const StyledCarouselChevron = styled.img`
  margin: auto;
  width: 2vw;
  min-width: 20px;
  height: auto;
`;

const StyledCarousel = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const Carousel = () => {
  const layouts = useContext(LayoutsContext);
  const history = useHistory();
  const slideContainer = useRef(null);
  const [x, setX] = useState(-100);
  const transitionEndListener = e => {
    console.log(x);
    if (x === 0) {
      setX(-400);
    }
  };

  useEffect(() => {
    const sc = slideContainer.current;

    sc.addEventListener('webkitTransitionEnd', transitionEndListener);
    return () => {
      sc.removeEventListener('webkitTransitionEnd', transitionEndListener);
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => goRight(),
    onSwipedRight: () => goLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const slidesArr = [
    {
      title: 'BEAUTIFUL HARDWOOD FLOORING',
      image: slideImage1,
      callbackFn: () => history.push('/products'),
      isImageDark: true,
    },
    {
      title: 'OUR HAPPY CUSTOMERS',
      image: slideImage2,
      callbackFn: () => history.push('/testimonials'),
      isImageDark: false,
    },
    { title: 'CREATE A BEAUTIFUL SPACE', image: slideImage3 },
    { title: 'NEED FLOORING ADVICE? BOOK A CONSULTATION', image: slideImage4 },
  ];

  const slides = slidesArr.map(slide => {
    return <Slide key={slide.title} slide={slide} />;
  });

  const firstSlideClone = slides[0];
  const lastSlideClone = slides[slides.length - 1];

  const goLeft = () => {
    setX(x + 100);
  };
  const goRight = () => {
    setX(x - 100);
  };

  return (
    <StyledCarousel {...layouts} {...handlers}>
      <StyledSlideContainer ref={slideContainer} style={{ left: `${x}%` }}>
        {lastSlideClone}
        {slides}
        {firstSlideClone}
      </StyledSlideContainer>
      <StyledCarouselControl
        onClick={goLeft}
        onAnimationEnd={() => console.log('test')}
        style={{ left: 0 }}
      >
        <StyledCarouselChevron src={leftChevronImage} alt="go left" />
      </StyledCarouselControl>
      <StyledCarouselControl onClick={goRight} style={{ right: 0 }}>
        <StyledCarouselChevron src={rightChevronImage} alt="go right" />
      </StyledCarouselControl>
    </StyledCarousel>
  );
};

export default Carousel;
