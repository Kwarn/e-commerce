import React, { useState, useContext, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { updateObject, validateInput } from '../../utility/utility';
import { useDropzone } from 'react-dropzone';
import { AuthStateContext } from '../../Auth/AuthStateProvider';

const StyledForm = styled.form`
  max-width: 400px;
  width: auto;
  border-radius: 5px;
  color: #474747;
  background-color: rgba(255, 255, 255, 0.4);
  margin: auto 0;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  h2 {
    font-size: larger;
  }
  input {
    font-size: larger;
  }
  button {
    font-size: larger;
    margin-top: 5px;
    padding: 5px 0px 5px 0px;
  }
`;

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

const StyledPreviewImage = styled.img`
  width: auto;
  height: 50px;
`;

const StyledImagePreviewContainer = styled.div`
  background-color: #a7d3a7;
`;

export default React.memo(function Admin() {
  const { appGetAuthToken } = useContext(AuthStateContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const token = appGetAuthToken();
  const onDrop = useCallback(acceptedFiles => {
    setSelectedFiles(existingFiles => {
      const nonDuplicates = [];
      const existingFileNames = [];
      for (const file of existingFiles) existingFileNames.push(file.name);
      for (const file of acceptedFiles)
        if (!existingFileNames.includes(file.name)) nonDuplicates.push(file);
      return [...existingFiles, ...nonDuplicates];
    });
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

  useEffect(() => {}, []);

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of selectedFiles) {
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
        setSelectedFiles(null);
        return resData.json();
      })
      .then(data => {
        console.log('data :>> ', data);
        if (!data.error) {
          console.log(data);
        }
      })
      .catch(error => console.log('Upload Error :>> ', error));
  };

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
      <div>
        Selected Files:
        {selectedFiles
          ? selectedFiles.map(file => (
              <StyledImagePreviewContainer key={file.name}>
                <p>{file.name}</p>
                <button onClick={() => removeFileHandler(file.name)}>
                  Remove
                </button>
                <StyledPreviewImage
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              </StyledImagePreviewContainer>
            ))
          : null}
      </div>
      {/* <UploadImageToS3WithNativeSdk /> */}
      <StyledForm onSubmit={e => submitFormHandler(e)}>
        <StyledInput
          placeholder="Title"
          invalid={!title.isValid && title.wasTouched}
          name="title"
          onChange={event => inputChangedHandler(event.target.value, 'title')}
          value={title.value}
        />
        <input type="submit" value="Submit" />
      </StyledForm>
    </StyledAdminWrapper>
  );
});
