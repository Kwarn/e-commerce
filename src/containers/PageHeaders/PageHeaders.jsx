import React from 'react';
import PageHeader from './PageHeader/PageHeader';
import products from '../../assets/products.jpg';

export default function PageHeaders() {
  const headers = {
    productsHeader: {
      title: 'OUR PRODUCTS',
      description:
        'Twelve Oak is proud to be FSC® and PEFC® certified. All Twelve Oak Wood Flooring products are produced in FSC® certified factories and comply fully with the European Timber Regulations. Look out for the logos on certified products.',
      image: products,
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
