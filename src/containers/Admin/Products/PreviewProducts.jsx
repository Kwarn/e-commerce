import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useDeleteProduct } from '../../../Hooks/Products/useDeleteProduct';
import { useGetProducts } from '../../../Hooks/Products/useGetProducts';
import LayoutsContext from '../../../Layout/LayoutsContext';
import PreviewProductElement from './PreviewProductElement';

const StyledPreviewProductElementsContainer = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`;

export default function PreviewProducts() {
  const layouts = useContext(LayoutsContext);
  const deleteProduct = useDeleteProduct();
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
          deleteProductCallback={() =>
            deleteProductHandler(product.title, product._id)
          }
          editProductCallback={() => editProductHandler(product._id)}
        />
      ));
      setProductElements(_productElements);
    }
  }, [products]);

  const deleteProductHandler = (title, productId) => {
    if (
      window.confirm(
        `WARNING: Are you sure you want to delete ${title}? Deleting this product is irreversible!`
      )
    ) {
      console.log('productId :>> ', productId);
      deleteProduct({ variables: { productId } });
    } else {
      console.log('Delete Cancelled :>> ');
    }
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
