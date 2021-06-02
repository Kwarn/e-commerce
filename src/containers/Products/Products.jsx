import React, { useContext } from 'react';
import PageHeaders from '../PageHeaders/PageHeaders';
import MenuCards from '../MenuCards/MenuCards';
import styled from 'styled-components';
import ProductDataArray from './ProductsRawData';
import ProductSlider from './ProductSliders/ProductSlider';
import LayoutsContext from '../../Layout/LayoutsContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledProductSliderWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledMenuCardsContainer = styled.div`
  margin: 40px auto 40px auto;
  width: ${props => (props.isDesktop ? '80%' : '100%')};
`;

const StyledMenuCards = styled.div`
  display: flex;
  flex-direction: ${props => (!props.isDesktop ? 'column' : 'row')};
  align-items: center;
`;

const StyledProductSliderGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export default function Products() {
  const layouts = useContext(LayoutsContext);
  const { productsHeader } = PageHeaders();
  const { tongueAndGroove, clickFlooring, underlay, adhesives } = MenuCards();
  const productSliders = {};
  for (let product of ProductDataArray) {
    const title = product.title;
    productSliders[product.title] = (
      <StyledProductSliderWrapper {...layouts}>
        <h1>{product.title}</h1>
        <ProductSlider
          key={product.images[0]}
          productTitle={product.title}
          images={product.images}
        />
      </StyledProductSliderWrapper>
    );
  }
  return (
    <Wrapper>
      {productsHeader}
      <StyledMenuCardsContainer {...layouts}>
        <StyledMenuCards {...layouts}>
          {tongueAndGroove}
          {clickFlooring}
        </StyledMenuCards>
        <StyledMenuCards {...layouts}>
          {underlay}
          {adhesives}
        </StyledMenuCards>
      </StyledMenuCardsContainer>
      {productSliders['Walnut']}
      <StyledProductSliderGroup>
        {productSliders['Grey Bark']}
        {productSliders['Warwick Castle']}
      </StyledProductSliderGroup>
    </Wrapper>
  );
}
