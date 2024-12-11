// src/Components/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Cambié Redirect por Navigate

interface PrivateRouteProps {
  children: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const token = localStorage.getItem('token'); // Verifica si el usuario tiene un token

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" replace />;
  }

  return <Route path={path} element={children} />;
};

export default PrivateRoute;
