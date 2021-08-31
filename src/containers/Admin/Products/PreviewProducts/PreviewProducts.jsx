import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useCleanupHelper } from "../../../../Hooks/Helper/useCleanupHelper";
import { useDeleteProduct } from "../../../../Hooks/Products/useDeleteProduct";
import { useGetProducts } from "../../../../Hooks/Products/useGetProducts";
import ProductForm from "../AddEditProduct/AddEditProduct";
import LayoutsContext from "../../../../Layout/LayoutsContext";
import PreviewProductElement from "./PreviewProduct";

const StyledPreviewProductElementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPreviewProductElementsContainer = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`;

const StyledFormContainer = styled.div``;

export default function PreviewProducts() {
  const [previewElements, setPreviewElements] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const layouts = useContext(LayoutsContext);
  const deleteProduct = useDeleteProduct();
  const cleanupHelper = useCleanupHelper();
  const products = useGetProducts("all");
  useEffect(() => {
    if (products) {
      const _previewElements = products.map((product) => (
        <PreviewProductElement
          key={product.title}
          title={product.title}
          image={product.imageUrls[0]}
          deleteProductCallback={() =>
            deleteProductHandler(product.title, product._id)
          }
          editProductCallback={() => editProductHandler(product)}
        />
      ));
      setPreviewElements(_previewElements);
    }
  }, [products]);

  const deleteProductHandler = (title, productId) => {
    const warningMsg = `WARNING: Are you sure you want to delete ${title}? Deleting this product is irreversible!`;
    if (window.confirm(warningMsg)) deleteProduct({ variables: { productId } });
  };

  const editProductHandler = (product) => {
    setEditProduct(product);
  };

  const cleanupHelperFn = () => {
    const productIdArray = products.map((product) => product._id);
    cleanupHelper({ variables: { productIdArray } });
  };

  return (
    <StyledPreviewProductElementsWrapper>
      <StyledPreviewProductElementsContainer {...layouts}>
        {previewElements}
        <button onClick={cleanupHelperFn}>
          Clean User Model of non-existing products
        </button>
      </StyledPreviewProductElementsContainer>
      {editProduct ? (
        <StyledFormContainer>
          <ProductForm
            editProductData={editProduct}
            doneEditingCb={() => editProductHandler(null)}
          />
        </StyledFormContainer>
      ) : null}
    </StyledPreviewProductElementsWrapper>
  );
}
