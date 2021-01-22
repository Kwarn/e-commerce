import React from 'react';
import Calculator from '../Calculator/Calculator';
import styled from 'styled-components';

const StyledHelpWrapper = styled.div`
  display: flex;
  width: 100;
`;

const StyledHelp = styled.div`
  margin: auto;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 10px 30px 10px;
`;

const StyledSection = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
`;

const StyledSubSection = styled.div``;

const StyledSectionTitle = styled.h2`
  margin: 30px auto 30px auto;
  font-weight: 600;
  text-align: center;
`;

const StyledSubSectionTitle = styled.h3`
  margin: auto;
  font-weight: 600;
  text-align: center;
`;

const StyledDescription = styled.p`
  margin: auto;
  padding: 10px;
  text-align: center;
  max-width: 400px;
  margin-bottom: 25px;
`;

const StyledCalculatorWrapper = styled.div`
  margin: auto auto auto 30px;
  max-width: 400px;
`;

export default function Help() {
  return (
    <StyledHelpWrapper>
      <StyledHelp>
        <StyledSection>
          <StyledSubSection>
            <StyledSectionTitle>
              How much flooring do I need?
            </StyledSectionTitle>
            <StyledSubSectionTitle>
              How to Calculate Square Feet/Meter (Area)
            </StyledSubSectionTitle>
            <StyledDescription>
              Just break out your measuring tape to get the floors length and
              width. You can use our handy calculator to find the area! Say a
              room is 20 feet wide by 13 feet long, then 20 x 13 = 260 square
              feet.
            </StyledDescription>
            <StyledSubSectionTitle>
              How much will it cost?
            </StyledSubSectionTitle>
            <StyledDescription>
              Simply use the calculator above or enter the total area and the
              price per square feet/meters into the calculator. The price per sq
              foot/meter can be found on all of our products.
            </StyledDescription>
          </StyledSubSection>
          <StyledCalculatorWrapper>
            <Calculator />
          </StyledCalculatorWrapper>
        </StyledSection>
      </StyledHelp>
    </StyledHelpWrapper>
  );
}
