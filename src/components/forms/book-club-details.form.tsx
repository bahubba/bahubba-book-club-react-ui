import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import _ from 'lodash';

import {
  useCreateBookClubMutation,
  useLazyGetBookClubByNameQuery,
  useUpdateBookClubMutation
} from '../../redux/slices/book-club/book-club.api.slice';
import PublicityInput from '../../components/inputs/publicity.input';
import { BookClub, Publicity } from '../../interfaces';

// MUI emotion styles
const styles = {
  rootGrid: {
    py: 1,
    height: '100%',
    overflow: 'auto'
  },
  fullWidthInput: {
    width: '100%'
  },
  errMessageContainer: {
    paddingTop: '0 !important', // Needs important to override grid spacing
    color: 'red'
  }
};

// Component props
type xsRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface BookClubDetailsFormProps {
  updateExisting?: boolean;
  gridXS?: xsRange;
}

/**
 * Form for creating a new book club or updating an existing one
 * @prop {boolean} updateExisting - Whether or not this form is for updating an existing book club
 * @prop {xsRange} gridXS - Pass-through MUI Grid item XS size prop
 */
const BookClubDetailsForm = ({
  updateExisting = false,
  gridXS = 6
}: BookClubDetailsFormProps) => {
  /* HOOKS */

  // Book club name from the route params
  const { bookClubName } = useParams();

  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Redux API query for an existing book club
  const [trigger, { data: bookClub }] = useLazyGetBookClubByNameQuery();

  // Create book club API hook from redux-toolkit
  // TODO - Use isLoading to show a spinner
  const [createBookClub, { isLoading: createBookClubLoading }] =
    useCreateBookClubMutation();

  // Update book club API hook from redux-toolkit
  // TODO - Use isLoading to show a spinner
  const [updateBookClub, { isLoading: updateBookClubLoading }] =
    useUpdateBookClubMutation();

  // State vars
  const [name, setName] = useState('');
  const [image, setImage] = useState(''); // TODO: Change to File type
  const [description, setDescription] = useState('');
  const [publicity, setPublicity] = useState<Publicity>(Publicity.PRIVATE);
  const [canSubmit, setCanSubmit] = useState(false);
  const [nameErrMessage, setNameErrMessage] = useState('');

  /* HANDLERS */

  // Input change handlers
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setImage(event.target.value);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setDescription(event.target.value);

  const handlePublicityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPublicity(event.target.value as Publicity);

  // Create book club handler
  const handleCreateBookClub = async () => {
    // TODO - Persist the image to S3 and get the URL back

    // Submit the new book club to the API
    try {
      const newBookClub = await createBookClub({
        name: _.trim(name),
        imageURL: image,
        description: _.trim(description),
        publicity
      } as BookClub).unwrap();

      // Clear the form
      setName('');
      setImage('');
      setDescription('');

      // Notify the user that the book club creation was successful
      toast.success(`New book club ${newBookClub.name} created!`, {
        position: 'bottom-right'
      });

      // Redirect to the new book club's home page
      navigate(`/book-club/${newBookClub.name}`);
    } catch (err) {
      // TODO - Toast/snackbar message for error
      console.log(err);
    }
  };

  // Update book club handler
  const handleUpdateBookClub = async () => {
    // TODO - Persist the image to S3 and get the URL back

    // Submit the updated book club to the API
    try {
      const updatedBookClub = await updateBookClub({
        id: bookClub?.id,
        name: _.trim(name),
        imageURL: image,
        description: _.trim(description),
        publicity
      } as BookClub).unwrap();

      // Notify the user that the book club update was successful
      toast.success(`Book club ${updatedBookClub.name} updated!`, {
        position: 'bottom-right'
      });

      // Redirect to the updated book club's admin page
      navigate(`/book-club/${updatedBookClub.name}/admin/details`);
    } catch (err) {
      // TODO - Toast/snackbar message for error
      console.log(err);
    }
  };

  /* LISTENERS */

  // When we have a book club name, fetch a book club with that name
  useEffect(() => {
    if (bookClubName && !_.isEmpty(_.trim(bookClubName))) {
      trigger(_.trim(bookClubName));
    }
  }, [trigger, bookClubName]);

  // When the book club query result changes, update the form
  useEffect(() => {
    if (bookClub) {
      setName(bookClub.name);
      setImage(bookClub.imageURL);
      setDescription(bookClub.description);
      setPublicity(bookClub.publicity);
    }
  }, [bookClub]);

  // On required input change, check if the form can be submitted
  useEffect(() => {
    if (
      !_.isEmpty(_.trim(name)) &&
      !_.isEmpty(_.trim(description)) &&
      !_.isEqual('create', _.trim(_.toLower(name)))
    ) {
      if (bookClub) {
        setCanSubmit(
          !_.isEqual(_.trim(name), bookClub.name) ||
            !_.isEqual(_.trim(description), bookClub.description) ||
            !_.isEqual(_.trim(image), bookClub.imageURL) ||
            !_.isEqual(publicity, bookClub.publicity)
        );
      } else {
        setCanSubmit(true);
      }
    } else {
      setCanSubmit(false);
    }
  }, [bookClub, name, description, image, publicity]);

  // Set the name error message if the name is 'create'
  useEffect(() => {
    if (_.isEqual('create', _.trim(_.toLower(name)))) {
      setNameErrMessage(`Name cannot be "${_.trim(name)}"`);
    } else {
      setNameErrMessage('');
    }
  }, [name]);

  return (
    <Grid
      container
      justifyContent="center"
      sx={styles.rootGrid}
    >
      <Grid
        item
        container
        direction="column"
        xs={gridXS}
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4">
            {`${updateExisting ? 'Update' : 'Create'} Book Club`}
          </Typography>
        </Grid>
        {!_.isEmpty(nameErrMessage) && (
          <Grid
            item
            sx={styles.errMessageContainer}
          >
            <Typography variant="body2">{nameErrMessage}</Typography>
          </Grid>
        )}
        <Grid item>
          <TextField
            id="name"
            variant="outlined"
            label="Name"
            helperText="Must be unique"
            value={name}
            onChange={handleNameChange}
            required
            sx={styles.fullWidthInput}
          />
        </Grid>
        <Grid item>
          {/* TODO - Add image upload functionality */}
          <TextField
            id="image"
            variant="outlined"
            label="Image"
            value={image}
            onChange={handleImageChange}
            sx={styles.fullWidthInput}
          />
        </Grid>
        <Grid item>
          <TextField
            id="description"
            variant="outlined"
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            required
            sx={styles.fullWidthInput}
          />
        </Grid>
        <Grid item>
          <PublicityInput
            publicity={publicity}
            handlePublicityChange={handlePublicityChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={
              updateExisting ? handleUpdateBookClub : handleCreateBookClub
            }
            disabled={!canSubmit || createBookClubLoading}
          >
            {`${updateExisting ? 'Update' : 'Create'} Book Club`}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookClubDetailsForm;
