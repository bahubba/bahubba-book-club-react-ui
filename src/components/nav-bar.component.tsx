import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// MUI Styled Components
const AppBarTitleDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center'
}));

const NavBarLink = styled(Link)({
  textDecoration: 'none'
});

// MUI emotion styles
const styles = {
  titleDivElement: {
    px: 1
  },
  titleDivLink: {
    color: 'white',
    textDecoration: 'none !important'
  }
};

const NavBar = () => {
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
            BAHubba Book Club Manager
          </Typography>
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
        </AppBarTitleDiv>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
