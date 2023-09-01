import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

import SectionHeader from '../../components/layout/section-header.component';
import BookClubAdminButton from '../../components/buttons/book-club-admin.button';
import RequestMembershipButton from '../../components/buttons/request-membership.button';
import { useLazyGetMembershipQuery } from '../../redux/slices/book-club/book-club.api.slice';
import { useLazyHasPendingRequestQuery } from '../../redux/slices/book-club/membership-request.api.slice';

// MUI styled components
const SectionContainerDiv = styled('div')(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
}));

const SectionContentDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(0.5),
  overflowY: 'auto'
}));

const SectionHeaderDiv = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

// MUI emotion styles
const styles = {
  rootGrid: {
    flexGrow: 1,
    paddingTop: 1,
    paddingBottom: 1,
    overflow: 'hidden'
  },
  sectionGrid: {
    height: '100%',
    px: 0.5,
    display: 'flex',
    flexDirection: 'column'
  }
};

/**
 * Home route/page for a given book club, displaying the club's readers, books, and discussions
 */
const BookClubHomeRoute = () => {
  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Book club name from the route params
  const { bookClubName } = useParams();

  // Redux API query for an existing book club and the user's membership (or lack thereof)
  const [
    getMembershipQuery,
    { data: membership, isLoading: membershipLoading, error: membershipError }
  ] = useLazyGetMembershipQuery();

  // Redux API query for whether or not the user has a pending membership request
  const [hasPendingRequestQuery, { data: hasPendingRequest }] =
    useLazyHasPendingRequestQuery();

  // When we have the book club name from the route params, trigger the API query
  useEffect(() => {
    if (bookClubName) {
      getMembershipQuery(bookClubName);
    }
  }, [bookClubName, getMembershipQuery]);

  // When we have the membership (or lack thereof) for the current user, redirect if necessary
  useEffect(() => {
    if (!membershipLoading) {
      if (membershipError) {
        // TODO - Handle error based on status code
        console.error(membershipError);
        navigate(-1);
      } else if (bookClubName && _.isEqual('NONE', membership?.clubRole)) {
        hasPendingRequestQuery(bookClubName);
      }
    }
  }, [
    navigate,
    hasPendingRequestQuery,
    bookClubName,
    membership,
    membershipLoading,
    membershipError
  ]);

  return (
    <>
      <SectionHeader
        title={bookClubName || 'Book Club'}
        typographyVariant="h4"
        justifyChildren="flex-start"
      >
        <>
          {_.isEqual('ADMIN', membership?.clubRole) && (
            <BookClubAdminButton bookClubName={bookClubName || 'Book Club'} />
          )}
          {!membership?.clubRole ||
            (_.isEqual('NONE', membership.clubRole) && !hasPendingRequest && (
              <RequestMembershipButton
                bookClubName={bookClubName || 'Book Club'}
              />
            ))}
        </>
      </SectionHeader>
      <Grid
        container
        spacing={1}
        sx={styles.rootGrid}
      >
        <Grid
          item
          xs={4}
          sx={styles.sectionGrid}
        >
          <SectionContainerDiv>
            <SectionHeaderDiv>
              <Typography
                component="div"
                variant="h5"
              >
                Readers
              </Typography>
            </SectionHeaderDiv>
            <SectionContentDiv>
              <Typography variant="h6">The club's readers go here</Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
        <Grid
          item
          xs={4}
          sx={styles.sectionGrid}
        >
          <SectionContainerDiv>
            <SectionHeaderDiv>
              <Typography
                component="div"
                variant="h5"
              >
                Books
              </Typography>
            </SectionHeaderDiv>
            <SectionContentDiv>
              <Typography variant="h6">
                Books the club has read go here
              </Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
        <Grid
          item
          xs={4}
          sx={styles.sectionGrid}
        >
          <SectionContainerDiv>
            <SectionHeaderDiv>
              <Typography
                component="div"
                variant="h5"
              >
                Discussions
              </Typography>
            </SectionHeaderDiv>
            <SectionContentDiv>
              <Typography variant="h6">
                Book club discussions go here
              </Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
      </Grid>
    </>
  );
};

export default BookClubHomeRoute;
