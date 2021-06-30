import React from 'react';
import styled from 'styled-components';

const StyledPreviewProductElement = styled.div`
  margin: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-image: url(${({ background }) => background});
  background-size: cover;
`;

const StyledDeleteButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 50px;
  width: fit-content;
`;
const StyledEditButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50px;
  width: fit-content;
`;
const StyledTitle = styled.h2`
  margin: auto;
  width: 100%;
  text-align: center;
  background-color: white;
`;

export default function PreviewProductElement({
  title,
  image,
  deleteProductCallback,
  editProductCallback,
}) {
  return (
    <StyledPreviewProductElement background={image}>
      <StyledTitle>{title}</StyledTitle>
      <StyledEditButton onClick={editProductCallback}>Edit</StyledEditButton>
      <StyledDeleteButton onClick={deleteProductCallback}>
        Delete
      </StyledDeleteButton>
    </StyledPreviewProductElement>
  );
}
