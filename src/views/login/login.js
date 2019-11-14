import React, { useState } from 'react';
import * as Api from '../../api';
import { LoginContainer, LoginBg, RegisterContainer } from './login-styles';
import { navigate } from '@reach/router';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const onLogin = async params => {
    setIsLoading(true);
    try {
      const { data } = await Api.login(params);

      setIsLoading(false);
      localStorage.setItem('access_token', data.access_token);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.errorDetails.errors[0]);
      setIsLoading(false);
    }
  };

  const onRegister = async params => {
    setIsLoading(true);
    try {
      const { data } = await Api.register(params);

      setIsLoading(false);
      localStorage.setItem('access_token', data.access_token);
      console.log('data', data);
      // navigate('/');
    } catch (error) {
      setErrorMessage(error.toString());
      setIsLoading(false);
    }
  };

  return (
    <LoginBg>
      {!showRegister ? (
        <LoginContainer
          onLogin={onLogin}
          onShowRegister={() => setShowRegister(true)}
          disabled={isLoading}
          errorMessage={errorMessage}
        />
      ) : (
        <RegisterContainer
          onRegister={onRegister}
          onCancel={() => setShowRegister(false)}
          disabled={isLoading}
          errorMessage={errorMessage}
        />
      )}
    </LoginBg>
  );
};

export default Login;
