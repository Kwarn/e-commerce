import React from 'react';
import PageHeaders from '../PageHeaders/PageHeaders';
import ImageSections from '../MenuCards/MenuCards';
import styled from 'styled-components';

const StyledProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
`;

export default function Products() {
  const { productsHeader } = PageHeaders();

  const {
    tongueAndGroove,
    clickFlooring,
    underlay,
    adhesives,
  } = ImageSections();

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
