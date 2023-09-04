import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import _ from 'lodash';

import { useLazyGetRequestsForBookClubQuery } from '../../../redux/slices/book-club/membership-request.api.slice';
import { grey } from '@mui/material/colors';

// MUI emotion styles
const styles = {
  rootGrid: {
    py: 1,
    height: '100%',
    overflow: 'auto'
  },
  contentGrid: {
    ':nth-child(even)': {
      backgroundColor: grey[100]
    }
  },
  loadingSpinnerRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthInput: {
    width: '100%'
  }
};

/**
 * Book club admin sub-route reviewing membership requests
 */
const BookClubAdminMembershipRequestsRoute = () => {
  // Book club name from the route params
  const { bookClubName } = useParams();

  // Redux API query for membership requests for the current book club
  const [
    getMembershipRequests,
    { data: membershipRequests, isLoading: membershipRequestsLoading }
  ] = useLazyGetRequestsForBookClubQuery();

  // When we have the book club name from the route params, trigger the API query
  useEffect(() => {
    if (bookClubName) {
      getMembershipRequests(bookClubName);
    }
  }, [bookClubName, getMembershipRequests]);

  return (
    <Grid
      container
      justifyContent="center"
      sx={styles.rootGrid}
    >
      <Grid
        item
        container
        direction="column"
        xs={6}
        sx={styles.contentGrid}
      >
        {membershipRequestsLoading ? (
          <Grid
            item
            sx={styles.loadingSpinnerRow}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid
              item
              container
            >
              <Grid
                item
                xs={3}
              >
                <Typography variant="h6">Reader</Typography>
              </Grid>
              <Grid
                item
                xs={3}
              >
                <Typography variant="h6">Message</Typography>
              </Grid>
              <Grid
                item
                xs={3}
              >
                <Typography variant="h6">Approve</Typography>
              </Grid>
              <Grid
                item
                xs={1}
              >
                <Typography variant="h6">Deny</Typography>
              </Grid>
              <Grid
                item
                xs={2}
              >
                <Typography variant="h6">Requested</Typography>
              </Grid>
            </Grid>
            {_.map(membershipRequests || [], membershipRequest => (
              <Grid
                item
                container
              >
                <Grid
                  item
                  xs={2}
                ></Grid>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default BookClubAdminMembershipRequestsRoute;
