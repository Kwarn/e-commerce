import React from 'react';
import styled from 'styled-components';
import MenuCards from '../MenuCards/MenuCards';
import TextSections from '../TextSections/TextSections';
import { withRouter } from 'react-router-dom';
import CarouselInfinite from '../Carousel/Carousel';

const StyledHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledMenuCards = styled.div`
  margin: auto auto 40px auto;
  width: 80%;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  max-width: 100%;
  align-items: center;
`;

function Home() {
  const { testimonials, aboutUs } = MenuCards();
  const { welcomeText } = TextSections();
  return (
    <>
      <StyledHomeWrapper>
        <CarouselInfinite />
        {welcomeText}
        <StyledMenuCards>
          {testimonials}
          {aboutUs}
        </StyledMenuCards>
      </StyledHomeWrapper>
    </>
  );
}

export default withRouter(Home);
