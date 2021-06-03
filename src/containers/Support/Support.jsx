import React, { useContext } from 'react';
import Calculator from '../Calculator/Calculator';
import styled from 'styled-components';
import background from '../../assets/background1.jpg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  width: 100%;
`;

const StyledSupportSectionsWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  margin: 20vh auto 20vh auto;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 10px 30px 10px;
`;

const StyledCalculatorSection = styled.div`
  margin-top: 30px;
  padding: 5px;
  display: flex;
  h2 {
    margin: 30px auto 30px auto;
    font-weight: 600;
    text-align: center;
  }
  h3 {
    font-size: larger;
    margin: auto;
    font-weight: 600;
    text-align: center;
  }
  p {
    font-size: larger;
    margin: auto;
    padding: 10px;
    text-align: center;
    max-width: 400px;
    margin-bottom: 25px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledCalculatorWrapper = styled.div`
  margin: auto auto auto auto;
  max-width: 400px;
`;

const StyledFAQSection = styled.div`
  h2 {
    margin: 30px auto 30px auto;
    font-weight: 600;
    text-align: center;
    text-decoration: underline;
  }
  h3 {
    margin: auto;
    font-weight: 600;
    text-align: center;
  }
  p {
    font-size: larger;
    margin: 5px auto 10px auto;
    text-align: center;
    max-width: 400px;
  }
`;

export default function Help() {
  return (
    <Wrapper>
      <StyledSupportSectionsWrapper>
        <StyledFAQSection>
          <h2>FAQ</h2>
          <h3>How do I buy?</h3>
          <p>
            Call or email for our most up-to-date competitive prices and
            quotations.
          </p>
          <h3>Do you deliver?</h3>
          <p>Yes! We offer next day delivery!</p>
        </StyledFAQSection>
        <StyledCalculatorSection>
          <div>
            <h2>How much flooring do I need?</h2>
            <h3>How to Calculate Square Feet/Meter (Area)</h3>
            <p>
              Just break out your measuring tape to get the floors length and
              width. You can use our handy calculator to find the area! Say a
              room is 20 feet wide by 13 feet long, then 20 x 13 = 260 square
              feet.
            </p>
            <h3>How much will it cost?</h3>
            <p>
              Simply use the Sq Ft/m Calculator or enter the total area and the
              price per Sq Ft/m into the calculator.
            </p>
          </div>
          <StyledCalculatorWrapper>
            <Calculator />
          </StyledCalculatorWrapper>
        </StyledCalculatorSection>
      </StyledSupportSectionsWrapper>
    </Wrapper>
  );
}
