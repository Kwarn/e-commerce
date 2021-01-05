import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/button/Button';
import { mediaQueries } from '../../../mediaQueries/mediaQueries';

const StyledImageContainer = styled.div`
  margin: 5px 5px 5px 5px;
  position: relative;
  display: flex;
  justify-content: center;
  width: ${props => (props.isWelcomeElement ? '100%' : '95%')};
  height: ${props => (props.isWelcomeElement ? '85vh' : '95%')};
  max-width ${props => (props.isWelcomeElement ? '100%' : '350px')};;
  max-height: ${props => (props.isWelcomeElement ? '100%' : '350px')};
  .image {
    min-width: 100%;
    object-fit: cover;
  }
  color: ${props => (props.textColor === 'black' ? 'black' : 'white')};
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  width: fit-content;
  height: 40px;
  bottom: 20%;
  left: 10%;
`;

const StyledTitle = styled.h1`
  width: fit-content;
  font-size: 1.5em;
  width: 80%;
  position: absolute;
  top: 40%;
  font-weight: 900;
`;

const StyledDescription = styled.p`
  font-size: 1.1em;
  width: 80%;
  position: absolute;
  bottom: 30%;
`;

export default function ImageSection({
  title,
  description,
  textColor = 'white',
  buttonText = null,
  buttonCallback,
  isWelcomeElement = false,
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
    <StyledImageContainer
      textColor={textColor}
      isWelcomeElement={isWelcomeElement}
    >
      <img className="image" src={image} alt="Welcome" />
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      {btn}
    </StyledImageContainer>
  );
}
