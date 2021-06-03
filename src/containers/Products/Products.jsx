import React, { useContext } from 'react';
import PageHeaders from '../PageHeaders/PageHeaders';
import MenuCards from '../MenuCards/MenuCards';
import styled from 'styled-components';
import woodFlooringData from './woodFlooringData';
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
  width: 100%;
`;

export default function Products() {
  const layouts = useContext(LayoutsContext);
  const { productsHeader } = PageHeaders();
  const { tongueAndGroove, woodFlooring, underlay, adhesives } = MenuCards();

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
    </Wrapper>
  );
}
