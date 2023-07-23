import { useEffect, useState } from 'react';
import { Avatar, Badge, Theme } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import props from '../properties';

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
  // State vars
  const [numNotifications, setNumNotifications] = useState(0); // Number of notifications

  // On load, establish a connection for Server-Sent Events to get notification updates
  useEffect(() => {
    const eventSource = new EventSource(
      `${props.API_PATHS.ROOT_URL}${props.API_PATHS.NOTIFICATION}/poc`,
      { withCredentials: true }
    );

    // TODO - Add event listeners for open and error events

    eventSource.onmessage = event => {
      setNumNotifications(Number(JSON.parse(event.data)));
    };

    return () => {
      eventSource.close();
    };
  }, []);

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
