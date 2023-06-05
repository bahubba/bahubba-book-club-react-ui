import { useState } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// MUI emotion styles
const styles = {
  contentContainer: {
    pt: 1
  },
  formContainer: {
    mt: 1
  },
  fullWidthInput: {
    width: '100%'
  },
  registerMessage: {
    display: 'flex',
    justifyContent: 'center'
  }
};

const LoginRoute = () => {
  // State vars
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Input change handlers
  const handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = () => {
    console.log('submitted');
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={styles.contentContainer}
    >
      <Grid
        item
        xs={5}
      >
        <Typography variant="h4">Login</Typography>
        <Grid
          container
          direction="column"
          spacing={1}
          sx={styles.formContainer}
        >
          <Grid item>
            <TextField
              required
              id="username"
              variant="filled"
              label="Username"
              value={username}
              onChange={handleUsernameInput}
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              required
              id="password"
              variant="filled"
              label="Password"
              value={password}
              onChange={handlePasswordInput}
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid
            item
            sx={styles.registerMessage}
          >
            <span>
              Need an account? Register <Link to="../register">here</Link>
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginRoute;
