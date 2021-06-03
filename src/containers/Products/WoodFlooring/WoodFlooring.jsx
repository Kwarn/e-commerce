import React, { useContext, useState } from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';
import woodFlooringData from '../woodFlooringData';
import ProductSlider from '../ProductSliders/ProductSlider';
import lightbulb from '../../../assets/lightbulb.png';
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
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 40vh;

  h1 {
    color: #fff;
    width: ${props => (props.isDesktop ? '80%' : '100%')};
    margin: auto;
    background-color: #474747;
    padding: 0;
  }
  section {
    opacity: ${props => (props.tooltipStatus ? '1' : '0')};
    pointer-events: ${props => (props.isMobile ? 'none' : 'all')};
    display: flex;
    justify-content: center;
    transition: 0.8s;
    z-index: 2;
    font-weight: 500;
    font-size: larger;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    position: absolute;
    top: ${props =>
      props.isDesktop ? 'calc(50% - (50% / 2))' : 'calc(50% - (50% / 2))'};
    left: ${props =>
      props.isDesktop ? 'calc(50% - (50% / 2))' : 'calc(50% - (70% / 2))'};
    width: ${props => (props.isDesktop ? '50%' : '70%')};
    height: ${props => (props.isDesktop ? '50%' : '50%')};
    &:hover:hover {
      opacity: 1;
    }
    p {
      font-size: ${props => (props.isMobile ? 'small' : '0.9em')};
      width: 80%;
      text-align: left;
      margin: auto;
    }
  }
  .infoBtn {
    position: absolute;
    z-index: 2;
    height: 40px;
    width: 100px;
    bottom: 70px;
    left: calc(50% - 50px);
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

const StyledMaximiseButton = styled.img`
  border: 3px solid red;
  z-index: 2;
  display: absolute;
  width: 40px;
  height: 40px;
`;
export default function WoodFlooring({ productCardElements }) {
  const layouts = useContext(LayoutsContext);
  const { woodFlooringHeader } = PageHeaders();
  const [tooltipStatus, setToolTipStatus] = useState({});

  const ProductCardElements = {};
  for (const [idx, product] of woodFlooringData.entries()) {
    ProductCardElements[product.title] = (
      <StyledProductSliderWrapper
        index={idx}
        tooltipStatus={tooltipStatus[idx]}
        {...layouts}
      >
        <h1>{product.title.toUpperCase()}</h1>
        <ProductSlider
          onClick={() =>
            setToolTipStatus({ ...tooltipStatus, [idx]: !tooltipStatus[idx] })
          }
          key={product.images[0]}
          productTitle={product.title}
          images={product.images}
        />
        <section>
          <p>{product.desc ? product.desc : null}</p>
        </section>
        {layouts.isMobile || layouts.isTablet ? (
          <StyledButtonWrapper
            className="infoBtn"
            onClick={() =>
              setToolTipStatus({ ...tooltipStatus, [idx]: !tooltipStatus[idx] })
            }
          >
            <StyledMaximiseButton src={maximizeIcon} alt="Maximize" />
            <Button
              emFontSize="0.8"
              text={`${
                !tooltipStatus[idx] ? 'Show Description' : 'Hide Decriptions'
              }`}
            />
          </StyledButtonWrapper>
        ) : null}
      </StyledProductSliderWrapper>
    );
  }

  return (
    <>
      <Wrapper {...layouts}>
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
