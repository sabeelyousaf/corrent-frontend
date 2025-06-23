import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

const PrivateRoute = ({isAuthenticated, user, children}) => {
  const location = useLocation ();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
};

export default PrivateRoute;
