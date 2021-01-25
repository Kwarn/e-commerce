import React, { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: auto;
  width: 100%;
`;

const StyledForm = styled.form`
  max-width: 400px;
  color: #474747;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
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

const StyledInput = styled.input`
  padding: 5px;
  margin-bottom: 5px;
`;
const StyledPriceInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
`;

const StyledSelect = styled.select`
  font-size: large;
  padding: 10px 5px 10px 2px;
  margin-bottom: 5px;
`;

const StyledLabel = styled.label`
  border: 1px solid black;
  padding: 10px;
  margin: 5px 0 5px 0;
`;

const StyledPoundSignContainer = styled.label`
  border: 1px solid black;
  border-right: none;
  padding: 10px;
  margin-bottom: 5px;
`;

const StyledInlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledWarningMessage = styled.p`
  text-align: center;
  color: red;
  padding: 0;
  margin: 0;
`;

export default function Calculator() {
  const [measurementUnit, setMeasurementUnit] = useState('Feet (ft)');
  const [floorLength, setFloorLength] = useState(0);
  const [floorWidth, setFloorWidth] = useState(0);
  const [pricePerSq, setPricePerSq] = useState(0);
  const [totalMeasurement, setTotalMeasurement] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const inputChangedHandler = (value, elementIdentifier) => {
    const targetElements = {
      unit: [measurementUnit, setMeasurementUnit],
      length: [floorLength, setFloorLength],
      width: [floorWidth, setFloorWidth],
      totalMeasure: [totalMeasurement, setTotalMeasurement],
      price: [pricePerSq, setPricePerSq],
    };
    const setTargetElement = targetElements[elementIdentifier][1];
    setTargetElement(value);
  };

  function submitAreaHandler(e) {
    e.preventDefault();
    setTotalMeasurement((floorLength * floorWidth).toFixed(2));
  }
  function submitPriceHandler(e) {
    e.preventDefault();
    setTotalPrice((pricePerSq * totalMeasurement).toFixed(2));
  }

  return (
    <StyledContainer>
      <StyledForm onSubmit={submitAreaHandler}>
        <StyledSelect
          onChange={e => inputChangedHandler(e.target.value, 'unit')}
          value={measurementUnit}
        >
          <option value="Feet (ft)">Feet (ft)</option>
          <option value="Meter (m)">Meter (m)</option>
        </StyledSelect>
        <StyledWarningMessage>
          Important! check you have selected the correct unit of measurement
        </StyledWarningMessage>
        <StyledInput
          onChange={e => inputChangedHandler(+e.target.value, 'length')}
          placeholder="Floor Length"
        />
        <StyledInput
          onChange={e => inputChangedHandler(+e.target.value, 'width')}
          placeholder="Floor Width"
        />
        <button
          onSubmit={e => submitAreaHandler(e)}
        >{`Calculate Sq ${measurementUnit}`}</button>
      </StyledForm>
      <StyledForm onSubmit={submitPriceHandler}>
        <StyledInput
          onChange={e => inputChangedHandler(+e.target.value, 'totalMeasure')}
          placeholder={`Total Sq ${measurementUnit} (if known)`}
          value={totalMeasurement ? totalMeasurement : ''}
        />
        <StyledInlineWrapper>
          <StyledPoundSignContainer>£</StyledPoundSignContainer>
          <StyledPriceInput
            onChange={e => inputChangedHandler(+e.target.value, 'price')}
            placeholder={`Price Per Sq ${measurementUnit}`}
          />
        </StyledInlineWrapper>
        <button onSubmit={e => submitPriceHandler(e)}>Calculate Price</button>
        <StyledLabel>Total Price: £{totalPrice}</StyledLabel>
      </StyledForm>
    </StyledContainer>
  );
}
