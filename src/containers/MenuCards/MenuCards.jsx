import React from 'react';
import goldFloor from '../../assets/goldFloor.jpeg';
import MenuCard from './MenuCard/MenuCard';
import happyCustomer from '../../assets/happyCustomer.jpg';
import welcomeImage from '../../assets/slideImage1.jpg';
import tongueAndGrooveImage from '../../assets/tongueAndGroove.jpg';
import clickFlooringImage from '../../assets/clickflooring.JPG';
import underlayImage from '../../assets/underlay.jpeg';
import adhesivesImage from '../../assets/adhesives.jpeg';
import { useHistory } from 'react-router-dom';

const MenuCards = () => {
  const history = useHistory();
  const menuCardContent = {
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

  let menuCardsObj = {};
  for (let key in menuCardContent) {
    menuCardsObj = {
      ...menuCardsObj,
      ...{ [key]: <MenuCard key={key} {...menuCardContent[key]} /> },
    };
  }

  return menuCardsObj;
};

export default MenuCards;
