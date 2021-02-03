import React from 'react';
import PageHeaders from '../PageHeaders/PageHeaders';
import MenuCards from '../MenuCards/MenuCards';
import styled from 'styled-components';

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
      </StyledMenuCardsContainer>
    </StyledProductsWrapper>
  );
}
