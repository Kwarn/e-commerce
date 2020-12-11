import React from 'react';
import styled from 'styled-components';
import TextSections from '../TextSections/TextSections';
import ImageSections from '../ImageSections/ImageSections';
import { withRouter } from 'react-router-dom';
import { mediaQueries } from '../../mediaQueries/mediaQueries';

const StyledHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
`;

function Home(props) {
  const { welcomeElement, testimonials, aboutUs } = ImageSections();
  return (
    <StyledHomeWrapper>
      {welcomeElement}
      {testimonials}
      {aboutUs}
    </StyledHomeWrapper>
  );
}

export default withRouter(Home);
