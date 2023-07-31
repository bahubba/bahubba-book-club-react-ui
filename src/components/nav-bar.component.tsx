import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../redux/slices/auth/auth.api.slice';
import { clearCredentials, selectAuth } from '../redux/slices/auth/auth.slice';
import NotificationsButton from './buttons/notifications.button';

// MUI Styled Components
const AppBarTitleDiv = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center'
});

const TitleLink = styled(Link)({
  textDecoration: 'none',
  color: 'secondary.main'
});

const NavBarLink = styled(Link)({
  textDecoration: 'none'
});

// MUI emotion styles
const styles = {
  titleDivElement: {
    px: 1,
    color: 'secondary.light'
  },
  titleTypographyLink: {
    cursor: 'pointer',
    color: 'white'
  },
  titleDivLink: {
    color: 'white',
    textDecoration: 'none !important'
  },
  welcomeText: {
    pr: 1,
    fontStyle: 'italic'
  }
};

/**
 * Navigation bar component
 */
const NavBar = () => {
  // Current location from react-router-dom
  const location = useLocation();

  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Logout API call from redux-toolkit
  const [logout] = useLogoutMutation();

  // Redux dispatcher and auth state
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  // Handle logout
  const handleLogout = () => {
    dispatch(clearCredentials());
    logout({});
    navigate('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Link to="/home">
          <img
            src="/favicon/favicon.ico"
            alt=""
            height="30"
            width="30"
          />
        </Link>
        <AppBarTitleDiv>
          <TitleLink to="/home">
            <Typography
              variant="h5"
              sx={styles.titleDivElement}
            >
              {process.env.REACT_APP_TITLE || 'BAHubba Book Club Manager'}
            </Typography>
          </TitleLink>
          {auth.isLoggedIn ? (
            <>
              <Typography
                sx={[styles.titleDivElement, styles.titleTypographyLink]}
                onClick={handleLogout}
              >
                Logout
              </Typography>
            </>
          ) : (
            <>
              {location.pathname !== '/register' && (
                <NavBarLink
                  to="register"
                  sx={[styles.titleDivElement, styles.titleDivLink]}
                >
                  Register
                </NavBarLink>
              )}
              {location.pathname !== '/login' && (
                <NavBarLink
                  to="login"
                  sx={[styles.titleDivElement, styles.titleDivLink]}
                >
                  Login
                </NavBarLink>
              )}
            </>
          )}
        </AppBarTitleDiv>
        {auth.isLoggedIn && (
          <>
            {/* TODO - Replace username with given name */}
            <Typography
              variant="h6"
              sx={styles.welcomeText}
            >{`Welcome, ${auth.username}`}</Typography>
            <NotificationsButton />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
