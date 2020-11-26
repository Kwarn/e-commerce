import React from 'react';
import styled from 'styled-components';
import ImageSection from '../../components/ImageSection/ImageSection';
import welcomeImage from '../../assets/welcomeImage.jpg';

const StyledHomeWrapper = styled.div`
  display: flex;
  max-width: 100%;
`;

export default function Home() {
  return (
    <StyledHomeWrapper>
      <ImageSection
        title="BIG TIME WOOD - LOREM IPSUM"
        description="Providing hard wood on the floor"
        buttonText="Explore"
        image={welcomeImage}
      ></ImageSection>
    </StyledHomeWrapper>
  );
}
