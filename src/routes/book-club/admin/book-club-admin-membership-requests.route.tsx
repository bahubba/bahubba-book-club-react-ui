import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import _ from 'lodash';

import { useLazyGetRequestsForBookClubQuery } from '../../../redux/api/book-club/membership-request.api.slice';
import MembershipRequestReviewForm from '../../../components/forms/membership-request-review.form';
import props from '../../../properties';

// MUI emotion styles
const styles = {
  rootGrid: {
    py: 1,
    maxHeight: '100%',
    overflow: 'auto'
  },
  loadingSpinnerRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paddedCell: {
    p: 1
  },
  centeredHeader: {
    display: 'flex',
    justifyContent: 'center'
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
    { data, isLoading: membershipRequestsLoading }
  ] = useLazyGetRequestsForBookClubQuery();

  // Pull the membership requests from the API response's content
  const membershipRequests = _.get(data, 'content');

  // Component state
  const [pageNum, setPageNum] = useState(0);

  // When we have the book club name from the route params, trigger the API query
  useEffect(() => {
    if (bookClubName) {
      getMembershipRequests({
        bookClubName,
        pageNum: 0,
        pageSize: props.PAGE_SIZE
      });
    }
  }, [bookClubName, getMembershipRequests]);

  // When the user scrolls to the bottom, load more membership requests
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Pull the target element from the event and treat it as the right type
    const target = event.target as HTMLDivElement;

    // If the user has scrolled to the bottom of the container, load the next page of membership requests
    if (
      bookClubName &&
      target.scrollHeight - Math.ceil(target.scrollTop) ===
        target.clientHeight &&
      !data?.last
    ) {
      setPageNum(pageNum + 1);
      getMembershipRequests({
        bookClubName,
        pageNum: pageNum + 1,
        pageSize: props.PAGE_SIZE
      });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={styles.rootGrid}
      onScroll={handleScroll}
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
            xs={3}
            sx={styles.paddedCell}
          >
            <Typography variant="h6">Reader</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={styles.paddedCell}
          >
            <Typography variant="h6">Message</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={styles.paddedCell}
          >
            <Typography variant="h6">Approve</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ ...styles.centeredHeader, ...styles.paddedCell }}
          >
            <Typography variant="h6">Deny</Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={styles.paddedCell}
          >
            <Typography variant="h6">Requested</Typography>
          </Grid>
          {_.map(membershipRequests || [], (membershipRequest, idx) => (
            <MembershipRequestReviewForm
              key={membershipRequest.id}
              membershipRequest={membershipRequest}
              oddCell={idx % 2 === 0}
            />
          ))}
        </>
      )}
    </Grid>
  );
};

export default BookClubAdminMembershipRequestsRoute;
