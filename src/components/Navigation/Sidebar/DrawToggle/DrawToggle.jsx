import React from 'react';
import styled from 'styled-components';

const StyledDrawToggle = styled.div`
  margin: 6vh 0 0 0;
  width: 40px;
  height: 5vh;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  div {
    width: 90%;
    height: 3px;
    background-color: #474747;
  }
`;

const DrawToggle = ({ toggleFn }) => (
  <StyledDrawToggle onClick={toggleFn}>
    <div></div>
    <div></div>
    <div></div>
  </StyledDrawToggle>
);
export default DrawToggle;
