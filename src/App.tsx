import {
  AppBar,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

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

// MUI Styled Components
const AppBarTitleDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center'
}));

// MUI emotion styles
const styles = {
  titleDivElement: {
    px: 1
  },
  titleDivLink: {
    color: 'white'
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
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
            <span>Login</span>
            <span>Register</span>
          </AppBarTitleDiv>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default App;
