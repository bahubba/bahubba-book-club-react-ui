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
import { ManageAccounts, PersonOff } from '@mui/icons-material';
import { grey, red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { selectCurrentUsername } from '../../redux/slices/auth/auth.slice';
import { useUpdateMemberRoleMutation } from '../../redux/api/book-club/book-club-membership.api.slice';
import { useRemoveMemberMutation } from '../../redux/api/book-club/book-club-membership.api.slice';
import { BookClubMembership, BookClubRole } from '../../interfaces';
import ConfirmRemoveMemberDialog from '../dialogs/confirm-remove-member.dialog';

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
  },
  removedMemberCell: {
    backgroundColor: red[200]
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

  // Redux API mutation for removing a member
  const [
    removeMember,
    { data: removedMember, isLoading: removeMemberLoading }
  ] = useRemoveMemberMutation();

  // Component state
  const [role, setRole] = useState(membership.clubRole);
  const [coalescedMembership, setCoalescedMembership] = useState(membership);
  const [confirmRemoveDialogOpen, setConfirmRemoveDialogOpen] = useState(false);

  // Handle role input change
  const handleRoleChange = (event: SelectChangeEvent<BookClubRole>) =>
    setRole(event.target.value as BookClubRole);

  // Handle clicking on the remove reader button
  const handleRemoveReaderClick = () => {
    setConfirmRemoveDialogOpen(true);
  };

  // Handle canceling removing the reader
  const handleCancelRemoveReader = () => setConfirmRemoveDialogOpen(false);

  // Handle submitting the role change
  const handleSubmitRoleChange = async () => {
    setConfirmRemoveDialogOpen(false);

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

  // Handle clicking on the remove reader button
  const handleRemoveReader = async () => {
    if (!!membership.reader.id) {
      await removeMember(coalescedMembership);

      toast.success(
        `Successfully removed ${membership.reader.username} from ${membership.bookClub.name}`,
        { position: 'bottom-right' }
      );
    }
  };

  // When the membership changes, update the membership displayed
  useEffect(() => {
    if (!!updatedMembership) setCoalescedMembership(updatedMembership);
  }, [updatedMembership]);

  // When the membership is removed, updated the membership displayed
  useEffect(() => {
    if (!!removedMember) setCoalescedMembership(removedMember);
  }, [removedMember]);

  return updateMemberRoleLoading || removeMemberLoading ? (
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
        sx={{
          ...styleClasses,
          ...(!!coalescedMembership.departed && styles.removedMemberCell)
        }}
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
        sx={{
          ...styleClasses,
          ...(!!coalescedMembership.departed && styles.removedMemberCell)
        }}
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
              disabled={
                !!coalescedMembership.departed ||
                _.isEqual(currentUsername, coalescedMembership.reader.username)
              }
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
            color="success"
            onClick={handleSubmitRoleChange}
            disabled={
              !!coalescedMembership.departed ||
              _.isEqual(currentUsername, coalescedMembership.reader.username) ||
              _.isEqual(role, coalescedMembership.clubRole)
            }
          >
            <ManageAccounts
              color={
                !!coalescedMembership.departed ||
                _.isEqual(
                  currentUsername,
                  coalescedMembership.reader.username
                ) ||
                _.isEqual(role, coalescedMembership.clubRole)
                  ? 'disabled'
                  : 'secondary'
              }
            />
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        justifyContent="center"
        xs={1}
        sx={{
          ...styleClasses,
          ...(!!coalescedMembership.departed && styles.removedMemberCell)
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleRemoveReaderClick}
          disabled={
            !!coalescedMembership.departed ||
            _.isEqual(currentUsername, coalescedMembership.reader.username)
          }
        >
          <PersonOff
            color={
              !!coalescedMembership.departed ||
              _.isEqual(currentUsername, coalescedMembership.reader.username)
                ? 'disabled'
                : 'secondary'
            }
          />
        </Button>
      </Grid>
      <Grid
        item
        justifyContent="center"
        xs={1}
        sx={{
          ...styleClasses,
          ...(!!coalescedMembership.departed && styles.removedMemberCell)
        }}
      >
        DOIT
      </Grid>
      <Grid
        item
        alignItems="center"
        xs={2}
        sx={{
          ...styleClasses,
          ...(!!coalescedMembership.departed && styles.removedMemberCell)
        }}
      >
        {coalescedMembership.joined}
      </Grid>
      <ConfirmRemoveMemberDialog
        open={confirmRemoveDialogOpen}
        readerName={coalescedMembership.reader.username}
        role={coalescedMembership.clubRole}
        bookClubName={coalescedMembership.bookClub.name}
        onCancel={handleCancelRemoveReader}
        onConfirm={handleRemoveReader}
      />
    </>
  );
};

export default BookClubManageMemberForm;
