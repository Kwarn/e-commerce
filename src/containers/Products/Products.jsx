import React, { useContext } from 'react';
import PageHeaders from '../PageHeaders/PageHeaders';
import MenuCards from '../MenuCards/MenuCards';
import styled from 'styled-components';
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

const StyledInfoCard = styled.div`
  padding: 35px;
  max-width: 350px;
  max-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Products() {
  const layouts = useContext(LayoutsContext);
  const { productsHeader } = PageHeaders();
  const { woodFlooring, underlay, adhesives } = MenuCards();

  return (
    <Wrapper>
      {productsHeader}
      <StyledMenuCardsContainer {...layouts}>
        <StyledMenuCards {...layouts}>{woodFlooring}</StyledMenuCards>
        <StyledInfoCard>
          <h3>ISPUM LOREM 1</h3>
          <p>
            ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Numquam, tempora a nisi labore deleniti voluptatem dolorum sapiente
            tenetur at consequuntur placeat quibusdam vel, quas quaerat quos
            accusamus voluptate recusandae natus?
          </p>
        </StyledInfoCard>
      </StyledMenuCardsContainer>
      <StyledMenuCardsContainer {...layouts}>
        <StyledMenuCards {...layouts}>
          <StyledInfoCard>
            <h3 style={{ textAlign: 'right' }}>ISPUM LOREM 2</h3>
            <p>
              ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Numquam, tempora a nisi labore deleniti voluptatem dolorum
              sapiente tenetur at consequuntur placeat quibusdam vel, quas
              quaerat quos accusamus voluptate recusandae natus?
            </p>
          </StyledInfoCard>
          {underlay}
        </StyledMenuCards>
      </StyledMenuCardsContainer>
      <StyledMenuCardsContainer {...layouts}>
        <StyledMenuCards>
          {adhesives}
          <StyledInfoCard>
            <h3 style={{ textAlign: 'center' }}>ISPUM LOREM 3</h3>
            <p>
              ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Numquam, tempora a nisi labore deleniti voluptatem dolorum
              sapiente tenetur at consequuntur placeat quibusdam vel, quas
              quaerat quos accusamus voluptate recusandae natus?
            </p>
          </StyledInfoCard>
        </StyledMenuCards>
      </StyledMenuCardsContainer>
    </Wrapper>
  );
}
