import { useState } from 'react';
import { Avatar, Badge, Theme } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// MUI emotion styles
const styles = {
  avatar: {
    height: (theme: Theme) => theme.spacing(4),
    width: (theme: Theme) => theme.spacing(4),
    bgcolor: 'secondary.light',
    color: 'primary.main'
  }
};

const NotificationsButton = () => {
  const [numNotifications, setNumNotifications] = useState(0);

  return (
    <Link to="/notifications">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        color="error"
        badgeContent={numNotifications}
      >
        <Avatar sx={styles.avatar}>
          <NotificationsNone />
        </Avatar>
      </Badge>
    </Link>
  );
};

export default NotificationsButton;
