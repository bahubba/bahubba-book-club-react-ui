import { Card, CardContent, CardMedia, Tooltip, Typography } from "@mui/material";

import { BookClub } from "../../interfaces";

// MUI emotion styles
const styles = {
  card: {
    maxWidth: 300
  },
  cardImage: {
    height: 200
  }
}

// Component props
interface BookClubCardProps {
  bookClub: BookClub;
}

/**
 * Card component for displaying a book club with a name, description, and image
 * @param {BookClub} bookClub Book club metadata
 */
const BookClubCard = ({ bookClub }: BookClubCardProps) => {
  return (
    <Tooltip title={bookClub.description}>
      <Card sx={styles.card}>
        <CardMedia image={bookClub.imageURL} sx={styles.cardImage} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{bookClub.name}</Typography>
        </CardContent>
      </Card>
    </Tooltip>
  )
};

export default BookClubCard;