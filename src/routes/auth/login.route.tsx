import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin, GoogleCredentialResponse } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import _ from 'lodash';

import { setCredentials } from '../../redux/slices/auth/oauth2.slice';

// MUI emotion styles
const styles = {
  loadingSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
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

/**
 * Login route/page
 */
const LoginRoute = () => {
  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Redux dispatcher
  const dispatch = useDispatch();

  // Handle successful Google login
  const handleGoogleLoginSuccess = (rsp: GoogleCredentialResponse) => {
    if (!!rsp.credential && !_.isEmpty(rsp.credential)) {
      const decodedCredentials = jwtDecode(rsp.credential);
      dispatch(
        setCredentials({
          email: _.get(decodedCredentials, 'email', null),
          givenName: _.get(decodedCredentials, 'given_name', null),
          surname: _.get(decodedCredentials, 'family_name', null),
          imageUrl: _.get(decodedCredentials, 'picture', null),
          provider: 'GOOGLE'
        })
      );
      navigate('/home');
    }
  };

  // Handle failed Google login
  const handleGoogleLoginFailure = () => {
    toast.error('Google login failed');
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
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginRoute;
