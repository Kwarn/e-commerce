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
  max-width: 100%;
  align-items: center;
`;

const StyledMenuCardsContainer = styled.div`
  margin: 40px auto 40px auto;
  width: ${props => (props.isDesktop ? '90%' : '100%')};
  display: flex;
  flex-direction: ${props => (props.isDesktop ? 'row' : 'column')};
  align-items: center;
`;

const StyledMenuCards = styled.div`
  display: flex;
  flex-direction: ${props => (props.isDesktop ? 'row' : 'column')};
  align-items: center;
  width: 100vw;
`;

const StyledProductSliderWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  h1 {
    color: #fff;
    width: ${props => (props.isDesktop ? '60%' : '100%')};
    margin: auto;
    background-color: #474747;
    padding: 0;
  }
`;

const StyledProductSliderGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.isDesktop ? 'row' : 'column')};
  width: 100vw;
  margin: 0;
  padding: 0;
`;

export default function Products() {
  const layouts = useContext(LayoutsContext);
  const { productsHeader } = PageHeaders();
  const { tongueAndGroove, woodFlooring, underlay, adhesives } = MenuCards();
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
        <StyledMenuCards {...layouts}>{woodFlooring}</StyledMenuCards>
        <StyledMenuCards {...layouts}>
          {underlay}
          {adhesives}
        </StyledMenuCards>
      </StyledMenuCardsContainer>
      {productSliders['Walnut']}
      <StyledProductSliderGroup {...layouts}>
        {productSliders['Grey Bark']}
        {productSliders['Warwick Castle']}
      </StyledProductSliderGroup>
    </Wrapper>
  );
}
