import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { persistor, store } from './redux/store';
import RootRoute from './routes/root.route';
import ErrorRoute from './routes/error.route';
import LoginRoute from './routes/login.route';
import RegisterRoute from './routes/register.route';
import HomeRoute from './routes/home.route';
import RequireAuthRoute from './routes/require-auth.route';

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
        element: <RequireAuthRoute protectedRoute={<HomeRoute />} />
      },
      {
        path: 'notifications',
        element: <RequireAuthRoute protectedRoute={<div>Notifications</div>} />
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
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
