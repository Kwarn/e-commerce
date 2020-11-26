import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';

const StyledImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 200px;
  .image {
    width: 100%;
    height: 90%;
    margin: auto;
    object-fit: cover;
  }
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  width: 100px;
  height: 40px;
  bottom: 20%;
  left: 10%;
`;

const StyledTitle = styled.h1`
  font-size: 1.8em;
  width: 80%;
  color: white;
  position: absolute;
  top: 10%;
`;

const StyledDescription = styled.p`
  width: 80%;
  color: white;
  position: absolute;
  bottom: 35%;
`;

export default function ImageSection({
  title,
  description,
  buttonText = null,
  image,
}) {
  let btn = null;
  if (buttonText) {
    btn = (
      <StyledButtonContainer>
        <Button text={buttonText} />
      </StyledButtonContainer>
    );
  }

  return (
    <StyledImageContainer>
      <img className="image" src={image} alt="Welcome" />
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      {btn}
    </StyledImageContainer>
  );
}
