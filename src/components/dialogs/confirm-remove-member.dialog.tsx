import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { BookClubRole } from '../../interfaces';

// MUI styled components
const HighlightedSpan = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold'
}));

// Component props
interface ConfirmRemoveMemberDialogProps extends DialogProps {
  readerName: string;
  role: BookClubRole;
  bookClubName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * MUI Dialog for confirming a book club member removal
 * @prop {string} readerName - The name of the reader to remove
 * @prop {BookClubRole} role - The role of the reader to remove
 * @prop {string} bookClubName - The name of the book club to remove the reader from
 * @prop {() => void} onCancel - Callback for when the cancel button is clicked
 * @prop {() => void} onConfirm - Callback for when the confirm button is clicked
 * @prop {...DialogProps} dialogProps - Passthrough props for the MUI Dialog
 */
const ConfirmRemoveMemberDialog = ({
  readerName,
  bookClubName,
  role,
  onCancel,
  onConfirm,
  ...dialogProps
}: ConfirmRemoveMemberDialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <span>Confirm Remove </span>
        <HighlightedSpan>{readerName}</HighlightedSpan>
      </DialogTitle>
      <DialogContent>
        <span>Confirm that you want to remove </span>
        <HighlightedSpan>{readerName}</HighlightedSpan>
        <span>, with the role </span>
        <HighlightedSpan>{role}</HighlightedSpan>
        <span> from </span>
        <HighlightedSpan>{bookClubName}</HighlightedSpan>
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

export default ConfirmRemoveMemberDialog;
