import React, { useState } from 'react';
import styled from 'styled-components';
import LayoutContext from '../../Layout/LayoutsContext';

const StyledForm = styled.form`
  color: #474747;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 30px 10px 0 10px;
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

const StyledContainer = styled.div`
  height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 5px;
  margin-bottom: 5px;
`;

const StyledSelect = styled.select`
  font-size: large;
  padding: 10px 5px 10px 2px;
  margin-bottom: 5px;
`;

const StyledLabel = styled.label`
  width: 100%;
  padding: 10px;
`;

export default function SqFtCalulator() {
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

  function submitHandler(e) {
    e.preventDefault();

    if (totalMeasurement) {
      setTotalPrice(pricePerSq * totalMeasurement);
    } else {
      setTotalMeasurement(floorLength * floorWidth);
    }
  }

  return (
    <StyledContainer>
      <StyledForm onSubmit={submitHandler}>
        <StyledSelect
          onChange={e => inputChangedHandler(e.target.value, 'unit')}
          value={measurementUnit}
        >
          <option value="Feet (ft)">Feet (ft)</option>
          <option value="Meter (m)">Meter (m)</option>
        </StyledSelect>
        <StyledInput
          onChange={e => inputChangedHandler(+e.target.value, 'length')}
          placeholder="Floor Length"
        />
        <StyledInput
          style={{ marginBottom: '25px' }}
          onChange={e => inputChangedHandler(+e.target.value, 'width')}
          placeholder="Floor Width"
        />
        <StyledInput
          onChange={e => inputChangedHandler(+e.target.value, 'totalMeasure')}
          placeholder={`Total Sq ${measurementUnit} (if known)`}
          value={totalMeasurement ? totalMeasurement : ''}
        />
        <StyledInput
          onChange={e => inputChangedHandler(+e.target.value, 'price')}
          placeholder={`Price Per Sq ${measurementUnit}`}
        />
        <button onSubmit={e => submitHandler(e)}>Calculate</button>
        <StyledLabel>Total Price: £{totalPrice}</StyledLabel>
      </StyledForm>
    </StyledContainer>
  );
}
