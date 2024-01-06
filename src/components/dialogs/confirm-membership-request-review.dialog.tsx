import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

import { BookClubRole } from '../../interfaces';

const MessageDiv = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
  width: '100%'
}));

// Component props
interface ConfirmMembershipRequestReviewDialogProps extends DialogProps {
  action: 'APPROVE' | 'REJECT';
  username: string;
  role: BookClubRole;
  bookClubName: string;
  onCancel: () => void;
  onConfirm: (message: string) => void;
}

/**
 * MUI Dialog for confirming a membership request review
 * @prop {'APPROVE' | 'REJECT'} action - The action to take on the membership request
 * @prop {string} username - The username of the user whose membership request is being reviewed
 * @prop {BookClubRole} role - The role the user will get if the request is approved
 * @prop {string} bookClubName - The name of the book club
 * @prop {() => void} onCancel - Callback for when the cancel button is clicked
 * @prop {(string) => void} onConfirm - Callback for when the confirm button is clicked
 * @prop {...DialogProps} dialogProps - Passthrough props for the MUI Dialog
 */
const ConfirmMembershipRequestReviewDialog = ({
  action,
  username,
  role,
  bookClubName,
  onCancel,
  onConfirm,
  ...dialogProps
}: ConfirmMembershipRequestReviewDialogProps) => {
  // Component state
  const [reviewMessage, setReviewMessage] = useState('');

  // Handle message change
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setReviewMessage(event.target.value);

  // Handle confirm button click
  const handleConfirm = () => {
    onConfirm(reviewMessage);
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <span>
          Confirm{' '}
          {_.isEqual('APPROVE', action) ? <b>APPROVE</b> : <b>REJECT</b>}{' '}
          Membership Request
        </span>
      </DialogTitle>
      <DialogContent>
        <span>
          Comfirm that you want to{' '}
          {_.isEqual('APPROVE', action) ? <b>APPROVE</b> : <b>REJECT</b>} the
          request for <b>{username}</b> to join <b>{`${bookClubName} `}</b>
          {_.isEqual('APPROVE', action) && (
            <span>
              with the role <b>{role}</b>
            </span>
          )}
        </span>
        <Divider />
        <MessageDiv>
          <TextField
            id="review-message"
            fullWidth
            variant="outlined"
            multiline
            label="Message"
            placeholder="Enter a message to the user (optional)"
            value={reviewMessage}
            onChange={handleMessageChange}
          />
        </MessageDiv>
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
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmMembershipRequestReviewDialog;
