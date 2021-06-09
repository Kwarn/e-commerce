import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { AuthStateContext } from '../../../Auth/AuthStateProvider';

const StyledContainer = styled.div`
  color: #ad5d32;
  margin: 6vh 250px 0 0;
  display: flex;
`;

const StyledLink = styled.a`
  margin: auto;
  color: inherit;
`;
const StyledDivider = styled.h3`
  margin: auto 10px auto 10px;
`;

export default function ExtraNavItems() {
  const { authState } = useContext(AuthStateContext);
  const history = useHistory();
  return (
    <StyledContainer>
      <StyledLink href="https://goo.gl/maps/9n7kboFp7JqX23WB8" target="_blank">
        How to find us
      </StyledLink>
      <StyledDivider>|</StyledDivider>
      <StyledLink>Speak with us: 03333 110 888</StyledLink>
      <StyledDivider>|</StyledDivider>
      <StyledLink
        onClick={() => {
          if (authState.userId) history.push('/admin');
          else console.log('Not logged in');
        }}
      >
        Admin
      </StyledLink>
    </StyledContainer>
  );
}
