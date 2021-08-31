import React, { useContext, useState } from "react";
import { AuthStateContext } from "../../../../Auth/AuthStateProvider";
import { useCreateProduct } from "../../../../Hooks/Products/useCreateProduct";
import { useUpdateProduct } from "../../../../Hooks/Products/useUpdateProduct";
import Spinner from "../../../../components/UI/spinner/Spinner";
import FilePickerPreviewer from "./FilePicker";
import TextForm from "./TextForm";
import styled from "styled-components";

const StyledProductFormWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledInvalidFormErrorMessages = styled.div`
  color: red;
`;

export default function AddEditProduct({ editProductData, doneEditingCb }) {
  const [invalidFormErrorMessages, setInvalidFormErrorMessages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { appGetAuthToken } = useContext(AuthStateContext);
  const token = appGetAuthToken();

  // graphQl mutations.
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const getInvalidFormErrors = (textInputData = null) => {
    const messages = [
      "You must select at least 1 image. ",
      "No product type selected. ",
      "Title must be at least 5 characters. ",
      "Product description must be at least 10 characters. ",
    ];
    let errors = [];
    if (!editProductData && selectedImages.length < 1) errors.push(messages[0]);
    if (!textInputData.productType) errors.push(messages[1]);
    if (textInputData.title.length < 5) errors.push(messages[2]);
    if (textInputData.description.length < 10) errors.push(messages[3]);

    setInvalidFormErrorMessages(errors);
    return errors;
  };

  const postImages = async () => {
    const formData = new FormData();
    for (const file of selectedImages) {
      formData.append("images", file);
    }
    const resData = await fetch("http://localhost:8080/post-images", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    });
    const data = await resData.json();
    if (!data.error && data.imageUrls.length > 0) {
      return data;
    }
    throw new Error(data.error);
  };

  /* 
   images are posted to AWS first, the image URLs are returned
   then added to the product.imageUrls to be sent and saved to DB 
  */

  const [imageUrlsToDelete, setImageUrlsToDelete] = useState([]);

  const submitFormHandler = async (e, textInputData, isEdit = false) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = getInvalidFormErrors(textInputData);
    if (validationErrors.length) return setIsLoading(false);

    try {
      if (isEdit) {
        let newImageUrls = [];

        if (selectedImages.length > 0) {
          const resDataJson = await postImages();
          newImageUrls = resDataJson.imageUrls;
        }
        const updatedImageUrls = [
          ...newImageUrls,
          ...editProductData.imageUrls.filter(
            (url) => !imageUrlsToDelete.includes(url)
          ),
        ];
        const updatedProduct = {
          _id: editProductData._id,
          ...textInputData,
          imageUrls: updatedImageUrls,
        };
        await updateProduct({
          variables: { ...updatedProduct },
        });
        doneEditingCb();
        return setIsLoading(false);
      } //else

      const resDataJson = await postImages();
      await createProduct({
        variables: {
          title: textInputData.title,
          imageUrls: resDataJson.imageUrls,
          description: textInputData.description,
          productType: textInputData.productType,
        },
      });
      return setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  return (
    <StyledProductFormWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StyledInvalidFormErrorMessages>
            {invalidFormErrorMessages.map((errorMsg) => (
              <p key={errorMsg}>{errorMsg}</p>
            ))}
          </StyledInvalidFormErrorMessages>
          <FilePickerPreviewer
            editImageUrls={editProductData ? editProductData.imageUrls : null}
            setImageUrlsToDeleteCb={
              editProductData ? (urls) => setImageUrlsToDelete(urls) : null
            }
            setSelectedImagesCb={(files) => setSelectedImages(files)}
          />
          <TextForm
            editProductData={editProductData}
            submitFormCallBack={(e, textFormData, isEdit) =>
              submitFormHandler(e, textFormData, isEdit)
            }
          />
        </>
      )}
    </StyledProductFormWrapper>
  );
}
