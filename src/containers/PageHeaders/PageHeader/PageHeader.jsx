import React from 'react';
import styled from 'styled-components';

const StyledHeaderWrapper = styled.div`
  background-color: white;
  color: #474747;
  text-align: center;
  min-width: 100%;
`;

const StyledImage = styled.img`
  height: 55vh;
  width: 100%;
  object-fit: cover;
`;

const StyledTextWrapper = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  width: 90%;
  margin: auto;
  .h2 {
    font-weight: 900;
  }
`;

export default function PageHeader({ title, desc, image }) {
  return (
    <StyledHeaderWrapper>
      <StyledImage src={image} />
      <StyledTextWrapper>
        <Text>
          <h2>{title}</h2>
          <p>{desc}</p>
        </Text>
      </StyledTextWrapper>
    </StyledHeaderWrapper>
  );
}
