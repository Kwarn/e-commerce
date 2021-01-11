import React from 'react';
import styled from 'styled-components';

const StyledDrawToggle = styled.div`
  margin-top: ${props => (props.mobile ? '5vh' : props.tablet ? '4vh' : null)};
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

const DrawToggle = ({ layoutMode, toggleFn }) => (
  <StyledDrawToggle
    mobile={layoutMode === 'mobile'}
    tablet={layoutMode === 'tablet'}
    onClick={toggleFn}
  >
    <div></div>
    <div></div>
    <div></div>
  </StyledDrawToggle>
);
export default DrawToggle;
