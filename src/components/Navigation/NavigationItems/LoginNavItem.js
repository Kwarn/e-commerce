import React, { useState, useEffect, useContext } from 'react';
import { updateObject } from '../../../utility/utility';
import { validateInput } from '../../../utility/utility';
import Spinner from '../../UI/spinner/Spinner';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';

const StyledDrawContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 5;
  background-color: #ccc;
  width: 30vw;
  height: 30vh;
  right: 0;
  transition: top 0.6s;
  top: ${props =>
    props.isNavBarMinimized
      ? props.isHidden
        ? '-30vh'
        : '10vh'
      : props.isHidden
      ? '-30vh'
      : '20vh'};
`;

const StyledLoginSwitchMesssage = styled.h2`
  height: 20%;
  text-align: center;
  margin: 5vh auto 0 auto;
`;

const StyledLoginSwitchButton = styled.div`
  cursor: pointer;
  text-decoration: underline;
  width: fit-content;
  margin: 0 auto 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
`;

const StyledInput = styled.input`
  margin: auto;
  width: 80%;
`;
const StyledButton = styled.button`
  margin: auto;
`;

const LoginNavItem = ({ toggleCallback, isHidden, scrollPos }) => {
  const layouts = useContext(LayoutsContext);
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(false);

  const inputChangedHandler = (event, controlName) => {
    const updatedControl = updateObject(controls[controlName], {
      value: event.target.value,
      valid: validateInput(
        event.target.value,
        controls[controlName].validation
      ),
      touched: true,
    });

    const updatedControls = updateObject(controls, {
      [controlName]: updatedControl,
    });

    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    // props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let formElements = formElementsArray.map(elem => (
    <StyledInput
      key={elem.id}
      elementType={elem.config.elementType}
      elementConfig={elem.config.elementConfig}
      value={elem.config.value || elem.config.placeholder}
      invalid={elem.config.valid}
      shouldValidate={elem.config.validation}
      touched={elem.config.touched}
      changed={event => inputChangedHandler(event, elem.id)}
    />
  ));

  // if (isLoading) form = <Spinner />;

  return (
    <StyledDrawContainer
      isNavBarMinimized={!scrollPos.visible}
      {...layouts}
      isHidden={isHidden}
    >
      <StyledLoginSwitchMesssage>
        {isSignup ? 'Already Have an account?' : `Don't have an account yet?`}
      </StyledLoginSwitchMesssage>
      <StyledLoginSwitchButton onClick={switchAuthModeHandler} btnType="Danger">
        {isSignup ? 'Switch To Login' : 'Sign Up!'}
      </StyledLoginSwitchButton>
      <StyledForm onSubmit={submitHandler}>
        {formElements}
        <StyledButton btnType="Success">Submit</StyledButton>
      </StyledForm>
      <StyledButton onClick={() => toggleCallback()}>Close</StyledButton>
    </StyledDrawContainer>
  );
};

export default LoginNavItem;
