import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

const CompanyRoutes = () => {
  const { idToken, user } = useAuth();

  if (!idToken || user.role !== 'company') {
    return null;
  }

  return <Outlet />;
};

export default CompanyRoutes;
