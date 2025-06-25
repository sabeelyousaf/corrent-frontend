import React from 'react';
import {Navigate, useLocation, useMatch} from 'react-router-dom';

const PublicOnlyRoute = ({isAuthenticated, user, children}) => {
  const location = useLocation ();

  const onboardingMatch = useMatch ('/register/next-step');
  const verifyOTP = useMatch ('/verify-otp');

  if (!isAuthenticated) {
    return children;
  }

  if (onboardingMatch && !user.isOnboarded) {
    return children;
  }

  if (verifyOTP && !user.isEmailVerified) {
    return children;
  }

  if (!user.isOnboarded) {
    return (
      <Navigate to="/register/next-step" state={{from: location}} replace />
    );
  }

  if (!user.isEmailVerified) {
    return <Navigate to={`/verify-otp`} state={{from: location}} replace />;
  }

  switch (user.role) {
    case 'admin':
      return (
        <Navigate to="/admin/dashboard" state={{from: location}} replace />
      );
    case 'property_owner':
      return <Navigate to="/dashboard" state={{from: location}} replace />;
    case 'finance':
      return <Navigate to="/dashboard" state={{from: location}} replace />;
    case 'seller':
      return (
        <Navigate to="/seller/dashboard" state={{from: location}} replace />
      );
    case 'user':
    default:
      return <Navigate to="/" state={{from: location}} replace />;
  }
};

export default PublicOnlyRoute;
