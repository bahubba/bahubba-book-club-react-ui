import { useEffect, useState } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';

import {useRegisterMutation } from '../redux/slices/auth/auth.api.slice';

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

const RegisterRoute = () => {
  // React router nav
  // TODO - Replace with route actions and redirect?
  const navigate = useNavigate();

  // Register API call from redux-toolkit
  const [register, { isLoading }] = useRegisterMutation();

  // State vars
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);

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
  // TODO - Replace with router action?
  // TODO - Save login auth token
  const handleSubmit = async () => {
    // Send the register request to the API
    const userData = await register({
      username,
      email,
      givenName,
      surname,
      password
    });

    // Clear the form
    setUsername('');
    setEmail('');
    setGivenName('');
    setSurname('');
    setPassword('');
    setConfirmPassword('');

    navigate('/home');
  };

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

  // On required input changes, see if the form is submittable
  useEffect(() => {
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
        <Typography variant="h4">Register</Typography>
        <Grid
          container
          direction="column"
          spacing={1}
          sx={styles.formContainer}
        >
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
