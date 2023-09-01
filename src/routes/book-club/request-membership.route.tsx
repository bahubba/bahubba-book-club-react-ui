import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';

import { useRequestMembershipMutation } from '../../redux/slices/book-club/membership-request.api.slice';

// MUI emotion styles
const styles = {
  loadingSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  rootGrid: {
    py: 2,
    maxHeight: '100%',
    overflow: 'auto'
  },
  fullWidthInput: {
    width: '100%'
  }
};

/**
 * Route for membership request form for a given book club
 */
const RequestMembershipRoute = () => {
  // Book club name from the route params
  const { bookClubName } = useParams();

  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Redux API hook for requesting membership
  const [requestMembership, { isLoading }] = useRequestMembershipMutation();

  // Component state
  const [message, setMessage] = useState('');

  // Handle message input
  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  // Handle submitting the form on enter keypress
  const handleKeydownSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleSubmit();
  };

  // Handle submitting the membership request
  // TODO - try/catch; toast error
  const handleSubmit = async () => {
    if (bookClubName) {
      await requestMembership({ bookClubName, message });
      toast.success(`Membership request sent to ${bookClubName}`, {
        position: 'bottom-right'
      });
      navigate(`/book-club/${bookClubName}`);
    }
  };

  return isLoading ? (
    <CircularProgress sx={styles.loadingSpinner} />
  ) : (
    <>
      <Typography
        component="div"
        variant="h4"
      >
        {`Request Membership in ${bookClubName}`}
      </Typography>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={styles.rootGrid}
      >
        <Grid
          container
          item
          spacing={1}
          sm={10}
          lg={8}
          xl={6}
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              id="request-message"
              variant="outlined"
              size="small"
              label="Message"
              placeholder="Write a brief introduction or tell the group why you'd like to join"
              value={message}
              onChange={handleMessageInput}
              onKeyDown={handleKeydownSubmit}
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid
            item
            xs={12}
            alignItems="center"
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Request Membership
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RequestMembershipRoute;
