import React from 'react';
import ImageSection from '../../components/ImageSection/ImageSection';
import hardwood from '../../assets/hardwood.jpg';
import laminate from '../../assets/laminate.jpg';

export default function Products() {
  const productMenuItems = { Hardwood: hardwood, Laminate: laminate };

  const menuItems = Object.keys(productMenuItems).map(key => (
    <ImageSection
      key={key}
      title={`${key} flooring`}
      buttonText="BROWSE"
      image={productMenuItems[key]}
    />
  ));

  return menuItems;
}
