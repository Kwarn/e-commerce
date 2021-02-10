import React, { useContext } from 'react';
import styled from 'styled-components';
import ContactForm from './ContactForm/ContactForm';
import background from '../../assets/sidebarBackground.jpg';
import LayoutContext from '../../Layout/LayoutsContext';

const StyledContactWrapper = styled.div`
  padding-top: ${props => (props.isDesktop ? '5vh' : 0)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  width: 100%;
  height: 100%;
  color: #eee;
  min-height: ${props =>
    props.isMobile ? '86vh' : props.isTablet ? '88vh' : '90vh'};
`;

const StyledGroup = styled.section`
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledDivider = styled.hr`
  width: ${props => (props.isDesktop ? '65%' : props.isTablet ? '80%' : '90%')};
  margin: 30px auto 30px auto;
`;

const StyledTextSection = styled.div`
  margin: 0 30px 0 30px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  ul {
    text-align: right;
    padding: 0;
    margin: 0 60px 0 0;
    list-style-type: none;
    align-self: center;
  }

  p {
    margin: 0px 0 5px 0;
    padding: 0;
  }
`;

const Contact = () => {
  const layouts = useContext(LayoutContext);
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

  return (
    <StyledContactWrapper {...layouts}>
      <StyledDivider {...layouts} />
      <StyledGroup>
        <StyledTextSection>
          <h3>Customer Service Open Hours</h3>
          <ul>
            <li>
              Monday - Thursday: <b>9:00 - 17:30</b>
            </li>
            <li>
              Friday: <b>9:00 - 17:00</b>
            </li>
            <li>
              Weekends: <b> 12:00 - 14:00</b>
            </li>
          </ul>
          <StyledDivider {...layouts} />
          <h3>Speak with the team</h3>
          <p>Phone: 03333 110 888</p>
          <p>Email: Qandyinternational@gmail.com</p>
          <StyledDivider {...layouts} />
          <h3>Our Address</h3>
          {addressElements}
        </StyledTextSection>
        <ContactForm />
      </StyledGroup>
      <StyledDivider {...layouts} />
    </StyledContactWrapper>
  );
};

export default Contact;
