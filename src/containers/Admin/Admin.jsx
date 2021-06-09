import React from 'react';
import styled from 'styled-components';

const StyledAdminWrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  h1 {
    color: black;
  }
`;

export default function Admin() {
  return (
    <StyledAdminWrapper>
      <h1>Admin</h1>
    </StyledAdminWrapper>
  );
}
