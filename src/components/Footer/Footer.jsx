import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import LayoutsContext from '../../Layout/LayoutsContext';

const StyledSectionsContainer = styled.div`
  background-color: #eee;
  color: #474747;
  min-width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
`;

const StyledSection = styled.div`
  margin: 10px;
`;
const StyledSectionTitle = styled.h1`
  font-size: 1.2em;
  margin: 10px;
`;
const StyledLink = styled.p`
  &:hover {
    color: white;
  }
  cursor: pointer;
  margin: 10px;
`;

const StyledCopyRight = styled.div`
  font-size: 0.7em;
  background-color: #eee;
  color: #474747;
  text-align: center;
  width: auto;
  padding: 10px;
  p {
    margin: 0;
    padding: 0;
  }
`;

const StyledExternalLink = styled.a`
  text-decoration: underline;
  color: #474747;
  &:hover {
    color: black;
  }
`;

const Footer = ({ history }) => {
  const layouts = useContext(LayoutsContext);
  return (
    <>
      <StyledSectionsContainer {...layouts}>
        <StyledSection>
          <StyledSectionTitle>Store</StyledSectionTitle>
          <StyledLink onClick={() => history.push('/products')}>
            Products
          </StyledLink>
          <StyledLink onClick={() => history.push('/contact')}>
            Get a quote
          </StyledLink>
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Information</StyledSectionTitle>
          <StyledLink onClick={() => history.push('/about')}>About</StyledLink>
          <StyledLink onClick={() => history.push('/support')}>
            Support
          </StyledLink>
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Customer Service</StyledSectionTitle>
          <StyledLink onClick={() => history.push('/contact')}>
            Contact us
          </StyledLink>
          <StyledLink onClick={() => history.push('/contact')}>
            Book online consultation
          </StyledLink>
        </StyledSection>
      </StyledSectionsContainer>
      <StyledCopyRight>
        <p>
          Website design and build by{' '}
          <StyledExternalLink target="_blank" href="https://karlwarner.dev">
            Karl Warner
          </StyledExternalLink>
        </p>
        <p>Copyright 2021© Q&Y®. All rights reserved.</p>
      </StyledCopyRight>
    </>
  );
};

export default withRouter(Footer);
