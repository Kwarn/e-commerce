import React, { useContext } from 'react';
import styled from 'styled-components';
import LayoutContext from '../../Layout/LayoutsContext';
// import background from '../../assets/'
/* background-image: url(${background});
background-size: cover; */

const StyledPageWrapper = styled.div`
  padding-top: ${props => (props.isDesktop ? '5vh' : 0)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #eee;
  min-height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
  h2 {
    margin: auto;
    font-size: 4em;
    color: black;
  }
`;

export default function Testimonials() {
  const layouts = useContext(LayoutContext);
  return (
    <StyledPageWrapper {...layouts}>
      <h2>Under Construction</h2>
    </StyledPageWrapper>
  );
}
