import React from 'react';
import PageHeaders from '../PageHeaders/PageHeaders';
import MenuCards from '../MenuCards/MenuCards';
import styled from 'styled-components';
import ProductsObject from './ProductsRawData';
import ProductSlider from './ProductSliders/ProductSlider';

const StyledProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledMenuCardsContainer = styled.div`
  margin: 40px auto 40px auto;
  width: 80%;
`;

const StyledMenuCards = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  max-width: 100%;
  align-items: center;
`;

export default function Products() {
  const { productsHeader } = PageHeaders();
  const { tongueAndGroove, clickFlooring, underlay, adhesives } = MenuCards();
  const productSliders = [];
  for (let product in ProductsObject) {
    productSliders.push(
      <ProductSlider
        key={product}
        productTitle={product}
        images={ProductsObject[product].images}
      />
    );
  }
  console.log('ProductsObject :>> ', ProductsObject);
  return (
    <StyledProductsWrapper>
      {productsHeader}
      <StyledMenuCardsContainer>
        <StyledMenuCards>
          {tongueAndGroove}
          {clickFlooring}
        </StyledMenuCards>
        <StyledMenuCards>
          {underlay}
          {adhesives}
        </StyledMenuCards>
        <StyledMenuCards>{productSliders}</StyledMenuCards>
      </StyledMenuCardsContainer>
    </StyledProductsWrapper>
  );
}
