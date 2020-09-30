import React from 'react';

import { Route as RouteDOM, RouteProps as RoutePropsDOM, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RouteProps extends RoutePropsDOM {
  isLoggedIn?: boolean;
  component: React.ComponentType;
}

const Routes: React.FC<RouteProps> = ({ isLoggedIn = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  // check if user is LoggedIn
  return (
    <RouteDOM
      {...rest}
      render={({ location }) => {
        return isLoggedIn === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isLoggedIn ? '/' : '/dashboard', state: { from: location } }} />
        );
      }}
    />
  );
};

export default Routes;
