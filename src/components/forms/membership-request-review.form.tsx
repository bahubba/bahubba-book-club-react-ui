import { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { useReviewMembershipRequestMutation } from '../../redux/slices/book-club/membership-request.api.slice';
import { BookClubRole, MembershipRequest } from '../../interfaces';
import { PersonAdd, PersonOff } from '@mui/icons-material';
import BookClubCard from '../cards/book-club.card';

// MUI emotion styles
const styles = {
  centeredCell: {
    p: 1,
    display: 'flex',
    alignItems: 'center'
  },
  oddRowCell: {
    backgroundColor: grey[200]
  }
};

// Component props
interface MembershipRequestReviewFormProps {
  membershipRequest: MembershipRequest;
  oddCell?: boolean;
}

/**
 * Form for reviewing a membership request, as a row in a table (MUI Grid)
 * @prop {MembershipRequest} membershipRequest - The membership request to review
 * @prop {boolean} oddCell - Whether or not this row is an odd row in the table; used for styling
 * TODO - Conditionally render role options based on book club publicity
 * TODO - Date formatting
 * TODO - Popover for deny reason
 */
const MembershipRequestReviewForm = ({
  membershipRequest,
  oddCell = false
}: MembershipRequestReviewFormProps) => {
  // Static set of styles for each cell
  const styleClasses = {
    ...styles.centeredCell,
    ...(oddCell && styles.oddRowCell)
  };

  // Redux API mutation for reviewing a membership request
  const [
    reviewMembershipRequest,
    {
      data: reviewedMembershipRequest,
      isLoading: reviewMembershipRequestLoading
    }
  ] = useReviewMembershipRequestMutation();

  // Component state
  const [role, setRole] = useState<BookClubRole>('READER');
  const [coalescedRequest, setCoalescedRequest] =
    useState<MembershipRequest>(membershipRequest);

  // Handle role input change
  const handleRoleChange = (event: SelectChangeEvent<BookClubRole>) => {
    setRole(event.target.value as BookClubRole);
  };

  // Handle approving the membership request
  const handleApprove = () =>
    reviewMembershipRequest({
      membershipRequest,
      action: 'APPROVE',
      role
    });

  // Handle rejecting the membership request
  const handleReject = () =>
    reviewMembershipRequest({
      membershipRequest,
      action: 'REJECT'
    });

  // Coalesce the passed in membership request with the reviewed membership request
  useEffect(() => {
    if (reviewedMembershipRequest) {
      setCoalescedRequest(reviewedMembershipRequest);
    }
  }, [reviewedMembershipRequest]);

  return (
    <>
      <Grid
        item
        xs={3}
        sx={styleClasses}
      >
        <Typography variant="body1">
          {coalescedRequest.reader.username}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sx={styleClasses}
      >
        <Typography variant="body1">{coalescedRequest.message}</Typography>
      </Grid>
      <Grid
        item
        container
        xs={3}
        sx={styleClasses}
      >
        <Grid
          item
          xs={8}
        >
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={coalescedRequest.role || role}
              label="Role"
              onChange={handleRoleChange}
              disabled={!!coalescedRequest.reviewed}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="READER">Reader</MenuItem>
              <MenuItem value="PARTICIPANT">Participant</MenuItem>
              <MenuItem value="OBSERVER">Observer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={4}
          justifyContent="center"
          sx={styleClasses}
        >
          <Button
            variant="contained"
            onClick={handleApprove}
            disabled={!!coalescedRequest.reviewed}
          >
            <PersonAdd />
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1}
        justifyContent="center"
        sx={styleClasses}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleReject}
          disabled={!!coalescedRequest.reviewed}
        >
          <PersonOff color="secondary" />
        </Button>
      </Grid>
      <Grid
        item
        xs={2}
        sx={styleClasses}
      >
        <Typography variant="body1">{coalescedRequest.requested}</Typography>
      </Grid>
    </>
  );
};

export default MembershipRequestReviewForm;
