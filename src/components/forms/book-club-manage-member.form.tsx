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
import {
  AdminPanelSettings,
  ManageAccounts,
  PersonOff,
  Star
} from '@mui/icons-material';
import { grey, red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { selectCurrentUsername } from '../../redux/slices/auth/auth.slice';
import {
  useChangeOwnerMutation,
  useUpdateMemberRoleMutation
} from '../../redux/api/book-club/book-club-membership.api.slice';
import { useRemoveMemberMutation } from '../../redux/api/book-club/book-club-membership.api.slice';
import { BookClubMembership, BookClubRole } from '../../interfaces';
import ConfirmRemoveMemberDialog from '../dialogs/confirm-remove-member.dialog';
import ConfirmMakeOwnerDialog from '../dialogs/confirm-make-owner.dialog';

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

  // Redux API mutation for changing the owner of a book club
  const [makeOwner, { data: newOwner, isLoading: makeOwnerLoading }] =
    useChangeOwnerMutation();

  // Component state
  const [role, setRole] = useState(membership.clubRole);
  const [coalescedMembership, setCoalescedMembership] = useState(membership);
  const [confirmRemoveDialogOpen, setConfirmRemoveDialogOpen] = useState(false);
  const [confirmMakeOwnerDialogOpen, setConfirmMakeOwnerDialogOpen] =
    useState(false);

  // Handle role input change
  const handleRoleChange = (event: SelectChangeEvent<BookClubRole>) =>
    setRole(event.target.value as BookClubRole);

  // Handle clicking on the remove reader button
  const handleRemoveReaderClick = () => setConfirmRemoveDialogOpen(true);

  // Handle clicking on the make owner button
  const handleMakeOwnerClick = () => setConfirmMakeOwnerDialogOpen(true);

  // Handle canceling removing the reader
  const handleCancelRemoveReader = () => setConfirmRemoveDialogOpen(false);

  // Handle canceling making the reader the owner
  const handleCancelMakeOwner = () => setConfirmMakeOwnerDialogOpen(false);

  // Handle submitting the role change
  const handleSubmitRoleChange = async () => {
    if (!!coalescedMembership.reader.id) {
      await updateMemberRole({
        bookClubName: coalescedMembership.bookClub.name,
        readerID: coalescedMembership.reader.id,
        role
      });

      toast.success(
        `Successfully updated ${membership.reader.username}'s role to ${role}`,
        { position: 'bottom-right' }
      );
    }
  };

  // Handle submitting the ownership change
  const handleSubmitMakeOwner = async () => {
    if (!!coalescedMembership.reader.id) {
      await makeOwner({
        bookClubName: membership.bookClub.name,
        newOwnerID: coalescedMembership.reader.id
      });

      toast.success(
        `Successfully changed the owner of ${membership.bookClub.name} to ${membership.reader.username}`,
        { position: 'bottom-right' }
      );
    }
  };

  // Handle clicking on the remove reader button
  const handleRemoveReader = async () => {
    setConfirmRemoveDialogOpen(false);
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

  // When the new owner is set, update the membership displayed
  useEffect(() => {
    if (!!newOwner)
      setCoalescedMembership(oldMembership => ({
        ...oldMembership,
        isOwner: true
      }));
  }, [newOwner]);

  return updateMemberRoleLoading || removeMemberLoading || makeOwnerLoading ? (
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
        {coalescedMembership.isOwner ? (
          <Star color="secondary" />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleMakeOwnerClick}
          >
            <AdminPanelSettings color="primary" />
          </Button>
        )}
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
      <ConfirmMakeOwnerDialog
        open={confirmMakeOwnerDialogOpen}
        bookClubName={coalescedMembership.bookClub.name}
        username={coalescedMembership.reader.username}
        onCancel={handleCancelMakeOwner}
        onConfirm={handleSubmitMakeOwner}
      />
    </>
  );
};

export default BookClubManageMemberForm;
