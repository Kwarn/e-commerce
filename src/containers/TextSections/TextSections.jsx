import React from 'react';
import styled from 'styled-components';

const StyledTextSection = styled.div`
  margin: 35px auto 35px auto;
  max-width: 700px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h2 {
    padding: 0;
    margin: 15px auto 15px auto;
    font-weight: 600;
  }
`;

export default function TextSections() {
  const textSectionContent = {
    welcomeText: {
      title:
        'We Make Beautiful Real Wood Flooring From Responsibly Sourced Timber',
      secondTitle: 'Find Your Perfect Wood Floor',
    },
    // customers: [
    //   <h2>Our Customers Love Us!</h2>,
    //   <p>We pride ourselves on our support team</p>,
    // ],
  };

  let textSectionsObj = {};
  for (let key in textSectionContent) {
    textSectionsObj = {
      ...textSectionsObj,
      ...{
        [key]: (
          <StyledTextSection key={key}>
            <h2>{textSectionContent[key].title}</h2>
            <h2>{textSectionContent[key].secondTitle}</h2>
            <p>{textSectionContent[key].description}</p>
          </StyledTextSection>
        ),
      },
    };
  }

  return textSectionsObj;
}
