import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useGetProducts } from '../../Hooks/Products/useGetProducts';
import LayoutsContext from '../../Layout/LayoutsContext';
import PreviewProductElement from './PreviewProductElement';

const StyledPreviewProductElementsContainer = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: ${props => (props.isMobile ? 'column' : 'row')}; */
  max-width: 100%;
`;

export default function PreviewProducts() {
  const layouts = useContext(LayoutsContext);
  const [productElements, setProductElements] = useState([]);
  const products = useGetProducts('all');
  useEffect(() => {
    if (products) {
      console.log('products :>> ', products);
      const _productElements = products.map(product => (
        <PreviewProductElement
          key={product.title}
          title={product.title}
          image={product.imageUrls[0]}
          deleteProductCallback={() => deleteProductHandler(product._id)}
          editProductCallback={() => editProductHandler(product._id)}
        />
      ));
      setProductElements(_productElements);
    }
  }, [products]);

  const deleteProductHandler = productId => {
    console.log('productId :>> ', productId);
  };

  const editProductHandler = productId => {
    console.log('productId :>> ', productId);
  };

  return (
    <StyledPreviewProductElementsContainer {...layouts}>
      {productElements}
    </StyledPreviewProductElementsContainer>
  );
}
