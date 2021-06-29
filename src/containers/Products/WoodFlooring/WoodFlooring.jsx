import React, { useContext, useState, useEffect } from 'react';
import PageHeaders from '../../PageHeaders/PageHeaders';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';
// import { lightwoodSliderData } from '../woodFlooringData';
// import ProductSlider from '../ProductSliders/ProductSlider';
import Modal from '../../../components/UI/Modal/Modal';
import { useGetProducts } from '../../../Hooks/Products/useGetProducts';
import MenuCard from '../../MenuCards/MenuCard/MenuCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StyledTopMarginSpacer = styled.div`
  margin-top: 10vh;
`;

const StyledProductElementsContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.isDesktop ? 'row' : 'column')};
  width: 100%;
`;

export default function WoodFlooring() {
  const { woodFlooringHeader } = PageHeaders();
  const layouts = useContext(LayoutsContext);
  const [productElements, setProductElements] = useState([]);
  const [modalStatus, setModalStatus] = useState({
    isShown: false,
    content: null,
  });

  const products = useGetProducts('woodFlooring');
  console.log('products :>> ', products);
  useEffect(() => {
    let _productElements;
    if (products) {
      _productElements = products.map(product => (
        <MenuCard
          key={product._id}
          title={product.title}
          description={product.description}
          image={product.imageUrls[0]}
          buttonText="See Full Images"
          buttonCallback={() =>
            setModalStatus({
              isShown: true,
              content: product.imageUrls,
            })
          }
        />
      ));
      setProductElements(_productElements);
    }
  }, [products]);

  const closeModalHandler = () => {
    setModalStatus({ isShown: false, content: { ...modalStatus.content } });
  };

  // const LightWoodSlider = (
  //   <ProductSlider
  //     slideData={lightwoodSliderData}
  //     callback={imagesIndex =>
  //       setModalStatus({
  //         isShown: true,
  //         content: lightwoodSliderData.modalImageSets[imagesIndex],
  //       })
  //     }
  //   />
  // );

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
        <StyledProductElementsContainer {...layouts}>
          {productElements}
        </StyledProductElementsContainer>
        <StyledTopMarginSpacer />
      </Wrapper>
    </>
  );
}
