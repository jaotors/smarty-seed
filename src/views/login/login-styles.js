import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import TextField from '../../components/input';
import Button from '@material-ui/core/Button';

const LoginBox = styled.div`
  width: 50%;
`;

const LoginBlock = styled.div`
  width: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoginHeader = styled.h1`
  color: #27ae60;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
`;

const LoginButtonContainer = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  padding: 15px 40px;
  border-radius: 30px;
`;

const RegisterButton = styled(StyledButton)`
  color: #27ae60;
  font-weight: 600;

  &:hover {
    background-color: transparent;
  }
`;

const LoginBtn = styled(StyledButton)`
  color: #fff;
  background-color: #27ae60;

  &:hover {
    background-color: #24a259;
  }
`;

export const LoginContainer = ({ onClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = useCallback(() => {
    console.log('username', username);
    console.log('password', password);
    onClick({ username, password });
  }, [username, password, onClick]);

  return (
    <LoginBlock>
      <LoginBox>
        <StyledLoginHeader>Smarty Seed</StyledLoginHeader>
        <TextField
          label="Username"
          id="username"
          onChange={e => setUsername(e.target.value)}
          fullWidth={true}
        />
        <TextField
          style={{ marginTop: '2rem' }}
          id="password"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          fullWidth={true}
        />
        <LoginButtonContainer>
          <RegisterButton onClick={onClickLogin}>Register</RegisterButton>
          <LoginBtn onClick={onClickLogin}>Login</LoginBtn>
        </LoginButtonContainer>
      </LoginBox>
    </LoginBlock>
  );
};

export const LoginBg = styled.div`
  background-color: #27ae60;
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
`;
