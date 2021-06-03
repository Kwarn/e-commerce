import React, { useContext, useState } from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';
import woodFlooringData from '../woodFlooringData';
import ProductSlider from '../ProductSliders/ProductSlider';
import lightbulb from '../../../assets/lightbulb.png';

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
  .lightbulb {
    transition: 0.3s;
    z-index: 2;
    position: absolute;
    color: #474747;
    right: calc(50% - 30px);
    bottom: calc(50% - 20px);
    width: 60px;
    height: 60px;
    &:hover:hover {
      opacity: 0;
    }
  }
  .show {
    opacity: 1;
  }
  .hide {
    opacity: 0;
  }

  h1 {
    color: #fff;
    width: ${props => (props.isDesktop ? '80%' : '100%')};
    margin: auto;
    background-color: #474747;
    padding: 0;
  }
  section {
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: 0.8s;
    z-index: 2;
    font-weight: 500;
    font-size: larger;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    position: absolute;
    top: ${props =>
      props.isDesktop ? 'calc(50% - (50% / 2))' : 'calc(50% - (70% / 2))'};
    left: ${props =>
      props.isDesktop ? 'calc(50% - (50% / 2))' : 'calc(50% - (70% / 2))'};
    width: ${props => (props.isDesktop ? '50%' : '70%')};
    height: ${props => (props.isDesktop ? '50%' : '70%')};
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
`;

const StyledProductSliderGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.isDesktop ? 'row' : 'column')};
  width: 100%;
`;

export default function WoodFlooring({ productCardElements }) {
  const [isToolTipShown, setIsToolTipShown] = useState(false);
  const [isLightbulbShown, setIsLightbulbShown] = useState(true);
  const layouts = useContext(LayoutsContext);
  const { woodFlooringHeader } = PageHeaders();
  const ProductCardElements = {};
  for (let product of woodFlooringData) {
    ProductCardElements[product.title] = (
      <StyledProductSliderWrapper {...layouts}>
        <h1>{product.title.toUpperCase()}</h1>
        <ProductSlider
          key={product.images[0]}
          productTitle={product.title}
          images={product.images}
        />
        <img
          onClick={() => setIsToolTipShown(true)}
          onMouseEnter={() => setIsToolTipShown(true)}
          onMouseLeave={() => setIsToolTipShown(false)}
          className={`lightbulb ${isLightbulbShown ? '' : 'hide'}`}
          src={lightbulb}
          alt="lightbulb"
        />
        <section
          onMouseLeave={() => setIsLightbulbShown(false)}
          className={isToolTipShown ? 'show' : 'hide'}
          {...layouts}
        >
          <p>{product.desc ? product.desc : null}</p>
        </section>
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
