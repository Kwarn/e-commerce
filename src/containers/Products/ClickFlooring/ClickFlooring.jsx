import React, { useContext } from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export default function ClickFlooring() {
  const layouts = useContext(LayoutsContext);
  const { clickFlooringHeader } = PageHeaders();
  return (
    <>
      <Wrapper {...layouts}>
        {clickFlooringHeader}
      </Wrapper>
    </>
  );
}
