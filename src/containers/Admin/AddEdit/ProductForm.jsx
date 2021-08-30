import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthStateContext } from "../../../Auth/AuthStateProvider";
import { useCreateProduct } from "../../../Hooks/Products/useCreateProduct";
import FilePickerPreviewer from "./FilePickerPreviewer";
import TextForm from "./TextForm";
import Spinner from "../../../components/UI/spinner/Spinner";
import { useUpdateProduct } from "../../../Hooks/Products/useUpdateProduct";

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

export default function ProductForm({ editProductData, doneEditingCb }) {
  // provides the authentication token for use in form submission.
  const { appGetAuthToken } = useContext(AuthStateContext);
  const token = appGetAuthToken();

  // graphQl mutation.
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  // files are passed via callback from FilePickerPreviewer
  const [selectedFiles, setSelectedFiles] = useState([]);

  // controls the displaying of a loading Spinner while waiting for the form submit response.
  const [isLoading, setIsLoading] = useState(false);

  // contains and controls the displaying of invalid form fields error messages.
  const [invalidFormErrorMessages, setInvalidFormErrorMessages] = useState([]);

  const invalidFormErrorMessagesHandler = (message) => {
    setInvalidFormErrorMessages((existingMessages) => {
      if (existingMessages.includes(message)) return [...existingMessages];
      return [...existingMessages, message];
    });
  };

  const getInvalidFormErrors = (textInputData) => {
    let isError = false;
    if (selectedFiles.length < 1 && textInputData.imageUrls.length < 1) {
      invalidFormErrorMessagesHandler("You must select at least 1 image. ");
      isError = true;
    }
    if (!textInputData.productType) {
      invalidFormErrorMessagesHandler("No product type selected. ");
      isError = true;
    }
    if (textInputData.title.length < 5) {
      invalidFormErrorMessagesHandler("Title must be at least 5 characters. ");
      isError = true;
    }
    if (textInputData.description.length < 10) {
      invalidFormErrorMessagesHandler(
        "Product description must be at least 10 characters. "
      );
    }
    return isError;
  };

  const postImages = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
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

  // images are posted to AWS first, the image URLs are returned
  // then added to the product.imageURls to be sent and saved to DB

  const [imageUrlsToDelete, setImageUrlsToDelete] = useState([]);

  const submitFormHandler = async (e, textInputData, isEdit = false) => {
    e.preventDefault();

    setIsLoading(true);

    if (getInvalidFormErrors(textInputData)) return;

    try {
      if (isEdit) {
        let newImageUrls = [];

        if (selectedFiles.length > 0) {
          const resDataJson = await postImages();
          newImageUrls = resDataJson.imageUrls;
        }
        const imageUrlsFinal = [
          ...newImageUrls,
          ...editProductData.imageUrls.filter(
            (url) => !imageUrlsToDelete.includes(url)
          ),
        ];
        const prod = {
          _id: editProductData._id,
          ...textInputData,
          imageUrls: imageUrlsFinal,
        };
        const savedProduct = await updateProduct({ variables: { ...prod } });
        console.log(`savedProduct`, savedProduct);
        doneEditingCb();
        return setIsLoading(false);
      }

      const resDataJson = await postImages();
      const resData = await createProduct({
        variables: {
          title: textInputData.title,
          imageUrls: resDataJson.imageUrls,
          description: textInputData.description,
          productType: textInputData.productType,
        },
      });
      console.log(`createProductResData`, resData);
      return setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`error`, error);
      throw new Error(error);
    }
  };

  const setImageUrlsToDeleteHandler = (url) => {
    setImageUrlsToDelete((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  console.log(`imageUrlsToDelete`, imageUrlsToDelete);

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
            setImageUrlsForDeletionCb={
              editProductData ? (url) => setImageUrlsToDeleteHandler(url) : null
            }
            sendFilesToParentCb={(files) => setSelectedFiles(files)}
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
