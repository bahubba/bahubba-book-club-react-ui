import { useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { RemoveModerator } from '@mui/icons-material';
import { toast } from 'react-toastify';

import ConfirmActionDialog from '../dialogs/confirm-action.dialog';
import { useRevokeOwnershipMutation } from '../../redux/api/book-club/book-club-membership.api.slice';
import { BookClubMembership } from '../../interfaces';

// Component props
interface RevokeOwnershipButtonProps {
  membership: BookClubMembership;
  setMembership: React.Dispatch<React.SetStateAction<BookClubMembership>>;
}

/**
 * Button for revoking a user's ownership of a book club
 * @prop {BookClubMembership} membership - The member to revoke ownership from
 * @prop {React.Dispatch<React.SetStateAction<BookClubMembership>>} setMembership - Callback for when the membership is updated
 */
const RevokeOwnershipButton = ({
  membership,
  setMembership
}: RevokeOwnershipButtonProps) => {
  // Component state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Redux API mutation for revoking a user's ownership of a book club
  const [revokeOwnership, { data: oldOwner }] = useRevokeOwnershipMutation();

  // Handle clicking on the button
  const handleClick = () => setConfirmDialogOpen(true);

  // Handle canceling in the dialog
  const handleCancel = () => setConfirmDialogOpen(false);

  // Handle confirming in the dialog
  const handleConfirm = async () => {
    setConfirmDialogOpen(false);
    if (!!membership.reader.id) {
      await revokeOwnership({
        bookClubID: membership.bookClub.id ?? '',
        userID: membership.reader.id
      });

      toast.success(
        `Successfully revoked ${membership.reader.username}'s ownership of ${membership.bookClub.name}`,
        { position: 'bottom-right' }
      );
    } else {
      toast.error(
        `Something went wrong trying to revoke ${membership.reader.username}'s ownership of ${membership.bookClub.name}`,
        { position: 'bottom-right' }
      );
    }
  };

  // Update the membership when the old owner is set
  useEffect(() => {
    if (!!oldOwner)
      setMembership(oldMembership => ({
        ...oldMembership,
        isOwner: false
      }));
  }, [oldOwner, setMembership]);

  return (
    <>
      <Tooltip
        title="Revoke Ownership"
        placement="top"
        arrow
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleClick}
          disabled={!!membership.departed}
        >
          <RemoveModerator
            color={!!membership.departed ? 'disabled' : 'secondary'}
          />
        </Button>
      </Tooltip>
      <ConfirmActionDialog
        titleIcon={<RemoveModerator color="error" />}
        action="Revoke Ownership"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        open={confirmDialogOpen}
      >
        Confirm revoking ownership of <b>{membership.reader.username}</b> from{' '}
        <b>{membership.bookClub.name}</b>
      </ConfirmActionDialog>
    </>
  );
};

export default RevokeOwnershipButton;
