import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  height: 85vh;
  text-align: center;
  background-color: white;
`;

const StyledImage = styled.img`
  height: 60%;
  width: 100%;
  object-fit: cover;
`;

const StyledTextContainer = styled.div`
  padding: 0px 15px 0px 15px;
  height: 40%;
  .h1 {
    margin: auto;
    color: white;
    font-weight: 900;
  }
  .p {
    margin: auto;
  }
`;

export default function PageHeader({ title, desc, image }) {
  return (
    <StyledWrapper>
      <StyledImage src={image} />
      <StyledTextContainer>
        <h1>{title}</h1>
        <p>{desc}</p>
      </StyledTextContainer>
    </StyledWrapper>
  );
}
