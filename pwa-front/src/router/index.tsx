import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignIn from 'screens/SignIn';
import SignUp from 'screens/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export default router;
