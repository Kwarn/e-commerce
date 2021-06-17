import React, { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { updateObject, validateInput } from '../../utility/utility';
import { useDropzone } from 'react-dropzone';
import { AuthStateContext } from '../../Auth/AuthStateProvider';
import { useMutation } from '@apollo/client';
import { MUTATION_CREATE_PRODUCT } from '../../GraphQl/Mutations';
import Spinner from '../../components/UI/spinner/Spinner';

const StyledProductFormWrapper = styled.div`
  margin-top: 10vh;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledForm = styled.form`
  margin: auto;
  max-width: 400px;
  width: auto;
  color: #474747;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${props => (props.invalid ? '#ecd7cd' : 'none')};
`;

const StyledTextarea = styled.textarea`
  width: 400px;
  height: 400px;
`;

const StyledPreviewImageWrapper = styled.div`
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

const StyledImagePreviewContainer = styled.div`
  height: 150px;
  position: relative;
  margin: 0 10px 80px 10px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ background }) => background});
  p {
    max-width: 150px;
    overflow: hidden;
    position: absolute;
    bottom: -80px;
  }
  button {
    position: absolute;
    top: 0;
  }
`;

const StyledDropZone = styled.div`
  cursor: pointer;
  margin: auto auto 40px auto;
  border: 2px dotted black;
  height: 10vh;
  width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  p {
    margin: auto;
  }
`;

const StyledUploadTooltip = styled.p`
  margin: auto;
  color: red;
`;

const StyledInvalidFormErrorMessages = styled.p`
  color: red;
`;

export default React.memo(function ProductForm() {
  // controls the displaying of a loading Spinner while waiting for the form submit response.
  const [isLoading, setIsLoading] = useState(false);

  // provides the authentication token for use in form submission.
  const { appGetAuthToken } = useContext(AuthStateContext);
  const token = appGetAuthToken();

  // graphQl mutation.
  const [createProduct] = useMutation(MUTATION_CREATE_PRODUCT);

  // stores the files returned from react-dropzone file picker.
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Removes duplicate file inputs & updates selectedFiles.
  // as direct comparison of File objects returns false (reference types)
  // we create an array of the name properties for comparison.
  const onDrop = useCallback(acceptedFiles => {
    setSelectedFiles(existingFiles => {
      if (!existingFiles) return [...acceptedFiles];
      const nonDuplicates = [];
      const existingFileNames = [];
      for (const file of existingFiles) existingFileNames.push(file.name);
      for (const file of acceptedFiles)
        if (!existingFileNames.includes(file.name)) nonDuplicates.push(file);
      return [...existingFiles, ...nonDuplicates];
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // form input elements default data.
  const defaultDescriptionElement = {
    validation: {
      required: true,
      minLength: 10,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: 'Message must be at least 10 characters.',
    value: '',
  };
  const defaultTitleElement = {
    validation: {
      required: true,
      minLength: 4,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: 'Title must be at least 4 characters.',
    value: '',
  };

  // contains and controls the displaying of invalid form fields error messages.
  const [invalidFormErrorMessages, setInvalidFormErrorMessages] = useState([]);

  // allows easy resetting form elements
  const [title, setTitle] = useState(defaultTitleElement);
  const [description, setDescription] = useState(defaultDescriptionElement);
  const resetFormElements = () => {
    setTitle(defaultTitleElement);
    setDescription(defaultDescriptionElement);
  };

  // response recieves the uploaded images hosted URL's.
  // graphql mutation is passed the host URLs & the remaining input field data.
  // loading stops => response data is logged to console.

  const submitFormHandler = e => {
    e.preventDefault();

    // checks for files => if none => appends error message to error Array.
    if (selectedFiles.length < 1) {
      return setInvalidFormErrorMessages(existingMessages => {
        if (existingMessages.includes('No files selected.'))
          return [...existingMessages];
        return [...existingMessages, 'No files selected.'];
      });
    }

    // starts loading Spinner.
    setIsLoading(true);

    // creates formData => under 'images' key it appends files contained in selectedFiles Array.
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('images', file);
    }
    // sends form data to backend
    fetch('http://localhost:8080/post-images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    }) // resets form elements & converts response to JSON.
      .then(resData => {
        setSelectedFiles(null);
        resetFormElements();
        return resData.json();
      }) // response contains a String Array of the AWS S3 hosted images URL's.
      .then(data => {
        if (!data.error && data.imageUrls) {
          // graphQl query called with response imageUrls and remaining form input data.
          return createProduct({
            variables: {
              title: title.value,
              imageUrls: data.imageUrls,
              description: description.value,
            },
          });
        }
      })
      // stops loading Spinner which returns the empty form to view.
      .then(resData => {
        setIsLoading(false);
        console.log('resData :>> ', resData);
      })
      .catch(error => console.log('Upload Error :>> ', error));
  };

  // identifier string eg. 'title' is passed and used as a key to validate &
  // update corrosponding form element value.
  const inputChangedHandler = (value, elementIdentifier) => {
    const targetElements = {
      title: [title, setTitle],
      description: [description, setDescription],
    };

    const targetElement = targetElements[elementIdentifier][0];
    const setTargetElement = targetElements[elementIdentifier][1];

    setTargetElement(
      updateObject(targetElement, {
        isValid: validateInput(value, targetElement.validation),
        wasTouched: true,
        value: value,
      })
    );
  };

  const removeFileHandler = filename => {
    setSelectedFiles(selectedFiles.filter(f => f.name !== filename));
  };

  return (
    <StyledProductFormWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StyledDropZone {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
            <StyledUploadTooltip>
              Selected files will later display in the order they are selected,
              upload most important marketing images first.
            </StyledUploadTooltip>
          </StyledDropZone>
          <StyledPreviewImageWrapper>
            {selectedFiles
              ? selectedFiles.map(file => (
                  <StyledImagePreviewContainer
                    key={file.name}
                    background={URL.createObjectURL(file)}
                  >
                    <button onClick={() => removeFileHandler(file.name)}>
                      Remove
                    </button>
                    <p>{file.name}</p>
                  </StyledImagePreviewContainer>
                ))
              : null}
          </StyledPreviewImageWrapper>
          <StyledForm onSubmit={e => submitFormHandler(e)}>
            <StyledInvalidFormErrorMessages>
              {invalidFormErrorMessages}
            </StyledInvalidFormErrorMessages>
            <StyledInput
              placeholder="Title"
              invalid={!title.isValid && title.wasTouched}
              name="title"
              onChange={event =>
                inputChangedHandler(event.target.value, 'title')
              }
              value={title.value}
            />
            <StyledTextarea
              placeholder="Description"
              invalid={!description.isValid && description.wasTouched}
              name="description"
              onChange={event =>
                inputChangedHandler(event.target.value, 'description')
              }
              value={description.value}
            />
            <input type="submit" value="Submit" />
          </StyledForm>
        </>
      )}
    </StyledProductFormWrapper>
  );
});
