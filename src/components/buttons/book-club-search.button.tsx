import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';

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

const BookClubSearchButton = () => {
  return (
    <Link to="/book-club/search">
      <Tooltip
        title="Find book clubs"
        placement="top"
      >
        <IconButton
          sx={styles.button}
          size="small"
        >
          <Search />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default BookClubSearchButton;
