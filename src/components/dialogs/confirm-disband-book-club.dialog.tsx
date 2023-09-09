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

// Component props
interface ConfirmDisbandBookClubDialogProps extends DialogProps {
  bookClubName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * MUI Dialog for confirming a book club disbandment
 * @prop {string} bookClubName - The name of the book club to disband
 * @prop {() => void} onCancel - Callback for when the cancel button is clicked
 * @prop {() => void} onConfirm - Callback for when the confirm button is clicked
 * @prop {...DialogProps} dialogProps - Passthrough props for the MUI Dialog
 */
const ConfirmDisbandBookClubDialog = ({
  bookClubName,
  onCancel,
  onConfirm,
  ...dialogProps
}: ConfirmDisbandBookClubDialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <span>Confirm Disband </span>
        <HighlightedSpan>{bookClubName}</HighlightedSpan>
      </DialogTitle>
      <DialogContent>
        <span>Confirm that you want to disband </span>
        <HighlightedSpan>{bookClubName}</HighlightedSpan>
        <span>... This action is permanent; it cannot be reversed.</span>
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
          Disband
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDisbandBookClubDialog;
