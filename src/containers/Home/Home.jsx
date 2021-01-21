import React from 'react';
import styled from 'styled-components';
import MenuCards from '../MenuCards/MenuCards';
import { withRouter } from 'react-router-dom';
// import Carousel from '../Carousel/Carousel';
import CarouselInfinite from '../CarouselInfinite/CarouselInfinite';

const StyledHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
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
const StyledCarouselContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
function Home(props) {
  const { welcomeElement, testimonials, aboutUs } = MenuCards();
  return (
    <>
      <StyledHomeWrapper>
        <StyledCarouselContainer>
          <CarouselInfinite />
        </StyledCarouselContainer>
        {welcomeElement}
        <StyledMenuCards>
          {testimonials}
          {aboutUs}
        </StyledMenuCards>
      </StyledHomeWrapper>
    </>
  );
}

export default withRouter(Home);
