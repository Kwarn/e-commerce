import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthStateContext } from '../../../Auth/AuthStateProvider';
import { useCreateProduct } from '../../../Hooks/Products/useCreateProduct';
import FilePickerPreviewer from './FilePickerPreviewer';
import TextForm from './TextForm';
import Spinner from '../../../components/UI/spinner/Spinner';

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

export default function ProductForm() {
  // provides the authentication token for use in form submission.
  const { appGetAuthToken } = useContext(AuthStateContext);
  const token = appGetAuthToken();

  // graphQl mutation.
  const createProduct = useCreateProduct();

  // files are passed via callback from FilePickerPreviewer
  const [selectedFiles, setSelectedFiles] = useState([]);

  // controls the displaying of a loading Spinner while waiting for the form submit response.
  const [isLoading, setIsLoading] = useState(false);

  // contains and controls the displaying of invalid form fields error messages.
  const [invalidFormErrorMessages, setInvalidFormErrorMessages] = useState([]);

  const invalidFormErrorMessagesHandler = message => {
    setInvalidFormErrorMessages(existingMessages => {
      if (existingMessages.includes(message)) return [...existingMessages];
      return [...existingMessages, message];
    });
  };

  const getInvalidFormErrors = textInputData => {
    let isError = false;
    if (selectedFiles.length < 1) {
      invalidFormErrorMessagesHandler('You must select at least 1 file. ');
      isError = true;
    }
    if (!textInputData.productType) {
      invalidFormErrorMessagesHandler('No product type selected. ');
      isError = true;
    }
    if (textInputData.title.length < 5) {
      invalidFormErrorMessagesHandler('Title must be at least 5 characters. ');
      isError = true;
    }
    if (textInputData.description.length < 10) {
      invalidFormErrorMessagesHandler(
        'Product description must be at least 10 characters. '
      );
    }
    return isError;
  };

  const submitFormHandler = (e, textInputData) => {
    e.preventDefault();

    if (getInvalidFormErrors(textInputData)) return;

    // starts loading Spinner.
    setIsLoading(true);

    // creates formData => under 'images' key it appends files contained in selectedFiles Array.
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('images', file);
    }
    // sends form data (images) to backend.
    fetch('http://localhost:8080/post-images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    }) // resets form elements & converts response to JSON.
      .then(resData => {
        return resData.json();
      }) // response contains a String Array of the AWS S3 hosted images URL's.
      .then(data => {
        if (!data.error && data.imageUrls.length > 0) {
          // graphQl mutation called with response imageUrls and remaining form input data.
          return createProduct({
            variables: {
              title: textInputData.title,
              imageUrls: data.imageUrls,
              description: textInputData.description,
              productType: textInputData.productType,
            },
          });
        }
        return new Error('Image upload failed.');
      })
      .then(resData => {
        // stops loading Spinner which returns the rerendered empty form to view.
        setIsLoading(false);
      })
      .catch(error => console.log('Upload Error :>> ', error));
  };
  return (
    <StyledProductFormWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StyledInvalidFormErrorMessages>
            {invalidFormErrorMessages.map(errorMsg => (
              <p key={errorMsg}>{errorMsg}</p>
            ))}
          </StyledInvalidFormErrorMessages>
          <FilePickerPreviewer
            sendFilesToParentCb={files => setSelectedFiles(files)}
          />
          <TextForm
            submitFormCallBack={(e, textFormData) =>
              submitFormHandler(e, textFormData)
            }
          />
        </>
      )}
    </StyledProductFormWrapper>
  );
}
