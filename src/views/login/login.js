import React, { useState } from 'react';
import * as Api from '../../api';
import { LoginContainer, LoginBg } from './login-styles';
import { useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import { actions as loginActions } from '../../reducers/login-slice';
import { actions as userActions } from '../../reducers/user-slice';

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useDispatch();

  const onClick = async params => {
    setIsLoggingIn(true);
    try {
      const { data } = await Api.login(params);

      setIsLoggingIn(false);
      localStorage.setItem('access_token', data.access_token);
      dispatch(loginActions.login());
      dispatch(userActions.setUser(data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setIsLoggingIn(false);
    }
  };

  return (
    <LoginBg>
      <LoginContainer onClick={onClick} disabled={isLoggingIn} />
    </LoginBg>
  );
};

export default Login;
