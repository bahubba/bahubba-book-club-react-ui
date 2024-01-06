import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle
} from '@mui/material';

// MUI emotion styles
const styles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

// Component props
interface ConfirmDialogProps extends DialogProps {
  titleIcon?: React.ReactNode;
  action: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * MUI Dialog for confirming an action
 *
 * @prop {React.ReactNode} titleIcon - An optional icon to display in the title
 * @prop {string} action - The action to confirm
 * @prop {() => void} onCancel - Callback for when the cancel button is clicked
 * @prop {() => void} onConfirm - Callback for when the confirm button is clicked
 * @prop {React.ReactNode} children - The description of the action as HTML/React content
 * @prop {...DialogProps} dialogProps - Passthrough props for the MUI Dialog
 */
const ConfirmActionDialog = ({
  titleIcon,
  action,
  onCancel,
  onConfirm,
  children: description,
  ...dialogProps
}: ConfirmDialogProps) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTitle sx={styles.title}>
        <span>Confirm {action}</span>
        {!!titleIcon && titleIcon}
      </DialogTitle>
      <DialogContent>{description}</DialogContent>
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

export default ConfirmActionDialog;
