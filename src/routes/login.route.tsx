import { useEffect, useRef, useState } from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { setCredentials } from '../redux/slices/auth/auth.slice';
import { useLoginMutation } from '../redux/slices/auth/auth.api.slice';

// MUI emotion styles
const styles = {
  contentContainer: {
    pt: 1,
    height: '100%',
    overflow: 'auto'
  },
  errMessageContainer: {
    paddingTop: '0 !important', // Needs important to override grid spacing
    color: 'red'
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
  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Redux dispatcher
  const dispatch = useDispatch();

  // Login API call from redux-toolkit
  const [login, { isLoading }] = useLoginMutation();

  // Refs
  const userRef = useRef<HTMLInputElement>(null);

  // State vars
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  // Input change handlers
  const handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsernameOrEmail(event.target.value);

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  // Handle submitting the login form
  const handleSubmit = async () => {
    try {
      // Send the request to the API, and on success, set credentials, clear the form, and redirect
      const userData = await login({ usernameOrEmail, password }).unwrap();
      dispatch(setCredentials({ ...userData, username: usernameOrEmail }));
      setUsernameOrEmail('');
      setPassword('');
      navigate('/home');
    } catch (err) {
      if (!_.has(err, 'status')) {
        setErrMessage('No Server Response');
      } else if (_.isEqual(400, _.get(err, 'status'))) {
        setErrMessage('Missing username or password');
      } else if (_.isEqual(401, _.get(err, 'status'))) {
        setErrMessage('Unauthorized');
      } else {
        setErrMessage('Login failed');
      }
    }
  };

  // On component load, focus on the username field
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Hide error message when input changes
  useEffect(() => {
    setErrMessage('');
  }, [usernameOrEmail, password]);

  return isLoading ? (
    <CircularProgress />
  ) : (
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
          {!_.isEmpty(errMessage) && (
            <Grid
              item
              sx={styles.errMessageContainer}
            >
              <Typography variant="body2">{errMessage}</Typography>
            </Grid>
          )}
          <Grid item>
            <TextField
              inputRef={userRef}
              required
              id="username"
              variant="filled"
              label="Username"
              value={usernameOrEmail}
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
