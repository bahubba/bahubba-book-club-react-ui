import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle
} from '@mui/material';

// Component props
interface ConfirmDisbandBookClubDialogProps extends DialogProps {
  bookClubName: string;
  username: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * MUI Dialog for confirming changing the owner of a book club
 * @prop {string} bookClubName - The name of the book club to disband
 * @prop {string} username - The username of the new owner
 * @prop {() => void} onCancel - Callback for when the cancel button is clicked
 * @prop {() => void} onConfirm - Callback for when the confirm button is clicked
 * @prop {...DialogProps} dialogProps - Passthrough props for the MUI Dialog
 */
const ConfirmAddOwnerDialog = ({
  bookClubName,
  username,
  onCancel,
  onConfirm,
  ...dialogProps
}: ConfirmDisbandBookClubDialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <span>
          Confirm Revoke <b>{bookClubName}</b> Ownership
        </span>
      </DialogTitle>
      <DialogContent>
        <span>
          Confirm that you want to revoke ownership of <b>{bookClubName}</b>{' '}
          from <b>{username}</b>.
        </span>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmAddOwnerDialog;
