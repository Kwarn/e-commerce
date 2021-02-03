import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';

const StyledLogo = styled.img`
  cursor: pointer;
  margin: auto;
  max-height: 80%;
`;

export default function LogoNavItem() {
  const history = useHistory();
  const logoComponent = (
    <StyledLogo
      src={logo}
      alt="Twelve Oak"
      onClick={() => history.push('/home')}
    />
  );

  return logoComponent;
}
