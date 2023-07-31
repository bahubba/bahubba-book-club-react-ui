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
    maxWidth: 300
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
 * @param {BookClub} bookClub Book club metadata
 * TODO - Update default image URL after S3 bucket is setup
 */
const BookClubCard = ({ bookClub }: BookClubCardProps) => {
  return (
    <Tooltip
      title={bookClub.description}
      arrow
      placement="top"
    >
      <Card sx={styles.card}>
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
            variant="h5"
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
