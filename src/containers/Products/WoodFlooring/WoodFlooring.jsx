import React, { useContext, useState } from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';
import woodFlooringData, { lightwoodSliderData } from '../woodFlooringData';
import ProductSlider from '../ProductSliders/ProductSlider';
import Modal from '../../../components/UI/Modal/Modal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledTopMarginSpacer = styled.div`
  margin-top: 10vh;
`;

const StyledProductSliderGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.isDesktop ? 'row' : 'column')};
  width: 100%;
`;

export default function WoodFlooring() {
  const layouts = useContext(LayoutsContext);
  const { woodFlooringHeader } = PageHeaders();
  const [tooltipStatus, setToolTipStatus] = useState({});
  const [modalStatus, setModalStatus] = useState({
    isShown: false,
    content: null,
  });

  const closeModalHandler = () => {
    setModalStatus({ isShown: false, content: { ...modalStatus.content } });
  };

  const LightWoodSlider = (
    <ProductSlider
      slideData={lightwoodSliderData}
      callback={imagesIndex =>
        setModalStatus({
          isShown: true,
          content: lightwoodSliderData.modalImageSets[imagesIndex],
        })
      }
    />
  );

  return (
    <>
      <Wrapper {...layouts}>
        <Modal
          isVisible={modalStatus.isShown && modalStatus.content}
          closeFn={() => closeModalHandler()}
        >
          {modalStatus.content}
        </Modal>
        {woodFlooringHeader}
        <StyledTopMarginSpacer />
        <StyledProductSliderGroup {...layouts}>
          {LightWoodSlider}
        </StyledProductSliderGroup>
        {/* <StyledProductSliderGroup {...layouts}>
          {ProductCardElements.walnut}
          {ProductCardElements.warwickCastle}
        </StyledProductSliderGroup> */}
        <StyledTopMarginSpacer />
      </Wrapper>
    </>
  );
}
