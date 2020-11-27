import React from 'react';
import styled from 'styled-components';
import ImageSection from '../../components/ImageSection/ImageSection';
import welcomeImage from '../../assets/welcomeImage.jpg';
import flooring1 from '../../assets/flooring1.jpg';
import TextSection from '../../components/textSection/TextSection';
import { withRouter } from 'react-router-dom';

const StyledHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  background-color: #eee;
`;

function Home(props) {
  const showSettings = e => {
    e.preventDefault();
    console.log('works');
  };
  const buttonCallbackHandler = route => {};

  return (
    <StyledHomeWrapper>
      <ImageSection
        title="NATURAL WOOD FLOORING"
        description="Discover our extensive range"
        buttonText="Explore"
        buttonCallback={() => props.history.push('/products')}
        image={welcomeImage}
      ></ImageSection>
      <TextSection
        text={`We make beautiful real wood flooring from responsibly sourced timber

        Find Your Perfect Wood Floor`}
      />
      <ImageSection
        title="OUR HAPPPY CUSTOMERS"
        description="Providing hard wood on the floor"
        buttonText="Explore"
        buttonCallback={() => props.history.push('/testimonials')}
        image={flooring1}
      ></ImageSection>
      <ImageSection
        title="WHO WE ARE"
        description=""
        buttonText="FIND OUT MORE"
        buttonCallback={() => props.history.push('/aboutus')}
        image={flooring1}
      ></ImageSection>
    </StyledHomeWrapper>
  );
}

export default withRouter(Home);
