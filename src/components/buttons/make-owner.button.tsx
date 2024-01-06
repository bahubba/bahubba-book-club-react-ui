import { useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { AddModerator } from '@mui/icons-material';
import { toast } from 'react-toastify';

import ConfirmActionDialog from '../dialogs/confirm-action.dialog';
import { useAddOwnerMutation } from '../../redux/api/book-club/book-club-membership.api.slice';
import { BookClubMembership } from '../../interfaces';

// Component props
interface MakeOwnerButtonProps {
  membership: BookClubMembership;
  setMembership: React.Dispatch<React.SetStateAction<BookClubMembership>>;
}

/**
 * Button for making a user an owner of a book club
 * @prop {BookClubMembership} membership - The member to make an owner
 * @prop {React.Dispatch<React.SetStateAction<BookClubMembership>>} setMembership - Callback for when the membership is updated
 */
const MakeOwnerButton = ({
  membership,
  setMembership
}: MakeOwnerButtonProps) => {
  // Component state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Redux API mutation for making a member an owner of a book club
  const [addOwner, { data: newOwner }] = useAddOwnerMutation();

  // Handle clicking on the button
  const handleClick = () => setConfirmDialogOpen(true);

  // Handle canceling in the dialog
  const handleCancel = () => setConfirmDialogOpen(false);

  // Handle confirming in the dialog
  const handleConfirm = async () => {
    setConfirmDialogOpen(false);
    if (!!membership.reader.id) {
      await addOwner({
        bookClubName: membership.bookClub.name,
        newOwnerID: membership.reader.id
      });

      toast.success(
        `Successfully changed the owner of ${membership.bookClub.name} to ${membership.reader.username}`,
        { position: 'bottom-right' }
      );
    } else {
      toast.error(
        `Something went wrong trying to make ${membership.reader.username} an owner of ${membership.bookClub.name}`,
        { position: 'bottom-right' }
      );
    }
  };

  // Update the membership when the new owner is set
  useEffect(() => {
    if (!!newOwner)
      setMembership(oldMembership => ({ ...oldMembership, isOwner: true }));
  }, [newOwner, setMembership]);

  return (
    <>
      <Tooltip
        title="Make Owner"
        placement="top"
        arrow
      >
        <Button
          variant="contained"
          color="success"
          onClick={handleClick}
          disabled={!!membership.departed}
        >
          <AddModerator
            color={!!membership.departed ? 'disabled' : 'secondary'}
          />
        </Button>
      </Tooltip>
      <ConfirmActionDialog
        titleIcon={<AddModerator color="primary" />}
        action="Add Owner"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        open={confirmDialogOpen}
      >
        Confirm that you want to add <b>{membership.reader.username}</b> as an
        owner of <b>{membership.bookClub.name}</b>
      </ConfirmActionDialog>
    </>
  );
};

export default MakeOwnerButton;
