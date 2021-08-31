import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";

const StyledWrapper = styled.div`
  margin: auto;
`;
const StyledPreviewImageWrapper = styled.div`
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const StyledImagePreviewContainer = styled.div`
  height: 150px;
  position: relative;
  margin: 0 10px 80px 10px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ background }) => background});
  background-color: ${(props) => (props.isQueuedForDelete ? "red" : "")};
  border: ${(props) =>
    props.isQueuedForDelete ? "3px solid red" : "3px solid tranparent"};
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

/* 

  Displays file picker, handles new files being selected,
  passes files back to parent element for inclusion in product update/creation.

  update/edit mode: if provided editImageUrls.

  displays preview images, on deleting a URL it passes the URL to parent
  which is then filtered out of imageUrls before graphQl updating of product.
  
  *** server handles file removal from s3 bucket by checking changes ***
  
  */

export default function FilePicker({
  editImageUrls,
  setSelectedImagesCb,
  setImageUrlsToDeleteCb,
}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [urlsToDelete, setUrlsToDelete] = useState([]);

  useEffect(() => {
    if (selectedImages) setSelectedImagesCb(selectedImages);
    if (setImageUrlsToDeleteCb && urlsToDelete)
      setImageUrlsToDeleteCb(urlsToDelete);
  }, [
    setSelectedImagesCb,
    selectedImages,
    setImageUrlsToDeleteCb,
    urlsToDelete,
  ]);

  const onDrop = useCallback((newSelectedFiles) => {
    setSelectedImages((existingFiles) => {
      if (!existingFiles) return [...newSelectedFiles];

      const existingFileNames = existingFiles.map((file) => file.name);
      const nonDuplicates = newSelectedFiles.filter(
        (file) => !existingFileNames.includes(file.name)
      );
      return [...existingFiles, ...nonDuplicates];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFileHandler = (filename) => {
    setSelectedImages((exisitingFiles) =>
      exisitingFiles.filter((f) => f.name !== filename)
    );
  };

  const removeImageUrlHandler = (url) => {
    if (
      selectedImages.length < 1 &&
      editImageUrls.length <= urlsToDelete.length + 1
    )
      return alert(
        "Products must have at least one image, upload replacement image before removing last image."
      );

    setUrlsToDelete((prevUrls) => [...prevUrls, url]);
  };

  const restoreImageUrlHandler = (url) => {
    setUrlsToDelete((prev) => prev.filter((u) => u !== url));
  };

  const existingImgs = editImageUrls
    ? editImageUrls.map((url) => {
        const isQueuedForDelete = urlsToDelete.includes(url);
        return (
          <StyledImagePreviewContainer
            key={url}
            background={url}
            isQueuedForDelete={isQueuedForDelete}
          >
            <button
              onClick={
                !isQueuedForDelete
                  ? () => removeImageUrlHandler(url)
                  : () => restoreImageUrlHandler(url)
              }
            >
              {isQueuedForDelete ? "Restore" : "Remove"}
            </button>
            <p>{url}</p>
          </StyledImagePreviewContainer>
        );
      })
    : null;

  const selectedImgs = selectedImages
    ? selectedImages.map((file) => (
        <StyledImagePreviewContainer
          key={file.name}
          background={URL.createObjectURL(file)}
        >
          <button onClick={() => removeFileHandler(file.name)}>Remove</button>
          <p>{file.name}</p>
        </StyledImagePreviewContainer>
      ))
    : null;

  return (
    <StyledWrapper>
      <StyledDropZone {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <StyledUploadTooltip>
          Images will display in the order they are selected, upload most
          important marketing images first. (TODO)
        </StyledUploadTooltip>
      </StyledDropZone>

      <StyledPreviewImageWrapper>
        Existing Images {existingImgs}
      </StyledPreviewImageWrapper>
      <StyledPreviewImageWrapper>
        New Images {selectedImgs}
      </StyledPreviewImageWrapper>
    </StyledWrapper>
  );
}
