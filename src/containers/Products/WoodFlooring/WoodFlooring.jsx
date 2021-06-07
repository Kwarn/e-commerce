import React, { useContext, useState } from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';
import woodFlooringData from '../woodFlooringData';
import ProductSlider from '../ProductSliders/ProductSlider';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import maximizeIcon from '../../../assets/maximizeIcon.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledTopMarginSpacer = styled.div`
  margin-top: 10vh;
`;

const StyledProductSliderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  width: 100%;
  min-height: 40vh;
  img {
    position: absolute;
    cursor: pointer;
    z-index: 2;
    width: 40px;
    height: 40px;
    top: 5px;
    right: ${props => (props.isDesktop ? 'calc(10% + 5px)' : '5px')};
  }

  section {
    opacity: ${props => (props.tooltipStatus ? '0' : '1')};
    pointer-events: ${props => (props.isMobile ? 'none' : 'all')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.8s;
    z-index: 2;
    font-weight: 500;
    font-size: larger;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 90px;
    left: ${props =>
      props.isDesktop
        ? 'calc(50% - (50% / 2) - 5px)'
        : 'calc(50% - (70% / 2))'};
    width: ${props => (props.isDesktop ? '50%' : '70%')};
    height: fit-content;
    h3 {
      margin: 10px auto auto auto;
    }
    p {
      padding: 10px;
      font-size: ${props =>
        props.isDesktop ? '1em' : props.isTablet ? '0.9em' : '0.8em'};
      width: 80%;
      text-align: left;
      margin: auto;
    }
    &:hover:hover {
      opacity: 0;
    }
  }
`;

const StyledProductSliderGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.isDesktop ? 'row' : 'column')};
  width: 100%;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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

  const ProductCardElements = {};
  for (const [idx, product] of woodFlooringData.entries()) {
    ProductCardElements[product.title] = (
      <StyledProductSliderWrapper
        index={idx}
        tooltipStatus={tooltipStatus[idx]}
        {...layouts}
      >
        <ProductSlider
          onClick={() =>
            setToolTipStatus({ ...tooltipStatus, [idx]: !tooltipStatus[idx] })
          }
          key={product.images[0]}
          productTitle={product.title}
          images={product.images}
        />
        <img
          onClick={() =>
            setModalStatus({ isShown: true, content: product.images })
          }
          src={maximizeIcon}
          alt="Maximize"
        />
        <section>
          <h3>{product.title.toUpperCase()}</h3>
          <p>{product.desc ? product.desc : null}</p>
        </section>
      </StyledProductSliderWrapper>
    );
  }

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
        {ProductCardElements['Grey Bark']}
        <StyledTopMarginSpacer />
        <StyledProductSliderGroup {...layouts}>
          {ProductCardElements['Walnut']}
          {ProductCardElements['Warwick Castle']}
        </StyledProductSliderGroup>
        <StyledTopMarginSpacer />
      </Wrapper>
    </>
  );
}
