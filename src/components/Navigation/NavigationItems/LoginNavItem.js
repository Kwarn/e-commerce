import React, { useState, useContext, useEffect } from 'react';
import { updateObject } from '../../../utility/utility';
import { validateInput } from '../../../utility/utility';
import styled from 'styled-components';
import LayoutsContext from '../../../Layout/LayoutsContext';
import { AuthStateContext } from '../../../Auth/AuthStateProvider';
import Button from '../../Button/Button';
import Spinner from '../../UI/spinner/Spinner';
import { useQuery } from '@apollo/client';
import { QUERY_LOGIN } from '../../../GraphQl/Queries';
import { useHistory } from 'react-router';

const StyledDrawContainer = styled.div`
  color: #474747;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 5;
  border-radius: 0 0 150px 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) -10%,
    rgba(173, 93, 50, 1) 97%
  );
  width: 20vw;
  right: 0;
  height: 100%;
  max-height: ${props => (props.isHidden ? '0vh' : '30vh')};
  top: ${props => (props.isNavBarMinimized ? '10vh' : '20vh')};
  transition: top 0.6s, max-height 0.6s ease-in-out;
  overflow: hidden;
`;

const StyledDrawElementsWrapperForAnimation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.isHidden ? 0 : 1)};
  transition: opacity 1s ease-in-out;
`;

const StyledLoginSwitchMesssage = styled.h3`
  height: 20%;
  text-align: center;
  margin: 5vh auto 0 auto;
`;

const StyledLoginSwitchButton = styled.div`
  cursor: pointer;
  text-decoration: underline;
  width: fit-content;
  margin: -15px auto 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
`;

const StyledInput = styled.input`
  margin: 0 auto 5px auto;
  padding: 5px;
  height: 20px;
  width: 80%;
`;

const StyledSubmitButtonContainer = styled.div`
  margin: 5px auto 10px auto;
`;

const StyledCloseButtonContainer = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
`;

const LoginNavItem = ({ toggleCallback, isHidden, scrollPos }) => {
  const history = useHistory();
  const layouts = useContext(LayoutsContext);
  const [showError, setShowError] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { authState, appSetLogout, appSetLogin, gqlError } =
    useContext(AuthStateContext);

  const loginHandler = async event => {
    event.preventDefault();
    setSkipQuery(false);
  };

  const logoutHandler = () => {
    appSetLogout();
    history.push('/home');
  };

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
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'name',
        placeholder: 'Name',
      },
      value: '',
      validation: {
        required: true,
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
  const [skipQuery, setSkipQuery] = useState(true);
  const { loading, error, data } = useQuery(QUERY_LOGIN, {
    variables: {
      email: controls.email.value,
      password: controls.password.value,
    },
    skip: skipQuery,
    fetchPolicy: 'cache-and-network',
  });

  const __DEV__autoFillLogin = () => {
    setControls(prevControls => {
      return {
        ...prevControls,
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Email',
          },
          value: process.env.REACT_APP_AUTO_LOGIN_EMAIL,
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
          value: process.env.REACT_APP_AUTO_LOGIN_PASSWORD,
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      };
    });
  };

  useEffect(() => {
    if (!skipQuery) {
      const onCompleted = () => {};
      const onError = () => {};
      if (onCompleted || onError) {
        if (onCompleted && !loading && !error) {
          appSetLogin({ token: data.login.token, userId: data.login.userId });
          setSkipQuery(true);
        } else if (onError && !loading && error) {
          console.log('useQueryError: ', error);
          console.log(gqlError);
          setSkipQuery(true);
        }
      }
    }
  }, [loading, data, error]);

  const inputChangedHandler = (event, controlName) => {
    setShowError(false);
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

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in controls) {
    if (key === 'name' && !isSignup) {
      continue;
    } else {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }
  }

  let formElements = formElementsArray.map(elem => (
    <StyledInput
      key={elem.id}
      type={elem.id === 'password' ? 'password' : null}
      placeholder={elem.config.elementConfig.placeholder}
      elementType={elem.config.elementType}
      value={elem.config.value}
      invalid={elem.config.valid}
      shouldValidate={elem.config.validation}
      touched={elem.config.touched}
      onChange={event => inputChangedHandler(event, elem.id)}
    />
  ));

  const form = loading ? (
    <Spinner />
  ) : authState.userId ? (
    <div onClick={logoutHandler}>Logout</div>
  ) : (
    <>
      <StyledLoginSwitchMesssage>
        {isSignup ? 'Already Have an account?' : `Don't have an account yet?`}
      </StyledLoginSwitchMesssage>
      <StyledLoginSwitchButton onClick={switchAuthModeHandler} btnType="Danger">
        {isSignup ? 'Switch To Login' : 'Sign Up!'}
      </StyledLoginSwitchButton>
      <StyledForm onSubmit={loginHandler}>
        {formElements}
        <StyledSubmitButtonContainer>
          <Button isDarkText={true} text={isSignup ? 'Continue' : 'Login'} />
        </StyledSubmitButtonContainer>
      </StyledForm>
      <StyledCloseButtonContainer>
        <Button
          isDarkText={true}
          callback={() => toggleCallback()}
          text={'X'}
        />
      </StyledCloseButtonContainer>
      <StyledCloseButtonContainer>
        <Button
          isDarkText={true}
          callback={() => __DEV__autoFillLogin()}
          text={'AutoFill login'}
        />
      </StyledCloseButtonContainer>
    </>
  );

  return (
    <StyledDrawContainer
      isNavBarMinimized={!scrollPos.visible}
      {...layouts}
      isHidden={isHidden}
    >
      <StyledDrawElementsWrapperForAnimation isHidden={isHidden}>
        {showError ? <div>{showError}</div> : null}
        {form}
      </StyledDrawElementsWrapperForAnimation>
    </StyledDrawContainer>
  );
};

export default LoginNavItem;
