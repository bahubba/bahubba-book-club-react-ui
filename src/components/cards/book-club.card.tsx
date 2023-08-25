import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
}

/**
 * Card component for displaying a book club with a name, description, and image
 * @prop {BookClub} bookClub Book club metadata
 * TODO - Update default image URL after S3 bucket is setup
 */
const BookClubCard = ({ bookClub }: BookClubCardProps) => {
  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Navigate to the book club's home page on click
  const handleClick = () => navigate(`/book-club/${bookClub.name}`);

  return (
    <Tooltip
      title={bookClub.description}
      arrow
      placement="top"
    >
      <Card
        sx={styles.card}
        onClick={handleClick}
      >
        <CardMedia
          image={
            bookClub.imageURL ||
            'https://wordsrated.com/wp-content/uploads/2022/02/Number-of-Books-Published-Per-Year.jpg'
          }
          sx={styles.cardImage}
        />
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
