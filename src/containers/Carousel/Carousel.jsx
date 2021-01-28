import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'infinite-react-carousel';
import LayoutContext from '../../Layout/LayoutsContext';
import Slide from './Slide/Slide';
import slideImage1 from '../../assets/slideImage1.jpg';
import slideImage2 from '../../assets/slideImage2.jpg';
import slideImage3 from '../../assets/slideImage3.jpg';
import slideImage4 from '../../assets/slideImage4.jpg';
import styled from 'styled-components';

const StyledCarouselContainer = styled.div`
  height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
  width: 100%;
`;

export default function Carousel() {
  const layouts = useContext(LayoutContext);
  const history = useHistory();
  const slidesContentArray = [
    {
      title: 'VIEW OUR BEAUTIFUL COLLECTION OF WOOD FLOORING',
      image: slideImage1,
      isImageDark: false,
      callbackFn: () => history.push('/products'),
    },
    {
      title: 'NEED FLOORING ADVICE? BOOK A CONSULTATION',
      image: slideImage4,
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
  return (
    <StyledCarouselContainer {...layouts}>
      <Slider autoplay={true} autoplaySpeed={5000} duration={500} dots>
        {slides}
      </Slider>
    </StyledCarouselContainer>
  );
}
