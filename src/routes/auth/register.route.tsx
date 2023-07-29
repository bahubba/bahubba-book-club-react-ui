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

import { useRegisterMutation } from '../../redux/slices/auth/auth.api.slice';
import { setCredentials } from '../../redux/slices/auth/auth.slice';

// MUI emotion styles
const styles = {
  contentContainer: {
    py: 1,
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

/**
 * Registration route/page
 */
const RegisterRoute = () => {
  // React router nav
  // TODO - Replace with route actions and redirect?
  const navigate = useNavigate();

  // Redux dispatcher
  const dispatch = useDispatch();

  // Register API call from redux-toolkit
  const [register, { isLoading }] = useRegisterMutation();

  // Refs
  const userRef = useRef<HTMLInputElement>(null);

  // State vars
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // Input change handlers
  const handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handleGivenNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGivenName(event.target.value);

  const handleSurnameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSurname(event.target.value);

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleConfirmPasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(event.target.value);

  // Submit handler
  const handleSubmit = async () => {
    try {
      // Send the register request to the API
      await register({
        username,
        email,
        givenName,
        surname,
        password
      });

      dispatch(setCredentials({ username }));

      // Clear the form
      setUsername('');
      setEmail('');
      setGivenName('');
      setSurname('');
      setPassword('');
      setConfirmPassword('');

      navigate('/home');
    } catch (err) {
      if (!_.has(err, 'status')) {
        setErrMessage('No Server Response');
      } else if (_.isEqual(409, _.get(err, 'status'))) {
        setErrMessage('Username or email already in use');
      } else {
        setErrMessage('Unknown error');
      }
    }
  };

  // On component load, focus on the username input
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Validate passwords match on input
  useEffect(() => {
    if (
      !_.isEmpty(password) &&
      !_.isEmpty(confirmPassword) &&
      !_.isEqual(password, confirmPassword)
    )
      setPasswordsMatch(false);
    else setPasswordsMatch(true);
  }, [password, confirmPassword]);

  // On required input changes, remove any error messages and see if the form is submittable
  useEffect(() => {
    setErrMessage('');

    if (
      !_.isEmpty(username) &&
      !_.isEmpty(email) &&
      passwordsMatch &&
      !_.isEmpty(password) &&
      !_.isEmpty(confirmPassword)
    )
      setCanSubmit(true);
    else setCanSubmit(false);
  }, [username, email, password, confirmPassword, passwordsMatch]);

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
        <Typography variant="h4">Register</Typography>
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
              id="username"
              variant="filled"
              size="small"
              label="Username"
              helperText="Must be unique"
              value={username}
              onChange={handleUsernameInput}
              required
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <TextField
              id="email"
              variant="filled"
              size="small"
              label="Email"
              helperText="Must be unique"
              value={email}
              onChange={handleEmailInput}
              required
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <TextField
              id="given-name"
              variant="filled"
              size="small"
              label="First Name"
              value={givenName}
              onChange={handleGivenNameInput}
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <TextField
              id="surname"
              variant="filled"
              size="small"
              label="Last Name"
              value={surname}
              onChange={handleSurnameInput}
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              type="password"
              variant="filled"
              size="small"
              label="Password"
              value={password}
              onChange={handlePasswordInput}
              required
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <TextField
              id="confirm-password"
              type="password"
              variant="filled"
              size="small"
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordInput}
              required
              error={!passwordsMatch}
              helperText={!passwordsMatch && 'Passwords must match'}
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              Register
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
              Already have an account? Login <Link to="../login">here</Link>
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterRoute;
