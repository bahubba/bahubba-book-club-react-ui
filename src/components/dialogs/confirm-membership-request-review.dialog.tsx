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

// MUI styled components
const HighlightedSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold'
}));

const RedHighlightedSpan = styled(HighlightedSpan)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 'bold'
}));

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
        <span>Confirm </span>
        {_.isEqual('APPROVE', action) ? (
          <HighlightedSpan>APPROVE</HighlightedSpan>
        ) : (
          <RedHighlightedSpan>REJECT</RedHighlightedSpan>
        )}
        <span> Membership Request</span>
      </DialogTitle>
      <DialogContent>
        <span>Comfirm that you want to </span>
        {_.isEqual('APPROVE', action) ? (
          <HighlightedSpan>APPROVE</HighlightedSpan>
        ) : (
          <RedHighlightedSpan>REJECT</RedHighlightedSpan>
        )}
        <span> the request for </span>
        <HighlightedSpan>{username}</HighlightedSpan>
        <span> to join </span>
        <HighlightedSpan>{`${bookClubName} `}</HighlightedSpan>
        {_.isEqual('APPROVE', action) && (
          <span>
            with the role <HighlightedSpan>{role}</HighlightedSpan>
          </span>
        )}
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
