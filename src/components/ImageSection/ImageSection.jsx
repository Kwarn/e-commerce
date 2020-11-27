import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';

const StyledImageContainer = styled.div`
  margin: 10px 0 10px 0;
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 200px;
  .image {
    width: 100%;
    margin: auto;
    object-fit: cover;
  }
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  width: fit-content;
  height: 40px;
  bottom: 25%;
  left: 10%;
`;

const StyledTitle = styled.h1`
  background: rgba(0, 0, 0, 0.2);
  font-size: 1.5em;
  width: 80%;
  color: white;
  position: absolute;
  top: 20%;
  font-weight: 100;
`;

const StyledDescription = styled.p`
  font-size: 1.1em;
  width: 80%;
  color: white;
  position: absolute;
  bottom: 35%;
`;

export default function ImageSection({
  title,
  description,
  buttonText = null,
  buttonCallback,
  image,
}) {
  let btn = null;
  if (buttonText) {
    btn = (
      <StyledButtonContainer>
        <Button callback={buttonCallback} text={buttonText} />
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
