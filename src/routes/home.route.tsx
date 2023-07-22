import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// MUI styled components
const SectionContainerDiv = styled('div')(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
}));

const SectionContentDiv = styled('div')({
  flexGrow: 1,
  overflowY: 'auto'
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
    display: 'flex',
    flexDirection: 'column'
  }
};

const HomeRoute = () => {
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
            <Typography
              component="div"
              variant="h5"
            >
              My Clubs
            </Typography>
            <SectionContentDiv>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
        <Grid
          item
          xs={4}
          sx={styles.sectionGrid}
        >
          <SectionContainerDiv>
            <Typography
              component="div"
              variant="h5"
            >
              My Books
            </Typography>
            <SectionContentDiv>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
        <Grid
          item
          xs={4}
          sx={styles.sectionGrid}
        >
          <SectionContainerDiv>
            <Typography
              component="div"
              variant="h5"
            >
              Trending
            </Typography>
            <SectionContentDiv>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
              <Typography variant="h6">Dummy Spacer Text</Typography>
            </SectionContentDiv>
          </SectionContainerDiv>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeRoute;
