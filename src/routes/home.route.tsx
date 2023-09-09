import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

import { useGetBookClubsForReaderQuery } from '../redux/slices/book-club/book-club.api.slice';

import SectionHeader from '../components/layout/section-header.component';
import BookClubCard from '../components/cards/book-club.card';
import CreateBookClubButton from '../components/buttons/create-book-club.button';
import BookClubSearchButton from '../components/buttons/book-club-search.button';

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
 * Home route/page displaying the user's clubs, books, and other trending information
 */
const HomeRoute = () => {
  // Redux API query for the user's book clubs
  const { data: bookClubs, isLoading } = useGetBookClubsForReaderQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <Typography
        component="div"
        variant="h4"
      >
        Home
      </Typography>
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
            <SectionHeader title="My Clubs">
              <BookClubSearchButton />
              <CreateBookClubButton />
            </SectionHeader>
            <SectionContentDiv>
              {!isLoading && bookClubs && (
                <Grid
                  container
                  spacing={1}
                >
                  {_.map(bookClubs, bookClub => (
                    <Grid
                      item
                      sm={12}
                      lg={6}
                      xl={4}
                      key={bookClub.id}
                    >
                      <BookClubCard bookClub={bookClub} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
        <Grid
          item
          xs={4}
          sx={styles.sectionGrid}
        >
          <SectionContainerDiv>
            <SectionHeader title="My Books" />
            <SectionContentDiv>
              <Typography variant="h6">Books you've read go here</Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
        <Grid
          item
          xs={4}
          sx={styles.sectionGrid}
        >
          <SectionContainerDiv>
            <SectionHeader title="Trending" />
            <SectionContentDiv>
              <Typography variant="h6">Trending info goes here</Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeRoute;
