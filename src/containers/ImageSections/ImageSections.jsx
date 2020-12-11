import React from 'react';
import welcomeImage from '../../assets/welcomeImage.jpeg';
import ImageSection from './ImageSection/ImageSection';
import flooring1 from '../../assets/flooring1.jpg';
import happyCustomer from '../../assets/happyCustomer.jpg';
import { withRouter, useHistory } from 'react-router-dom';

const ImageSections = () => {
  const history = useHistory();
  const imageSectionContent = {
    welcomeElement: {
      title: 'NATURAL WOOD FLOORING',
      description: 'Discover our extensive range',
      textColor: 'white',
      buttonText: 'Explore',
      buttonCallback: () => history.push('/products'),
      shouldFillWidth: true,
      image: welcomeImage,
    },
    testimonials: {
      title: 'OUR HAPPPY CUSTOMERS',
      description: 'What they have to say',
      buttonText: 'Testimonials',
      buttonCallback: () => history.push('/testimonials'),
      image: happyCustomer,
    },
    aboutUs: {
      title: 'ABOUT US',
      description: 'Meet our specialists',
      buttonText: 'FIND OUT MORE',
      buttonCallback: () => history.push('/about'),
      image: flooring1,
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
