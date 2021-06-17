import React from 'react';
import styled from 'styled-components';

import ProductForm from './ProductForm';

const StyledAdminWrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    color: black;
  }
`;

export default React.memo(function Admin() {
  return (
    <StyledAdminWrapper>
      <ProductForm />
    </StyledAdminWrapper>
  );
});
