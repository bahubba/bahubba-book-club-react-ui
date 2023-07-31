import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';

// MUI emotion styles
const styles = {
  button: {
    mx: 1,
    color: 'primary.dark',
    backgroundColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'secondary.main'
    }
  }
};

const CreateBookClubButton = () => {
  return (
    <Link to="/book-club/create">
      <Tooltip title="Create book club">
        <IconButton
          sx={styles.button}
          size="small"
        >
          <Add />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default CreateBookClubButton;
