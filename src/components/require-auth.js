import React, { useState, useEffect } from 'react';
import Login from '../views/login';

const RequireAuth = ({ as: Component }) => {
  const loggedIn = useState(false);

  useEffect(() => {
    // set there the loggedIn but for the meantime it is false;
  }, []);

  return !loggedIn ? <Login /> : <Component />;
};

export default RequireAuth;
