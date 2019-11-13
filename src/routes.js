import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import React from 'react';
import Dashboard from './views/dashboard';
import Login from './views/login';
import ShowProject from './views/projects/show-project';
import styled from 'styled-components';

const AskLink = styled.a`
  color: #acacac;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    background-color: #24a259;
    color: #adadad;
  }
`;

const NotFound = () => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      fontSize: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <p style={{ margin: 0 }}>Not Found</p>
    <p style={{ margin: 0, fontSize: '2rem', color: '#acacac' }}>
      Ask
      <AskLink href="https://github.com/jmramos02">JM</AskLink>
    </p>
  </div>
);

const Routes = () => {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Router>
          <Login path="/login" />
          <Dashboard path="/" />
          <ShowProject path="/projects/:projectId" />
          <NotFound default />
        </Router>
      </StylesProvider>
    </>
  );
};

export default Routes;
