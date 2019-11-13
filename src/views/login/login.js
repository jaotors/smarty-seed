import React, { useState } from 'react';
import * as Api from '../../api';
import { LoginContainer, LoginBg } from './login-styles';
import { navigate } from '@reach/router';

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const onClick = async params => {
    setIsLoggingIn(true);
    try {
      const { data } = await Api.login(params);

      setIsLoggingIn(false);
      localStorage.setItem('access_token', data.access_token);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.errorDetails.errors[0])
      setIsLoggingIn(false);
    }
  };

  return (
    <LoginBg>
      <LoginContainer onClick={onClick} disabled={isLoggingIn} errorMessage={errorMessage} />
    </LoginBg>
  );
};

export default Login;
