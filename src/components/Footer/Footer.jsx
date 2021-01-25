import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import LayoutsContext from '../../Layout/LayoutsContext';

const StyledSectionsContainer = styled.div`
  background-color: #474747;
  color: #b8b8b8;
  min-width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
`;

const StyledSection = styled.div`
  margin: auto 10px auto 10px;
`;
const StyledSectionTitle = styled.h1`
  font-size: 1.2em;
`;
const StyledLink = styled.p`
  &:hover {
    color: white;
  }
  cursor: pointer;
  margin: 8px auto 8px auto;
`;

const StyledCopyRight = styled.div`
  background-color: #474747;
  color: #b8b8b8;
  text-align: center;
  width: auto;
  padding: 25px;
  p {
    margin: 0;
    padding: 0;
  }
`;

const StyledExternalLink = styled.a`
  text-decoration: none;
  color: #ccc;
  &:hover {
    color: white;
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
            Order Your Free Twelve Oak Flooring Samples
          </StyledLink>
          <StyledLink onClick={() => history.push('/faq')}>
            How To Buy Your Twelve Oak Flooring
          </StyledLink>
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Information</StyledSectionTitle>
          <StyledLink onClick={() => history.push('/about')}>About</StyledLink>
          <StyledLink onClick={() => history.push('/support')}>
            Support
          </StyledLink>
          <StyledLink onClick={() => history.push('/faq')}>FAQs</StyledLink>
        </StyledSection>
      </StyledSectionsContainer>
      <StyledCopyRight>
        <p>
          Website design and build by{' '}
          <StyledExternalLink target="_blank" href="https://karlwarner.dev">
            Karl Warner
          </StyledExternalLink>
        </p>
        <p>Copyright 2021© Twelve Oak®. All rights reserved.</p>
      </StyledCopyRight>
    </>
  );
};

export default withRouter(Footer);
