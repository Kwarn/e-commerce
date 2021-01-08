import React from 'react';
import PageHeaders from '../PageHeaders/PageHeaders';
import MenuCards from '../MenuCards/MenuCards';
import styled from 'styled-components';

const StyledProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
`;

export default function Products() {
  const { productsHeader } = PageHeaders();

  const { tongueAndGroove, clickFlooring, underlay, adhesives } = MenuCards();

  return (
    <StyledProductsWrapper>
      {productsHeader}
      {tongueAndGroove}
      {clickFlooring}
      {underlay}
      {adhesives}
    </StyledProductsWrapper>
  );
}
