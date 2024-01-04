import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import _ from 'lodash';

import ConfirmDisbandBookClubDialog from '../../../components/dialogs/confirm-disband-book-club.dialog';
import { useLazyGetMembershipQuery } from '../../../redux/api/book-club/book-club-membership.api.slice';
import { useDisbandBookClubByNameMutation } from '../../../redux/api/book-club/book-club.api.slice';

// MUI styled components
const BookClubNameSpan = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold'
}));

const CenteredLoadingDiv = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

// MUI emotion styles
const styles = {
  loadingSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  contentGrid: {
    flexGrow: 1,
    pt: 1,
    overflow: 'hidden'
  },
  outletGrid: {
    height: '100%',
    px: 0.5,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
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
  },
  centeredListItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disbandButton: {
    mt: 0.5,
    mx: 2,
    width: '100%'
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

  // Redux API query for getting the user's membership in the book club
  const [getMembership, { data: admin }] = useLazyGetMembershipQuery();

  // Redux API query for disbanding a book club
  const [disbandBookClub, { isLoading: disbandBookClubLoading }] =
    useDisbandBookClubByNameMutation();

  // State vars
  const [selectedAdminOption, setSelectedAdminOption] =
    useState<AdminOption>('details');
  const [disbandDialogOpen, setDisbandDialogOpen] = useState(false);

  // Handle closing the disband dialog
  const handleCloseDisbandDialog = () => setDisbandDialogOpen(false);

  // Handle admin option selection
  const handleAdminOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectedAdminOption(event.currentTarget.id as AdminOption);
  };

  // Handle clicking the disband button
  const handleDisbandButtonClick = () => {
    setDisbandDialogOpen(true);
  };

  // Handle confirming the disbandment of the book club
  const handleConfirmDisbandBookClub = async () => {
    handleCloseDisbandDialog();
    if (!!bookClubName) {
      await disbandBookClub(bookClubName);
      toast.success(`Successfully disbanded ${bookClubName}`, {
        position: 'bottom-right'
      });
      navigate('/home');
    }
  };

  // Get the user's membership in the book club when the book club's name is loaded from the path params
  useEffect(() => {
    if (!!bookClubName) {
      getMembership(bookClubName);
    }
  }, [bookClubName, getMembership]);

  // Navigate the sub-route to the selected admin option
  useEffect(() => {
    if (!!bookClubName)
      navigate(`/book-club/${bookClubName}/admin/${selectedAdminOption}`);
  }, [navigate, bookClubName, selectedAdminOption]);

  return !bookClubName ? (
    <CircularProgress sx={styles.loadingSpinner} />
  ) : (
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
              divider
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
            <ListItem sx={styles.centeredListItem}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDisbandButtonClick}
                sx={styles.disbandButton}
              >
                Disband
              </Button>
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          xs={10}
          sx={styles.outletGrid}
        >
          {disbandBookClubLoading || !admin ? (
            <CenteredLoadingDiv>
              <CircularProgress />
            </CenteredLoadingDiv>
          ) : (
            <Outlet context={{ bookClubName, admin }} />
          )}
        </Grid>
      </Grid>
      {!!bookClubName && (
        <ConfirmDisbandBookClubDialog
          bookClubName={bookClubName}
          open={disbandDialogOpen}
          onCancel={handleCloseDisbandDialog}
          onConfirm={handleConfirmDisbandBookClub}
        />
      )}
    </>
  );
};

export default BookClubAdminRoute;
