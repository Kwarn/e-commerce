import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledFooterWrapper = styled.div`
  display: flex;
  min-width: 100%;
  height: 30vh;
  background-color: #474747;
  color: white;
`;

const StyledLinksContainer = styled.div`
  padding: 10px;
  width: 100%;
`;
const StyledSectionTitle = styled.h1`
  font-size: 1.2em;
`;
const StyledLink = styled.p`
  &:hover {
    background-color: #4747;
  }
  cursor: pointer;
  margin: 5px auto 5px auto;
`;

const Footer = ({ history }) => {
  return (
    <StyledFooterWrapper>
      <StyledLinksContainer>
        <StyledSectionTitle>Information</StyledSectionTitle>
        <StyledLink onClick={() => history.push('/about')}>About</StyledLink>
        <StyledLink onClick={() => history.push('/support')}>
          Support
        </StyledLink>
        <StyledLink onClick={() => history.push('/faq')}>FAQs</StyledLink>
      </StyledLinksContainer>
    </StyledFooterWrapper>
  );
};

export default withRouter(Footer);
