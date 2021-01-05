import React from 'react';
import goldFloor from '../../assets/goldFloor.jpeg';
import ImageSection from './ImageSection/ImageSection';
import happyCustomer from '../../assets/happyCustomer.jpg';
import welcomeImage from '../../assets/withChair.jpg';
import { useHistory } from 'react-router-dom';

const ImageSections = () => {
  const history = useHistory();
  const imageSectionContent = {
    welcomeElement: {
      title: 'NATURAL WOOD FLOORING',
      description: 'Discover our extensive range',
      buttonText: 'Explore',
      buttonCallback: () => history.push('/products'),
      isWelcomeElement: true,
      image: welcomeImage,
    },
    testimonials: {
      title: 'OUR CUSTOMERS',
      description: 'Hear what they have to say',
      buttonText: 'Testimonials',
      buttonCallback: () => history.push('/testimonials'),
      image: happyCustomer,
    },
    aboutUs: {
      title: 'ABOUT US',
      description: 'Meet our specialists',
      buttonText: 'Find out more',
      buttonCallback: () => history.push('/about'),
      image: goldFloor,
    },
  };

  let imageSectionsObject = {};
  for (let key in imageSectionContent) {
    imageSectionsObject = {
      ...imageSectionsObject,
      ...{ [key]: <ImageSection key={key} {...imageSectionContent[key]} /> },
    };
  }

  return imageSectionsObject;
};

export default ImageSections;