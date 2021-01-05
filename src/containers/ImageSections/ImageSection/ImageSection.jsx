import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/button/Button';
import { mediaQueries } from '../../../mediaQueries/mediaQueries';

const StyledImageContainer = styled.div`
  margin: 10px 0 10px 0;
  position: relative;
  display: flex;
  justify-content: center;
  max-width: ${props => (props.shouldFillWidth ? '100%' : '350px')};
  .image {
    min-height: ${props => (props.shouldFillWidth ? '25em' : '20em')};
    width: ${props => (props.shouldFillWidth ? '100%' : '95%')};
    margin: auto;
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
  shouldFillWidth = false,
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
      shouldFillWidth={shouldFillWidth}
    >
      <img className="image" src={image} alt="Welcome" />
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      {btn}
    </StyledImageContainer>
  );
}
