import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { ManageAccounts } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { selectCurrentUsername } from '../../redux/slices/auth/auth.slice';
import { useUpdateMemberRoleMutation } from '../../redux/slices/book-club/book-club.api.slice';
import { BookClubMembership, BookClubRole } from '../../interfaces';

// MUI emotion styles
const styles = {
  centeredCell: {
    p: 1,
    display: 'flex',
    alignItems: 'center'
  },
  flexEndCell: {
    p: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  oddRowCell: {
    backgroundColor: grey[200]
  }
};

// Component props
interface BookClubManageMemberFormProps {
  membership: BookClubMembership;
  oddCell?: boolean;
}

/**
 * Form for managing a book club member, as a row in a table (MUI Grid)
 * @prop {BookClubMembership} membership - The membership to manage
 * @prop {boolean} oddCell - Whether or not this row is an odd row in the table; used for styling
 * TODO - Date formatting
 */
const BookClubManageMemberForm = ({
  membership,
  oddCell
}: BookClubManageMemberFormProps) => {
  // Static set of styles for each cell
  const styleClasses = {
    ...styles.centeredCell,
    ...(oddCell && styles.oddRowCell)
  };

  // Currnet reader's username
  const currentUsername = useSelector(selectCurrentUsername);

  // Redux API mutation for updating a member's role
  const [
    updateMemberRole,
    { data: updatedMembership, isLoading: updateMemberRoleLoading }
  ] = useUpdateMemberRoleMutation();
  const [coalescedMembership, setCoalescedMembership] = useState(membership);

  // Component state
  const [role, setRole] = useState(membership.clubRole);

  // Handle role input change
  const handleRoleChange = (event: SelectChangeEvent<BookClubRole>) =>
    setRole(event.target.value as BookClubRole);

  // Handle submitting the role change
  const handleSubmitRoleChange = async () => {
    if (!!membership.reader.id) {
      await updateMemberRole({
        bookClubName: membership.bookClub.name,
        readerID: membership.reader.id,
        role
      });

      toast.success(
        `Successfully updated ${membership.reader.username}'s role to ${role}`,
        { position: 'bottom-right' }
      );
    }
  };

  // When the membership changes, update the membership displayed
  useEffect(() => {
    if (!!updatedMembership) setCoalescedMembership(updatedMembership);
  }, [updatedMembership]);

  return updateMemberRoleLoading ? (
    <Grid
      item
      xs={12}
      sx={styleClasses}
    >
      <CircularProgress />
    </Grid>
  ) : (
    <>
      <Grid
        item
        alignContent="center"
        xs={4}
        sx={styleClasses}
      >
        <span>{coalescedMembership.reader.username}</span>
        {((!!coalescedMembership.reader.givenName &&
          !_.isEmpty(coalescedMembership.reader.givenName)) ||
          (!!coalescedMembership.reader.surname &&
            !_.isEmpty(coalescedMembership.reader.surname))) && (
          <span>
            &nbsp;
            {_.trim(
              `(${coalescedMembership.reader.givenName} ${coalescedMembership.reader.surname})`
            )}
          </span>
        )}
      </Grid>
      <Grid
        item
        container
        xs={4}
        sx={styleClasses}
      >
        <Grid
          item
          xs={8}
          lg={9}
          xl={10}
        >
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              label="Role"
              value={role}
              onChange={handleRoleChange}
              disabled={_.isEqual(
                currentUsername,
                coalescedMembership.reader.username
              )}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="READER">Reader</MenuItem>
              <MenuItem value="PARTICIPANT">Participant</MenuItem>
              <MenuItem value="OBSERVER">Observer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={4}
          lg={3}
          xl={2}
          sx={styles.flexEndCell}
        >
          <Button
            variant="contained"
            onClick={handleSubmitRoleChange}
            disabled={
              _.isEqual(currentUsername, coalescedMembership.reader.username) ||
              _.isEqual(role, coalescedMembership.clubRole)
            }
          >
            <ManageAccounts />
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        justifyContent="center"
        xs={1}
        sx={styleClasses}
      >
        X
      </Grid>
      <Grid
        item
        justifyContent="center"
        xs={1}
        sx={styleClasses}
      >
        DOIT
      </Grid>
      <Grid
        item
        alignItems="center"
        xs={2}
        sx={styleClasses}
      >
        {coalescedMembership.joined}
      </Grid>
    </>
  );
};

export default BookClubManageMemberForm;
