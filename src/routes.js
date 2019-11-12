import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import React from 'react';
import Dashboard from './views/dashboard';
import Login from './views/login';
import ShowProject from './views/projects/show-project';

const Routes = () => {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Router>
          <Login path="/login" />
          <Dashboard path="/" default />
          <ShowProject path="/projects/:projectId" />
        </Router>
      </StylesProvider>
    </>
  );
};

export default Routes;
