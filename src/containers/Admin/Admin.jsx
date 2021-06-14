import React, { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { updateObject, validateInput } from '../../utility/utility';
import { useDropzone } from 'react-dropzone';
import { AuthStateContext } from '../../Auth/AuthStateProvider';

const StyledAdminWrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  h1 {
    color: black;
  }
`;

const StyledInput = styled.input`
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${props => (props.invalid ? '#ecd7cd' : 'none')};
`;

export default function Admin() {
  const { appGetAuthToken } = useContext(AuthStateContext);
  const token = appGetAuthToken();
  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    for (const file of acceptedFiles) {
      formData.append('images', file);
    }
    fetch('http://localhost:8080/post-images', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    })
      .then(resData => {
        return resData.json();
      })
      .then(data => {
        console.log('data :>> ', data);
      })
      .catch(error => console.log('Upload Error :>> ', error));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [invalidFormErrorMessages, setInvalidFormErrorMessages] = useState([]);
  const [title, setTitle] = useState({
    validation: {
      required: true,
      minLength: 4,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: 'Title must be at least 4 characters.',
    value: '',
  });

  const [description, setDescription] = useState({
    validation: {
      required: true,
      minLength: 10,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: 'Message must be at least 10 characters.',
    value: '',
  });

  const inputChangedHandler = (value, elementIdentifier) => {
    const targetElements = {
      title: [title, setTitle],
      // imageUrls: [imageUrls, imageUrls],
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

  return (
    <StyledAdminWrapper>
      <h1>Admin</h1>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {/* <UploadImageToS3WithNativeSdk /> */}
      <StyledInput
        placeholder="Title"
        invalid={!title.isValid && title.wasTouched}
        name="title"
        onChange={event => inputChangedHandler(event.target.value, 'title')}
        value={title.value}
      />
    </StyledAdminWrapper>
  );
}
