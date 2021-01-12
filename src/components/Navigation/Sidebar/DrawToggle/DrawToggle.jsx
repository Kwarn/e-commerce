import React, { useContext } from 'react';
import styled from 'styled-components';
import LayoutsContext from '../../../../Layout/LayoutsContext';

const StyledDrawToggle = styled.div`
  margin-top: ${props =>
    props.isMobile ? '5vh' : props.isTablet ? '4vh' : null};
  margin-left: 5vw;
  width: 40px;
  height: 5vh;
  display: ${props => (props.isDesktop ? 'none' : 'flex')};
  flex-flow: column;
  justify-content: space-around;
  box-sizing: border-box;
  cursor: pointer;
  div {
    width: 90%;
    height: 3px;
    background-color: #474747;
  }
`;

const DrawToggle = ({ toggleFn }) => {
  const layouts = useContext(LayoutsContext);
  return (
    <StyledDrawToggle {...layouts} onClick={toggleFn}>
      <div></div>
      <div></div>
      <div></div>
    </StyledDrawToggle>
  );
};
export default DrawToggle;
