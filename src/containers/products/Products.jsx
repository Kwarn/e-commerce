import React from 'react';
import ImageSection from '../../components/ImageSection/ImageSection';
import products from '../../assets/products.jpg';
import hardwood from '../../assets/hardwood.jpg';
import laminate from '../../assets/laminate.jpg';
import TextSection from '../../components/textSection/TextSection';

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

  return (
    <>
      <ImageSection image={products} shouldFillWidth={true} />
      <TextSection
        h1="OUR PRODUCTS"
        p="Make a house a home with our diverse range of products"
      />
      {menuItems}
    </>
  );
}
