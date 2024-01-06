import { useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { PersonOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

import ConfirmActionDialog from '../dialogs/confirm-action.dialog';
import { useRemoveMemberMutation } from '../../redux/api/book-club/book-club-membership.api.slice';
import { BookClubMembership } from '../../interfaces';

// Component props
interface RemoveMemberButtonProps {
  membership: BookClubMembership;
  setMembership: React.Dispatch<React.SetStateAction<BookClubMembership>>;
}

/**
 * Button for removing a user from a book club
 * @prop {BookClubMembership} membership - The member to remove
 * @prop {React.Dispatch<React.SetStateAction<BookClubMembership>>} setMembership - Callback for when the membership is updated
 */
const RemoveMemberButton = ({
  membership,
  setMembership
}: RemoveMemberButtonProps) => {
  // Component state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Redux API mutation for removing a member from a book club
  const [removeMember, { data: removedMember }] = useRemoveMemberMutation();

  // Handle clicking on the button
  const handleClick = () => setConfirmDialogOpen(true);

  // Handle canceling in the dialog
  const handleCancel = () => setConfirmDialogOpen(false);

  // Handle confirming in the dialog
  const handleConfirm = async () => {
    setConfirmDialogOpen(false);
    if (!!membership.reader.id) {
      await removeMember(membership);

      toast.success(
        `Successfully removed ${membership.reader.username} from ${membership.bookClub.name}`,
        { position: 'bottom-right' }
      );
    } else {
      toast.error(
        `Something went wrong trying to remove ${membership.reader.username} from ${membership.bookClub.name}`,
        { position: 'bottom-right' }
      );
    }
  };

  // Update the membership when the member is removed
  useEffect(() => {
    if (!!removedMember) {
      setMembership(removedMember);
    }
  }, [removedMember, setMembership]);

  return (
    <>
      <Tooltip
        title={
          !!membership.departed
            ? 'Already departed'
            : membership.isOwner
            ? 'Remove ownership first'
            : 'Remove member'
        }
        placement="top"
        arrow
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleClick}
          disabled={!!membership.departed || membership.isOwner}
        >
          <PersonOff
            color={
              !!membership.departed || membership.isOwner
                ? 'disabled'
                : 'secondary'
            }
          />
        </Button>
      </Tooltip>
      <ConfirmActionDialog
        titleIcon={<PersonOff color="error" />}
        action={`Remove ${membership.reader.username} from ${membership.bookClub.name}`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        open={confirmDialogOpen}
      >
        Confirm that you want to remove <b>{membership.reader.username}</b> from{' '}
        <b>{membership.bookClub.name}</b>
      </ConfirmActionDialog>
    </>
  );
};

export default RemoveMemberButton;
