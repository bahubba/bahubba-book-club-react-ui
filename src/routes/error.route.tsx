import { useRouteError } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { Typography } from '@mui/material';

// MUI styled components
const CenteredDiv = styled('div')({
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

const ErrorRoute = () => {
  const routeError = useRouteError();

  return (
    <CenteredDiv id="error-page">
      <Typography variant="h3">Page Not Found</Typography>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{_.get(routeError, 'statusText', _.get(routeError, 'message'))}</i>
      </p>
    </CenteredDiv>
  );
};

export default ErrorRoute;
