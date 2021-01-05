import React, { useState, useEffect } from 'react';
import * as emailjs from 'emailjs-com';
import Spinner from '../../../components/UI/spinner/Spinner';
import { updateObject, validateInput } from '../../../utility/utility';
import styled from 'styled-components';

// KNOWN ISSUES: Field highlighting on invalid input is shared for name & email and shouldn't be.
// Error messages for invalid form inputs should be removed as user inputs valid entry.
// Field for 'Your Contact Number (Optional)' needed.

const StyledContactForm = styled.form`
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

const StyledInput = styled.input`
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${props => (props.invalid ? '#ecd7cd' : 'none')};
`;

const StyledTextArea = styled.textarea`
  resize: none;
  padding: 5px;
  font-size: larger;
  text-align: left;
  min-height: 150px;
  margin: 0 0 10px 0;
  background-color: ${props => (props.invalid ? '#ecd7cd' : 'none')};
`;

const StyledSpinnerWrapper = styled.div`
  min-height: 150px;
  background-color: white;
  padding: 5px;
  margin: 0 0 10px 0;
  border: 1px solid black;
`;

const StyledInvalidFormErrorMessage = styled.p`
  padding: 0;
  margin: 5px;
  text-align: center;
  color: red;
`;

const StyledFormFatalError = styled.div``;

const StyledFormSuccess = styled.div`
  color: #474747;
  background-color: white;
  padding: 25px;
  margin: 30px 15px 0 15px;
`;
const StyledDisclaimer = styled.p`
  text-align: center;
  padding: 10px 0 0 0;
`;

const StyledSelect = styled.select`
  font-size: large;
  padding: 10px 5px 10px 2px;
  margin-bottom: 5px;
`;

const Contact = () => {
  const [fatalAPIError, setFatalAPIError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailProgressStatus, setEmailProgressStatus] = useState({
    isSending: false,
    isSuccess: false,
  });
  const [invalidFormErrorMessages, setInvalidFormErrorMessages] = useState([]);
  const [nameElement, setNameElement] = useState({
    validation: {
      required: true,
      minLength: 2,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: 'Name must be at least 2 characters.',
    value: '',
  });
  const [emailElement, setEmailElement] = useState({
    validation: {
      required: true,
      isEmail: true,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: 'Please enter a valid email address.',
    value: '',
  });
  const [phoneElement, setPhoneElement] = useState({
    validation: {
      required: false,
    },
    value: '',
  });
  const [subjectElement, setSubjectElement] = useState({
    validation: {
      required: false,
    },
    wasTouched: false,
    isValid: true,
    value: '',
  });
  const [textBoxElement, setTextBoxElement] = useState({
    validation: {
      required: true,
      minLength: 10,
    },
    wasTouched: false,
    isValid: false,
    invalidFormErrorMessage: 'Message must be at least 10 characters.',
    value: '',
  });

  useEffect(() => {
    if (nameElement.isValid && emailElement.isValid && textBoxElement.isValid)
      setIsFormValid(true);
    else setIsFormValid(false);
  }, [nameElement, emailElement, subjectElement, textBoxElement]);

  const submitHandler = event => {
    event.preventDefault();

    if (isFormValid) {
      setEmailProgressStatus({ isSending: true, isSuccess: false });
      emailjs
        .sendForm(
          'gmail',
          'contact_twelveoak',
          'ContactForm',
          process.env.REACT_APP_EMAILJS_API_KEY
        )
        .then(response => {
          setEmailProgressStatus({ isSending: false, isSuccess: true });
        })
        .catch(error => {
          setEmailProgressStatus({ isSending: false, isSuccess: false });
          setFatalAPIError(true);
        });
    } else {
      // we filter out null elements to avoid later rendering an empty element to DOM
      setInvalidFormErrorMessages(
        [
          !nameElement.isValid ? nameElement.invalidFormErrorMessage : null,
          !emailElement.isValid ? emailElement.invalidFormErrorMessage : null,
          !textBoxElement.isValid
            ? textBoxElement.invalidFormErrorMessage
            : null,
        ].filter(element => element !== null)
      );
    }
  };

  const inputChangedHandler = (value, elementIdentifier) => {
    let targetElement;
    let setTargetElement;

    if (elementIdentifier === 'name') {
      targetElement = nameElement;
      setTargetElement = setNameElement;
    }
    if (elementIdentifier === 'email') {
      targetElement = emailElement;
      setTargetElement = setEmailElement;
    }
    if (elementIdentifier === 'subject') {
      targetElement = subjectElement;
      setTargetElement = setSubjectElement;
    }
    if (elementIdentifier === 'textBox') {
      targetElement = textBoxElement;
      setTargetElement = setTextBoxElement;
    }
    setTargetElement(
      updateObject(targetElement, {
        isValid: validateInput(value, targetElement.validation),
        wasTouched: true,
        value: value,
      })
    );
  };

  const fatalAPIErrorMessage = (
    <StyledFormFatalError>
      <h1>Something went really wrong...</h1>
      <h2>Our appologies, this shouldn't happen!</h2>
      <p>You can still contact us directly:</p>
      <p>Email us at Qandyinternational@gmail.com</p>
      <p>Call our team on 03333-110-888.</p>
      <i>(please let us know you received this error!)</i>
      <h2>You can copy your message from below</h2>
      <StyledTextArea
        defaultValue={textBoxElement.value}
        style={{ width: '95%' }}
      />
    </StyledFormFatalError>
  );

  const formSuccess = (
    <StyledFormSuccess>
      <h1>Success!</h1>
      <p>
        One of our team will be in contact shortly! We aim to get back to you
        within 24 hours.
      </p>
      <p>For urgent matters you can contact our team on 03333 110 888</p>
    </StyledFormSuccess>
  );

  let content = emailProgressStatus.isSuccess ? (
    formSuccess
  ) : (
    <StyledContactForm id="ContactForm" onSubmit={submitHandler}>
      {fatalAPIError ? (
        fatalAPIErrorMessage
      ) : (
        <>
          <StyledInput
            placeholder="Your Name"
            invalid={!nameElement.isValid && nameElement.wasTouched}
            name="name"
            onChange={event => inputChangedHandler(event.target.value, 'name')}
            value={nameElement.value}
          />
          <StyledInput
            placeholder="Your Email Address"
            invalid={!nameElement.isValid && nameElement.wasTouched}
            name="email"
            onChange={event => inputChangedHandler(event.target.value, 'email')}
            value={emailElement.value}
          />
          <StyledInput
            placeholder="Your Phone Number"
            invalid={!nameElement.isValid && nameElement.wasTouched}
            name="phone"
            onChange={event => inputChangedHandler(event.target.value, 'phone')}
            value={phoneElement.value}
          />
          <h2 style={{ textAlign: 'center' }}>How can we help?</h2>
          <StyledSelect
            name="subject"
            onChange={event =>
              inputChangedHandler(event.target.value, 'subject')
            }
            value={subjectElement.value}
          >
            <option value="General Enquiry">General Enquiry</option>
            <option value="Customer Support">Customer Support</option>
          </StyledSelect>
          {emailProgressStatus.isSending ? (
            <StyledSpinnerWrapper>
              <Spinner />
            </StyledSpinnerWrapper>
          ) : (
            <StyledTextArea
              placeholder="Your Message"
              invalid={!textBoxElement.isValid && textBoxElement.wasTouched}
              name="message"
              onChange={event =>
                inputChangedHandler(event.target.value, 'textBox')
              }
              value={textBoxElement.value}
            />
          )}
          {invalidFormErrorMessages.map((msg, idx) => (
            <StyledInvalidFormErrorMessage key={idx}>
              {msg}
            </StyledInvalidFormErrorMessage>
          ))}
          <button onSubmit={event => submitHandler(event)}>Submit</button>
          <StyledDisclaimer>
            Personal information provided is confidential.
          </StyledDisclaimer>
        </>
      )}
    </StyledContactForm>
  );

  return content;
};

export default Contact;
