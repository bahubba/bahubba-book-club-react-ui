import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import SectionHeader from '../../components/layout/section-header.component';
import BookClubAdminButton from '../../components/buttons/book-club-admin.button';

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
  // Book club name from the route params
  const { bookClubName } = useParams();

  return (
    <>
      <SectionHeader
        title={bookClubName || 'Book Club'}
        typographyVariant="h4"
        justifyChildren="flex-start"
      >
        <BookClubAdminButton bookClubName={bookClubName || 'Book Club'} />
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
              <Typography variant="h6">
                Books the club readers go here
              </Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
        <Grid
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
