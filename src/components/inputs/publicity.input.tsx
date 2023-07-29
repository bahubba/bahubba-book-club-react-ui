import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { Publicity } from '../../interfaces';
import _ from 'lodash';

// Component props
interface PublicityInputProps {
  publicity: Publicity;
  handlePublicityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// MUI emotion styles
const styles = {
  fullWidthInput: {
    width: '100%'
  },
  descriptiveText: {
    color: 'rgba(0, 0, 0, 0.5)'
  }
};

/**
 * Radio button group for selecting the publicity of a book club
 * @prop {Publicity} publicity - The selected publicity of the book club
 * @prop {ChangeEvent<HTMLInputElement>} handlePublicityChange - Callback for when the publicity is changed
 */
const PublicityInput = ({
  publicity,
  handlePublicityChange
}: PublicityInputProps) => {
  return (
    <>
      <FormControl
        variant="outlined"
        sx={styles.fullWidthInput}
      >
        <FormLabel id="publicity-label">Publicity</FormLabel>
        <RadioGroup
          row
          aria-labelledby="publicity-label"
          value={publicity}
          onChange={handlePublicityChange}
        >
          <FormControlLabel
            value={Publicity.PUBLIC}
            control={<Radio />}
            label="Public"
          />
          <FormControlLabel
            value={Publicity.OBSERVABLE}
            control={<Radio />}
            label="Observable"
          />
          <FormControlLabel
            value={Publicity.PRIVATE}
            control={<Radio />}
            label="Private"
          />
        </RadioGroup>
      </FormControl>
      <Typography
        variant="body2"
        sx={styles.descriptiveText}
      >
        <b>{_.startCase(publicity)}</b> -{' '}
        {_.isEqual(publicity, Publicity.PRIVATE)
          ? "Your club won't appear in searches and won't be joinable without invitaiton"
          : _.isEqual(publicity, Publicity.OBSERVABLE)
          ? "Your club and its books, ratings, and discussions will be public, but users won't be able to join or participate without invitation"
          : 'Your cub will be publicly visible and users can join as readers and post in discussions freely'}
      </Typography>
    </>
  );
};

export default PublicityInput;
