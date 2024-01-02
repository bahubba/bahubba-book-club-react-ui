import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import _ from 'lodash';

import { useLazyGetMembersQuery } from '../../../redux/api/book-club/book-club-membership.api.slice';
import BookClubManageMemberForm from '../../../components/forms/book-club-manage-member.form';
import props from '../../../properties';
import { ErrorResponse, PaginatedResponse } from '../../../redux/interfaces';
import { BookClubMembership } from '../../../interfaces';

// MUI emotion styles
const styles = {
  rootGrid: {
    py: 1,
    maxHeight: '100%',
    overflowY: 'scroll'
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
 * Book club admin sub-route managing members
 */
const BookClubAdminMembersRoute = () => {
  // Book club name from the route params
  const { bookClubName } = useParams();

  // Redux API query for members of the current book club
  const [getMembers, { data, isLoading: membersLoading, error }] =
    useLazyGetMembersQuery();
  const errRsp = error as ErrorResponse<PaginatedResponse<BookClubMembership>>;

  // Pull the members from the API response's content
  const members = _.get(data, 'content', _.get(errRsp, 'data.data.content'));

  // Component state
  const [pageNum, setPageNum] = useState(0);

  // When the user scrolls to the bottom, load more members
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Pull the target element from the event and treat it as the right type
    const target = event.target as HTMLDivElement;

    // If the user has scrolled to the bottom of the container, load the next page of book clubs
    if (
      bookClubName &&
      target.scrollHeight - Math.ceil(target.scrollTop) ===
        target.clientHeight &&
      !(data?.last || errRsp?.data?.data?.last)
    ) {
      setPageNum(pageNum + 1);

      getMembers({
        bookClubName,
        pageNum: pageNum + 1,
        pageSize: props.PAGE_SIZE
      });
    }
  };

  // When we have the book club name from the route params, trigger the API query
  useEffect(() => {
    if (bookClubName) {
      getMembers({
        bookClubName,
        pageNum: 0,
        pageSize: props.PAGE_SIZE
      });
    }
  }, [bookClubName, getMembers]);

  return (
    <Grid
      container
      justifyContent="center"
      sx={styles.rootGrid}
      onScroll={handleScroll}
    >
      {membersLoading ? (
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
            xs={4}
            sx={styles.paddedCell}
          >
            <Typography variant="h6">Member</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={styles.paddedCell}
          >
            <Typography variant="h6">Role</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ ...styles.paddedCell, ...styles.centeredHeader }}
          >
            <Typography variant="h6">Remove</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ ...styles.paddedCell, ...styles.centeredHeader }}
          >
            <Typography variant="h6">Make Owner</Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={styles.paddedCell}
          >
            <Typography variant="h6">Joined</Typography>
          </Grid>
          {_.map(members || [], (member, idx) => (
            <BookClubManageMemberForm
              key={member.reader.id}
              membership={member}
              oddCell={idx % 2 === 0}
            />
          ))}
        </>
      )}
    </Grid>
  );
};

export default BookClubAdminMembersRoute;
