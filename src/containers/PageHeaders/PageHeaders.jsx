import React, { useContext } from 'react';
import PageHeader from './PageHeader/PageHeader';
import productsImage from '../../assets/slideImage3.jpg';
import tongueAndGrooveImage from '../../assets/tongueAndGroove.jpg';
import clickFlooringImage from '../../assets/clickFlooring.jpeg';
import underlayImage from '../../assets/underlay.jpeg';
import adhesivesImage from '../../assets/adhesives.jpeg';

export default function PageHeaders() {
  const headers = {
    productsHeader: {
      title: 'OUR PRODUCTS',
      description:
        'Twelve Oak is proud to be FSC® and PEFC® certified. All Twelve Oak Wood Flooring products are produced in FSC® certified factories and comply fully with the European Timber Regulations. Look out for the logos on certified products.',
      image: productsImage,
    },
    tongueAndGrooveHeader: {
      title: 'Tongue And Groove',
      description: 'Tongue And Groove flooring requires adhesive!',
      image: tongueAndGrooveImage,
    },
    clickFlooringHeader: {
      title: 'Click Flooring',
      description: 'Hassle and mess free installation',
      image: clickFlooringImage,
    },
    underlayHeader: {
      title: 'Underlay',
      description: 'Required for most floor installations',
      image: underlayImage,
    },
    adhesivesHeader: {
      title: 'Adhesives',
      description: 'For long lasting movement free floor installations',
      image: adhesivesImage,
    },
  };

  let pageHeadersObj = {};
  for (let key in headers) {
    pageHeadersObj = {
      ...pageHeadersObj,
      ...{
        [key]: (
          <PageHeader
            key={key}
            title={headers[key].title}
            desc={headers[key].description}
            image={headers[key].image}
          />
        ),
      },
    };
  }

  return pageHeadersObj;
}
