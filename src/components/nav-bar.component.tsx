import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../redux/slices/auth/auth.api.slice';
import {
  clearCredentials,
  selectIsLoggedIn
} from '../redux/slices/auth/auth.slice';
import NotificationsButton from './buttons/notifications.button';

// MUI Styled Components
const AppBarTitleDiv = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center'
});

const NavBarLink = styled(Link)({
  textDecoration: 'none'
});

// MUI emotion styles
const styles = {
  titleDivElement: {
    px: 1
  },
  titleTypographyLink: {
    cursor: 'pointer',
    color: 'white'
  },
  titleDivLink: {
    color: 'white',
    textDecoration: 'none !important'
  }
};

const NavBar = () => {
  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Logout API call from redux-toolkit
  const [logout] = useLogoutMutation();

  // Redux dispatcher and auth state
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Handle logout
  const handleLogout = () => {
    dispatch(clearCredentials());
    logout({});
    navigate('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <img
          src="/favicon/favicon.ico"
          alt=""
          height="30"
          width="30"
        />
        <AppBarTitleDiv>
          <Typography
            variant="h6"
            sx={styles.titleDivElement}
          >
            {process.env.REACT_APP_TITLE || 'BAHubba Book Club Manager'}
          </Typography>
          {isLoggedIn ? (
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
              <NavBarLink
                to="register"
                sx={[styles.titleDivElement, styles.titleDivLink]}
              >
                Register
              </NavBarLink>
              <NavBarLink
                to="login"
                sx={[styles.titleDivElement, styles.titleDivLink]}
              >
                Login
              </NavBarLink>
            </>
          )}
        </AppBarTitleDiv>
        {isLoggedIn && <NotificationsButton />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
