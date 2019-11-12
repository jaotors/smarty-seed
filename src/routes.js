import React from 'react';
import Login from './views/login';
import Dashboard from './views/dashboard';
import { Router } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';

const Routes = () => {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Router>
          <Login path="/login" />
          <Dashboard path="/" default />
        </Router>
      </StylesProvider>
    </>
  );
};

export default Routes;
