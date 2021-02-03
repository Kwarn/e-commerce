import React from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export default function TongueAndGroove() {
  const { tongueAndGrooveHeader } = PageHeaders();
  return <StyledWrapper>{tongueAndGrooveHeader}</StyledWrapper>;
}
