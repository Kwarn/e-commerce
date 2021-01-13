import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button/Button';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledImageContainer = styled.div`
  margin: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  .image {
    min-height: 350px;
    width: 100%;
    object-fit: cover;
  }
  width: 95%;
  height: 100%;
  max-width: 350px;
  max-height: 350px;
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
  font-weight: 900;
  top: 30%;
`;

const StyledDescription = styled.p`
  font-size: 1.1em;
  width: 80%;
  position: absolute;
  bottom: 30%;
`;

export default function MenuCard({
  title,
  description,
  textColor = 'white',
  buttonText = null,
  buttonCallback,
  image,
}) {
  const layouts = useContext(LayoutsContext);

  let btn = null;
  if (buttonText) {
    btn = (
      <StyledButtonContainer>
        <Button callback={buttonCallback} text={buttonText} />
      </StyledButtonContainer>
    );
  }

  return (
    <StyledImageContainer {...layouts} textColor={textColor}>
      <img className="image" src={image} alt="Welcome" />
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      {btn}
    </StyledImageContainer>
  );
}
