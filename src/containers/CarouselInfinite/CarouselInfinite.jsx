import React from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'infinite-react-carousel';
import Slide from '../Carousel/Slide/Slide';
import slideImage1 from '../../assets/slideImage1.jpg';
import slideImage2 from '../../assets/slideImage2.jpg';
import slideImage3 from '../../assets/slideImage3.jpg';
import slideImage4 from '../../assets/slideImage4.jpg';

export default function CarouselInfinite() {
  const slidesContentArray = [
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
  const slides = slidesContentArray.map(slide => (
    <Slide key={slide.title} slide={slide} />
  ));
  const history = useHistory();
  return (
    <Slider autoplay={true} autoplaySpeed={4000} pauseOnHover={false} dots>
      {slides}
    </Slider>
  );
}
