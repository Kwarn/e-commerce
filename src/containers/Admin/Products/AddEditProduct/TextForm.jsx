import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { updateObject, validateInput } from "../../../../utility/utility";

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
  background-color: ${(props) => (props.invalid ? "#ecd7cd" : "none")};
`;

const StyledTextarea = styled.textarea`
  width: 400px;
  height: 400px;
`;

const StyledSelect = styled.select`
  background-color: ${(props) => (!props.value ? "red" : "none")};
  height: 5vh;
  margin: 5px 0 5px 0;
`;

const TextForm = ({ editProductData, submitFormCallBack }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // form input elements default data.
  const defaultTitleElement = {
    validation: {
      required: true,
      minLength: 5,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: "Title must be at least 4 characters.",
    value: "",
  };
  const defaultDescriptionElement = {
    validation: {
      required: true,
      minLength: 10,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: "Message must be at least 10 characters.",
    value: "",
  };

  // allows easy resetting form elements
  const [title, setTitle] = useState(defaultTitleElement);
  const [description, setDescription] = useState(defaultDescriptionElement);
  const resetFormElements = () => {
    setTitle(defaultTitleElement);
    setDescription(defaultDescriptionElement);
  };

  // contains value from select element
  const [productType, setProductType] = useState(
    editProductData ? editProductData.productType : ""
  );

  const selectOptions = [
    { label: "Select Product Type", value: "" },
    { label: "Wood Flooring", value: "woodFlooring" },
    { label: "Underlay", value: "underlay" },
    {
      label: "Adhesive",
      value: "adhesive",
    },
  ];

  // identifier string eg. 'title' is passed and used as a key to validate &
  // update corrosponding form element value.
  const inputChangedHandler = (value, elementIdentifier) => {
    // contains reference to state variables & update functions
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

  const selectChangedHandler = (e) => {
    setProductType(e.target.value);
  };

  useEffect(() => {
    if (editProductData) {
      setIsEditMode(true);
      inputChangedHandler(editProductData.title, "title");
      inputChangedHandler(editProductData.description, "description");
      setProductType(editProductData.productType);
    }
  }, [editProductData]);

  return (
    <StyledForm
      onSubmit={(e) =>
        submitFormCallBack(
          e,
          {
            title: title.value,
            description: description.value,
            productType,
          },
          isEditMode
        )
      }
    >
      <StyledSelect value={productType} onChange={selectChangedHandler}>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value} label={option.label}>
            {option.label}
          </option>
        ))}
      </StyledSelect>

      <StyledInput
        placeholder="Title"
        invalid={!title.isValid && title.wasTouched}
        name="title"
        onChange={(event) => inputChangedHandler(event.target.value, "title")}
        value={title.value}
      />

      <StyledTextarea
        placeholder="Description"
        invalid={!description.isValid && description.wasTouched}
        name="description"
        onChange={(event) =>
          inputChangedHandler(event.target.value, "description")
        }
        value={description.value}
      />
      <input type="submit" value="Submit" />
    </StyledForm>
  );
};

export default React.memo(TextForm);
