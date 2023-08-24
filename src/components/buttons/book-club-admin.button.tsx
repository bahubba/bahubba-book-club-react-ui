import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

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
interface BookClubAdminButtonProps {
  bookClubName: string;
}

const BookClubAdminButton = ({ bookClubName }: BookClubAdminButtonProps) => {
  return (
    <Link to={`/book-club/${bookClubName}/admin`}>
      <Tooltip
        title="Manage book club"
        placement="top"
      >
        <IconButton
          sx={styles.button}
          size="small"
        >
          <Edit />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default BookClubAdminButton;
