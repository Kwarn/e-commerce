import React, { useContext } from 'react';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledMobileHeader = styled.div`
  width: 100%;
  height: 22vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ background }) => background});
`;

const StyledMobileTextArea = styled.div`
  width: 100%;
  height: 28vh;
`;

const StyledDesktopAndTabletHeader = styled.div`
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: top;
  background-image: url(${({ background }) => background});
  width: 100%;
  min-height: 44vh;
  font-family: Arial, Helvetica;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
`;

const StyledFrostedGlass = styled.div`
  padding: 0 10px 0 10px;
  display: flex;
  justify-content: center;
  position: relative;
  width: ${props =>
    props.isDesktop ? '600px' : props.isTablet ? '400px' : '300px'};
  height: 200px;
  top: calc(50% - 100px);
  background: inherit;
  overflow: hidden;

  &:after {
    content: '';
    width: ${props =>
      props.isDesktop ? '650px' : props.isTablet ? '550px' : '250px'};
    height: ${props =>
      props.isDesktop ? '300px' : props.isTablet ? '260px' : '220px'};
    background: inherit;
    position: absolute;
    left: -25px;
    top: -25px;
    box-shadow: inset 0 0 0 2000px rgba(255, 255, 255, 0.4);
    filter: blur(10px);
  }
`;

const Text = styled.div`
  padding: 20px;
  font-size: ${props =>
    props.isDesktop ? '1em' : props.isTablet ? '0.9em' : '1em'};
  text-align: center;
  z-index: 10;
  margin: auto;
  .h2 {
    font-weight: 900;
  }
`;

export default function PageHeader({ title, desc, image }) {
  const layouts = useContext(LayoutsContext);

  const mobileHeader = (
    <>
      <StyledMobileHeader {...layouts} background={image}></StyledMobileHeader>
      <StyledMobileTextArea>
        <Text>
          <h2>{title}</h2>
          <p>{desc}</p>
        </Text>
      </StyledMobileTextArea>
    </>
  );

  const desktopAndTablet = (
    <StyledDesktopAndTabletHeader {...layouts} background={image}>
      <StyledFrostedGlass {...layouts}>
        <Text {...layouts}>
          <h2>{title}</h2>
          <p>{desc}</p>
        </Text>
      </StyledFrostedGlass>
    </StyledDesktopAndTabletHeader>
  );

  return layouts.isDesktop || layouts.isTablet
    ? desktopAndTablet
    : mobileHeader;
}
