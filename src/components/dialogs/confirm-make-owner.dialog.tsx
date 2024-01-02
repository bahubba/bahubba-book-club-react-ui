import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';

// MUI styled components
const HighlightedSpan = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold'
}));

const RedSpan = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 'bold'
}));

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
const ConfirmMakeOwnerDialog = ({
  bookClubName,
  username,
  onCancel,
  onConfirm,
  ...dialogProps
}: ConfirmDisbandBookClubDialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <span>Confirm Change </span>
        <HighlightedSpan>{bookClubName}</HighlightedSpan>
        <span> Owner</span>
      </DialogTitle>
      <DialogContent>
        <span>Confirm that you want to change the owner of </span>
        <HighlightedSpan>{bookClubName}</HighlightedSpan>
        <span> to </span>
        <HighlightedSpan>{username}</HighlightedSpan>
        <span>... You will no longer be the owner, and </span>
        <RedSpan>this action is permanent; it cannot be reversed.</RedSpan>
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

export default ConfirmMakeOwnerDialog;
