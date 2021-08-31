import React, { useState } from "react";
import styled from "styled-components";
import PreviewProducts from "./Products/PreviewProducts/PreviewProducts";

import ProductForm from "./Products/AddEditProduct/AddEditProduct";

const StyledAdminWrapper = styled.div`
  /* margin: auto; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    color: black;
  }
`;

// TO DO: FIX MARGIN PROBLEMS FROM LAYOUT
const StyledToggleDisplayElement = styled.button`
  margin-top: 14vh;
`;

export default React.memo(function Admin() {
  const [displayElement, setDisplayElement] = useState("addProduct");
  return (
    <StyledAdminWrapper>
      <StyledToggleDisplayElement
        onClick={() =>
          setDisplayElement(
            displayElement === "addProduct" ? "previewProducts" : "addProduct"
          )
        }
      >
        {displayElement === "addProduct" ? "Preview Products" : "Add Products"}
      </StyledToggleDisplayElement>
      {displayElement === "addProduct" ? <ProductForm /> : <PreviewProducts />}
    </StyledAdminWrapper>
  );
});
