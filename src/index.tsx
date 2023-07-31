import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { persistor, store } from './redux/store';
import RootRoute from './routes/root.route';
import ErrorRoute from './routes/error.route';
import LoginRoute from './routes/auth/login.route';
import RegisterRoute from './routes/auth/register.route';
import HomeRoute from './routes/home.route';
import CreateBookClubRoute from './routes/book-club/create-book-club.route';
import RequireAuthRoute from './routes/auth/require-auth.route';

import './index.css';
import BookClubCard from './components/cards/book-club.card';
import { Publicity } from './interfaces';

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
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1.25rem'
        }
      }
    }
  }
});

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      /* AUTH ROUTES */
      {
        path: 'login',
        element: <LoginRoute />
      },
      {
        path: 'register',
        element: <RegisterRoute />
      },

      /* MISC ROUTES */
      {
        path: 'home',
        element: <RequireAuthRoute protectedRoute={<HomeRoute />} />
      },
      {
        path: 'notifications',
        element: <RequireAuthRoute protectedRoute={<div>Notifications</div>} />
      },

      /* BOOK CLUB ROUTES */
      {
        path: 'book-club',
        children: [
          {
            path: 'create',
            element: (
              <RequireAuthRoute protectedRoute={<CreateBookClubRoute />} />
            )
          },
          {
            path: ':bookClubName',
            element: (
              // DELETEME: This is just a sample BookClubCard
              <RequireAuthRoute
                protectedRoute={
                  <BookClubCard
                    bookClub={{
                      name: 'Test Book Club',
                      description: 'This is a test book club',
                      publicity: Publicity.PUBLIC,
                      imageURL:
                        'https://wordsrated.com/wp-content/uploads/2022/02/Number-of-Books-Published-Per-Year.jpg'
                    }}
                  />
                }
              />
            )
          }
        ]
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
