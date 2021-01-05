import React from 'react';
import ImageSection from '../ImageSections/ImageSection/ImageSection';
import products from '../../assets/products.jpg';
import tongueAndGroove from '../../assets/tongueAndGroove.jpg';
import clickFlooring from '../../assets/clickFlooring.jpeg';
import underlay from '../../assets/underlay.jpeg';
import adhesives from '../../assets/adhesives.jpeg';
import TextSection from '../../components/textSection/TextSection';
import WelcomeSection from '../PageHeaders/PageHeader/PageHeader';
import styled from 'styled-components';
import PageHeaders from '../PageHeaders/PageHeaders';

const StyledProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
`;

export default function Products() {
  const { productsHeader } = PageHeaders();

  const productMenuItems = {
    'TONGUE & GROOVE': tongueAndGroove,
    'CLICK FLOORING': clickFlooring,
    UNDERLAY: underlay,
    ADHESIVES: adhesives,
  };

  const menuItems = Object.keys(productMenuItems).map(key => (
    <ImageSection
      key={key}
      title={key}
      buttonText="BROWSE"
      image={productMenuItems[key]}
    />
  ));

  return (
    <StyledProductsWrapper>
      {productsHeader} {menuItems}
    </StyledProductsWrapper>
  );
}
