import { useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import _ from 'lodash';

import { BookClubMembership, BookClubRole } from '../../interfaces';

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
interface BookClubManageMemberFormProps {
  membership: BookClubMembership;
  oddCell?: boolean;
}

/**
 * Form for managing a book club member, as a row in a table (MUI Grid)
 * @prop {BookClubMembership} membership - The membership to manage
 * @prop {boolean} oddCell - Whether or not this row is an odd row in the table; used for styling
 * TODO - Date formatting
 */
const BookClubManageMemberForm = ({
  membership,
  oddCell
}: BookClubManageMemberFormProps) => {
  // Component state
  const [role, setRole] = useState(membership.clubRole);
  console.log('membership:::', membership); // DELETEME

  // Handle role input change
  const handleRoleChange = (event: SelectChangeEvent<BookClubRole>) =>
    setRole(event.target.value as BookClubRole);

  return (
    <>
      <Grid
        item
        alignContent="center"
        xs={4}
        sx={styles.centeredCell}
      >
        <span>{membership.reader.username}</span>
        {((!!membership.reader.givenName &&
          !_.isEmpty(membership.reader.givenName)) ||
          (!!membership.reader.surname &&
            !_.isEmpty(membership.reader.surname))) && (
          <span>
            &nbsp;
            {_.trim(
              `(${membership.reader.givenName} ${membership.reader.surname})`
            )}
          </span>
        )}
      </Grid>
      <Grid
        item
        container
        xs={4}
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
              label="Role"
              value={role}
              onChange={handleRoleChange}
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
        ></Grid>
      </Grid>
      <Grid
        item
        justifyContent="center"
        xs={1}
        sx={styles.centeredCell}
      >
        X
      </Grid>
      <Grid
        item
        justifyContent="center"
        xs={1}
        sx={styles.centeredCell}
      >
        DOIT
      </Grid>
      <Grid
        item
        alignItems="center"
        xs={2}
        sx={styles.centeredCell}
      >
        {membership.joined}
      </Grid>
    </>
  );
};

export default BookClubManageMemberForm;
