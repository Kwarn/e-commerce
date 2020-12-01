import React from 'react';
import styled from 'styled-components';
import ImageSection from '../../components/ImageSection/ImageSection';
import welcomeImage from '../../assets/welcomeImage.jpg';
import flooring1 from '../../assets/flooring1.jpg';
import happyCustomer from '../../assets/happyCustomer.jpg';
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
        shouldFillWidth={true}
        image={welcomeImage}
      ></ImageSection>
      <TextSection
        h1="Find Your Perfect Wood Floor"
        p="We make beautiful real wood flooring from responsibly sourced timber"
      />
      <ImageSection
        title="OUR HAPPPY CUSTOMERS"
        description="What they have to say"
        buttonText="Testimonials"
        buttonCallback={() => props.history.push('/testimonials')}
        image={happyCustomer}
      ></ImageSection>
      <ImageSection
        title="ABOUT US"
        description="Meet our specialists"
        buttonText="FIND OUT MORE"
        buttonCallback={() => props.history.push('/aboutus')}
        image={flooring1}
      ></ImageSection>
    </StyledHomeWrapper>
  );
}

export default withRouter(Home);
