import React from 'react';
import styled from 'styled-components';
import ContactForm from './ContactForm/ContactForm';
import TextSection from '../../components/TextSection/TextSection';
import background from '../../assets/contactBackground.jpg';

const StyledContactWrapper = styled.div`
  // background-image: url(${background});
  background-size: cover;
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #eee;
  color: #474747;
`;

const StyledSection = styled.section`
  margin: 30px 0 0 0;
`;

const StyledDivider = styled.hr`
  width: 80%;
`;

const Contact = props => {
  const addressLines = [
    'Q & Y Internation Ltd',
    'Unit 2 Wessex Park Industrial Estate',
    'Wessex Road Bourne End',
    'Buckinhamshire',
    'SL8 5DT',
    'United Kingdom',
  ];
  const addressElements = addressLines.map((line, idx) => (
    <p key={idx}>{line}</p>
  ));
  const phone = '03333 110 888';
  const email = 'Qandyinternational@gmail.com';
  return (
    <StyledContactWrapper>
      <StyledSection>
        <TextSection>
          <h1>CONTACT US</h1>
        </TextSection>
      </StyledSection>
      <StyledDivider />
      <StyledSection>
        <TextSection>
          <h3>Customer Service Open Hours</h3>
          <ul>
            <li>Monday: 9:00 - 17:30</li>
            <li>Tuesday: 9:00 - 17:30</li>
            <li>Wednesday: 9:00 - 17:30</li>
            <li>Thursday: 9:00 - 17:30</li>
            <li>Friday: 9:00 - 16:30</li>
            <li>Weekends/Bank Holidays: 12:00 - 14:00</li>
          </ul>
        </TextSection>
      </StyledSection>
      <ContactForm />
      <StyledSection>
        <TextSection>
          <h3>Speak with the team</h3>
          <p>{`Phone: ${phone}`}</p>
          <p>{`Email: ${email}`}</p>
        </TextSection>
      </StyledSection>
      <StyledDivider />
      <StyledSection>
        <TextSection>
          <h3>Our Address</h3>
          {addressElements}
        </TextSection>
      </StyledSection>
    </StyledContactWrapper>
  );
};

export default Contact;
