import { Avatar, Badge, Theme } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// MUI emotion styles
const styles = {
  avatar: {
    height: (theme: Theme) => theme.spacing(4),
    width: (theme: Theme) => theme.spacing(4),
    bgcolor: 'secondary.main',
    color: 'primary.dark'
  }
};

/**
 * Button for linking to the notifications page with a badge for the number of new notifications
 */
const NotificationsButton = () => {
  // Auth state from Redux
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  // // Component state
  // const [numNotifications, setNumNotifications] = useState(0); // Number of notifications

  // On load, establish a connection for Server-Sent Events to get notification updates
  // TODO - Replace with polling until WebSockets or WebFlux is implemented
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const eventSource = new EventSource(
  //       `${props.REACTIVE_API_PATHS.ROOT_URL}${props.REACTIVE_API_PATHS.NOTIFICATION}/count-new`,
  //       { withCredentials: true }
  //     );

  //     // TODO - Add event listeners for open and error events

  //     eventSource.onmessage = event => {
  //       setNumNotifications(Number(JSON.parse(event.data)));
  //     };

  //     eventSource.onerror = () => {
  //       eventSource.close();
  //     };

  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, [isLoggedIn]);

  return (
    <Link to="/notifications">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        color="error"
        badgeContent={0 /*numNotifications*/}
      >
        <Avatar sx={styles.avatar}>
          <NotificationsNone />
        </Avatar>
      </Badge>
    </Link>
  );
};

export default NotificationsButton;
