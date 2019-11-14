import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import TextField from '../../components/input';
import Button from '@material-ui/core/Button';

export const LoginBg = styled.div`
  background-color: #27ae60;
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
`;

const Box = styled.div`
  width: 50%;
`;

const Block = styled.div`
  width: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h1`
  color: #27ae60;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  padding: 15px 40px;
  border-radius: 30px;
`;

const SecondaryBtn = styled(StyledButton)`
  color: #27ae60;
  font-weight: 600;

  &:hover {
    background-color: transparent;
  }
`;

const PrimaryBtn = styled(StyledButton)`
  color: #fff;
  background-color: #27ae60;

  &:hover {
    background-color: #24a259;
  }
`;

export const LoginContainer = ({
  onLogin,
  onShowRegister,
  disabled,
  errorMessage,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = useCallback(() => {
    onLogin({ email, password });
  }, [email, password, onLogin]);

  return (
    <Block>
      <Box>
        <form autoComplete="off">
          <StyledHeader>Smarty Seed</StyledHeader>
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
          <ButtonContainer>
            <SecondaryBtn disabled={disabled} onClick={onShowRegister}>
              Register
            </SecondaryBtn>
            <PrimaryBtn disabled={disabled} onClick={onClickLogin}>
              Login
            </PrimaryBtn>
          </ButtonContainer>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </form>
      </Box>
    </Block>
  );
};

export const RegisterContainer = ({
  onRegister,
  onCancel,
  disabled,
  errorMessage,
}) => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  const onClickRegister = useCallback(() => {
    onRegister({
      email,
      password,
      first_name: firstname,
      last_name: lastname,
    });
  }, [email, password, firstname, lastname, onRegister]);

  return (
    <Block>
      <Box>
        <form autoComplete="off">
          <StyledHeader>Smarty Seed</StyledHeader>
          <TextField
            label="Email"
            id="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            fullWidth={true}
          />
          <TextField
            style={{ marginTop: '2rem' }}
            id="registerpassword"
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            fullWidth={true}
          />
          <TextField
            style={{ marginTop: '2rem' }}
            id="firstname"
            label="First Name"
            type="text"
            onChange={e => setFirstname(e.target.value)}
            fullWidth={true}
          />
          <TextField
            style={{ marginTop: '2rem' }}
            id="lastname"
            label="Last Name"
            type="text"
            onChange={e => setLastname(e.target.value)}
            fullWidth={true}
          />
          <ButtonContainer>
            <SecondaryBtn disabled={disabled} onClick={onCancel}>
              Back
            </SecondaryBtn>
            <PrimaryBtn disabled={disabled} onClick={onClickRegister}>
              Register
            </PrimaryBtn>
          </ButtonContainer>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </form>
      </Box>
    </Block>
  );
};
