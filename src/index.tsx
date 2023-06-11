import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootRoute from './routes/root.route';
import ErrorRoute from './routes/error.route';
import LoginRoute from './routes/login.route';
import RegisterRoute from './routes/register.route';
import HomeRoute from './routes/home.route';

import './index.css';

// Initialize the MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      light: '#55af86',
      main: '#198755',
      dark: '#00522d',
      contrastText: '#fec57b'
    },
    secondary: {
      light: '#fec57b',
      main: '#ce7e24',
      dark: '#774300',
      contrastText: '#000'
    }
  },
  typography: {
    fontFamily: 'RobotoSlab'
  }
});

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: 'login',
        element: <LoginRoute />
      },
      {
        path: 'register',
        element: <RegisterRoute />
      },
      {
        path: 'home',
        element: <HomeRoute />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
