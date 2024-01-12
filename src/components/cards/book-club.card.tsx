import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

import { BookClub } from '../../interfaces';

// MUI styled components
const GutterlessCardContent = styled(CardContent)({
  '&:last-child': {
    paddingBottom: 0
  }
});

// MUI emotion styles
const styles = {
  card: {
    maxWidth: 300,
    cursor: 'pointer'
  },
  cardImage: {
    height: 200
  }
};

// Component props
interface BookClubCardProps {
  bookClub: BookClub;
  demoCard?: boolean;
  handleDemoCardClick?: () => void;
}

/**
 * Card component for displaying a book club with a name, description, and image
 * @prop {BookClub} bookClub Book club metadata
 * @prop {boolean} demoCard Whether or not this card is a demo card, if it is, clicking on it will open an image picker
 * @prop {() => void} handleDemoCardClick Callback for when the card is clicked
 * TODO - Change the default media to a loading spinner while waiting for the image
 */
const BookClubCard = ({
  bookClub,
  demoCard = false,
  handleDemoCardClick
}: BookClubCardProps) => {
  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Navigate to the book club's home page on click
  const handleClick = () => {
    demoCard && !!handleDemoCardClick
      ? handleDemoCardClick()
      : navigate(`/book-club/${bookClub.name}`);
  };

  return (
    <Tooltip
      title={bookClub.description}
      placement="top"
      arrow
    >
      <Card
        sx={styles.card}
        onClick={handleClick}
      >
        {!_.isEmpty(bookClub.image.url) && (
          <CardMedia
            image={bookClub.image.url}
            sx={styles.cardImage}
          />
        )}
        <GutterlessCardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
          >
            {bookClub.name}
          </Typography>
        </GutterlessCardContent>
      </Card>
    </Tooltip>
  );
};

export default BookClubCard;
