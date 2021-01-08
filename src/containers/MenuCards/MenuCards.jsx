import React from 'react';
import goldFloor from '../../assets/goldFloor.jpeg';
import ImageSection from './MenuCard/MenuCard';
import happyCustomer from '../../assets/happyCustomer.jpg';
import welcomeImage from '../../assets/withChair.jpg';
import tongueAndGrooveImage from '../../assets/tongueAndGroove.jpg';
import clickFlooringImage from '../../assets/clickFlooring.jpeg';
import underlayImage from '../../assets/underlay.jpeg';
import adhesivesImage from '../../assets/adhesives.jpeg';
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
      buttonText: 'More',
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
    tongueAndGroove: {
      title: 'TONGUE & GROOVE',
      buttonText: 'BROWSE',
      buttonCallback: () => history.push('/tng'),
      image: tongueAndGrooveImage,
    },
    clickFlooring: {
      title: 'CLICK FLOORING',
      buttonText: 'BROWSE',
      buttonCallback: () => history.push('/clickflooring'),
      image: clickFlooringImage,
    },
    underlay: {
      title: 'UNDERLAY',
      buttonText: 'BROWSE',
      buttonCallback: () => history.push('/underlay'),
      image: underlayImage,
    },
    adhesives: {
      title: 'ADHESIVES',
      buttonText: 'BROWSE',
      buttonCallback: () => history.push('/adhesives'),
      image: adhesivesImage,
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
