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

const RegisterBtn = styled(StyledButton)`
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

export const LoginContainer = ({ onClick, disabled, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = useCallback(() => {
    onClick({ email, password });
  }, [email, password, onClick]);

  return (
    <LoginBlock>
      <LoginBox>
          <StyledLoginHeader>Smarty Seed</StyledLoginHeader>
          <TextField
            label="Email"
            id="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
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
            <RegisterBtn disabled={disabled} onClick={onClickLogin}>
              Register
            </RegisterBtn>
            <LoginBtn disabled={disabled} onClick={onClickLogin}>
              Login
            </LoginBtn>
          </LoginButtonContainer>
          <p style={{color: "red"}}>{errorMessage}</p>
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
