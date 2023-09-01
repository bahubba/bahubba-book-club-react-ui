import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

// MUI emotion styles
const styles = {
  button: {
    mx: 1,
    color: 'primary.dark',
    backgroundColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'secondary.dark'
    }
  }
};

// Component props
interface MembershipRequestButtonProps {
  bookClubName: string;
}

/**
 * Button for navigation to the request membership page for a book club
 * @prop {string} bookClubName - The name of the book club
 */
const RequestMembershipButton = ({
  bookClubName
}: MembershipRequestButtonProps) => {
  return (
    <Link to={`/book-club/${bookClubName}/request-membership`}>
      <Tooltip
        title="Request membership"
        placement="top"
      >
        <IconButton
          sx={styles.button}
          size="small"
        >
          <PersonAdd />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default RequestMembershipButton;
