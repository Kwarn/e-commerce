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

export default function FilePickerPreviewer({
  editImageUrls,
  sendFilesToParentCb,
  setImageUrlsForDeletionCb,
}) {
  // stores the files returned from react-dropzone file picker.
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Removes duplicate file inputs & updates selectedFiles.
  // as direct comparison of reference types returns false (File Objects)
  // we create an array of the Files name properties for comparison.
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((existingFiles) => {
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

  // removes files from selectedFiles by filtering by filename.
  const removeFileHandler = (filename) => {
    setSelectedFiles((exisitingFiles) =>
      exisitingFiles.filter((f) => f.name !== filename)
    );
  };

  const [urlToDelete, setUrlsToDelete] = useState([]);

  const removeImageUrlHandler = (url) => {
    // we need to check if this is the last URL if so stop user from deleting only image
    // OR SET A DEFAULT IMAGE
    setUrlsToDelete((prevUrls) => [...prevUrls, url]);
    setImageUrlsForDeletionCb(url);
    console.log(`urlToDelete`, urlToDelete);
  };

  const restoreImageUrlHandler = (url) => {
    // we need to check if this is the last URL if so stop user from deleting only image
    setUrlsToDelete((prev) => prev.filter((u) => u !== url));
    setImageUrlsForDeletionCb(url);
  };

  // passes selected files back to parent component for inclusion in product creation.
  useEffect(() => {
    sendFilesToParentCb(selectedFiles);
  }, [sendFilesToParentCb, selectedFiles]);

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
          Selected files will later display in the order they are selected,
          upload most important marketing images first.
        </StyledUploadTooltip>
      </StyledDropZone>
      <StyledPreviewImageWrapper>
        {editImageUrls
          ? editImageUrls.map((url) => (
              <StyledImagePreviewContainer
                key={url}
                background={url}
                isQueuedForDelete={urlToDelete.includes(url)}
              >
                <button
                  onClick={
                    !urlToDelete.includes(url)
                      ? () => removeImageUrlHandler(url)
                      : () => restoreImageUrlHandler(url)
                  }
                >
                  {urlToDelete.includes(url) ? "Restore" : "Remove"}
                </button>
                <p>{url}</p>
              </StyledImagePreviewContainer>
            ))
          : null}
        {selectedFiles
          ? selectedFiles.map((file) => (
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
    </StyledWrapper>
  );
}
