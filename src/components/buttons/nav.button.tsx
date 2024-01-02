import { Link } from 'react-router-dom';
import { IconButton, Tooltip, SvgIconProps } from '@mui/material';

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
interface NavButtonProps {
  uri: string;
  tooltip: string;
  icon: React.ReactElement<SvgIconProps>;
}

/**
 * Button for navigation to a given URI within the app
 * @prop {string} uri - The URI to navigate to
 * @prop {string} tooltip - The tooltip to display on hover
 * @prop {React.ReactElement<SvgIconProps>} icon - The icon to display in the button
 */
const NavButton = ({ uri, tooltip, icon }: NavButtonProps) => {
  return (
    <Link to={uri}>
      <Tooltip
        title={tooltip}
        placement="top"
      >
        <IconButton
          sx={styles.button}
          size="small"
        >
          {icon}
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default NavButton;
