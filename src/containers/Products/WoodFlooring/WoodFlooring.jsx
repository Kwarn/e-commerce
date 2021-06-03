import React, { useContext } from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';
import woodFlooringData from '../woodFlooringData';
import ProductSlider from '../ProductSliders/ProductSlider';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledTopMarginSpacer = styled.div`
  margin-top: 10vh;
`;

const StyledProductSliderWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
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
  width: 100%;
  margin: 0;
  padding: 0;
`;

export default function WoodFlooring({ productCardElements }) {
  const layouts = useContext(LayoutsContext);
  const { woodFlooringHeader } = PageHeaders();
  const ProductCardElements = {};
  for (let product of woodFlooringData) {
    ProductCardElements[product.title] = (
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
    <>
      <Wrapper {...layouts}>
        {woodFlooringHeader}
        <StyledTopMarginSpacer />
        {ProductCardElements['Walnut']}
        <StyledProductSliderGroup {...layouts}>
          {ProductCardElements['Grey Bark']}
          {ProductCardElements['Warwick Castle']}
        </StyledProductSliderGroup>
      </Wrapper>
    </>
  );
}
