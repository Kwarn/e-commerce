import React from 'react';
import styled from 'styled-components';

const StyledTextSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 30vh;
  width: 100%;
  .centered {
    justify-self: center;
    text-align: center;
    margin: auto 5% auto 5%;
    display: block;
    bottom: 0px;
    top: 0px;
  }
  h1 {
    font-size: 1.4em;
  }
  p {
    margin: auto;
  }
`;

export default function TextSection({ h1, p }) {
  return (
    <StyledTextSection>
      <div className="centered">
        <h1>{h1}</h1>
        <p>{p}</p>
      </div>
    </StyledTextSection>
  );
}
