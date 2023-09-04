import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import _ from 'lodash';

// MUI styled components
const BookClubNameSpan = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold'
}));

// MUI emotion styles
const styles = {
  contentGrid: {
    mt: 1
  },
  optionsList: {
    borderRight: '1px solid lightgray'
  },
  selectableListItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'lightgray'
    }
  },
  selectedListItem: {
    backgroundColor: 'secondary.main',
    '&:hover': {
      cursor: 'auto',
      backgroundColor: 'secondary.main'
    }
  }
};

// Admin options
type AdminOption =
  | 'details'
  | 'members'
  | 'membership-requests'
  | 'preferences';

/**
 * Admin route/page for a given book club, allowing admins to manage details and members
 * TODO - Redirect back to the book club home page if the user is not an admin
 */
const BookClubAdminRoute = () => {
  // Book club name from the route params
  const { bookClubName } = useParams();

  // Navigation from react-router-dom
  const navigate = useNavigate();

  // State vars
  const [selectedAdminOption, setSelectedAdminOption] =
    useState<AdminOption>('details');

  // Handle admin option selection
  const handleAdminOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectedAdminOption(event.currentTarget.id as AdminOption);
  };

  // Navigate the sub-route to the selected admin option
  useEffect(() => {
    navigate(`/book-club/${bookClubName}/admin/${selectedAdminOption}`);
  }, [navigate, bookClubName, selectedAdminOption]);

  return (
    <>
      <Typography
        component="div"
        variant="h4"
      >
        <>
          Manage <BookClubNameSpan>{bookClubName}</BookClubNameSpan>{' '}
          {_.startCase(selectedAdminOption)}
        </>
      </Typography>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={styles.contentGrid}
      >
        <Grid
          item
          xs={2}
        >
          <List
            sx={styles.optionsList}
            disablePadding
          >
            <ListItem
              id="details"
              divider
              sx={{
                ...styles.selectableListItem,
                ...(selectedAdminOption === 'details' &&
                  styles.selectedListItem)
              }}
              onClick={handleAdminOptionClick}
            >
              <ListItemText
                primary={<Typography variant="h6">Details</Typography>}
              />
            </ListItem>
            <ListItem
              id="members"
              divider
              sx={{
                ...styles.selectableListItem,
                ...(selectedAdminOption === 'members' &&
                  styles.selectedListItem)
              }}
              onClick={handleAdminOptionClick}
            >
              <ListItemText
                primary={<Typography variant="h6">Members</Typography>}
              />
            </ListItem>
            <ListItem
              id="membership-requests"
              divider
              sx={{
                ...styles.selectableListItem,
                ...(selectedAdminOption === 'membership-requests' &&
                  styles.selectedListItem)
              }}
              onClick={handleAdminOptionClick}
            >
              <ListItemText
                primary={
                  <Typography variant="h6">Membership Requests</Typography>
                }
              />
            </ListItem>
            <ListItem
              id="preferences"
              sx={{
                ...styles.selectableListItem,
                ...(selectedAdminOption === 'preferences' &&
                  styles.selectedListItem)
              }}
              onClick={handleAdminOptionClick}
            >
              <ListItemText
                primary={<Typography variant="h6">Preferences</Typography>}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          xs={8}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default BookClubAdminRoute;
