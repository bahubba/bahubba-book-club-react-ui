import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { useCreateBookClubMutation } from '../../redux/slices/book-club/book-club.api.slice';
import PublicityInput from '../../components/inputs/publicity.input';
import { Publicity } from '../../interfaces';

// MUI emotion styles
const styles = {
  rootGrid: {
    justifyContent: 'center'
  },
  fullWidthInput: {
    width: '100%'
  }
};

/**
 * Page/route for creating a new book club
 */
const CreateBookClubRoute = () => {
  // Navigation from react-router-dom
  const navigate = useNavigate();

  // State vars
  const [name, setName] = useState('');
  const [image, setImage] = useState(''); // TODO: Change to File type
  const [description, setDescription] = useState('');
  const [publicity, setPublicity] = useState<Publicity>(Publicity.PRIVATE);
  const [canSubmit, setCanSubmit] = useState(false);

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

  // Create book club API call from redux-toolkit
  // TODO - Use isLoading to show a spinner
  const [createBookClub, { isLoading }] = useCreateBookClubMutation();

  // Submit handler
  const handleSubmit = async () => {
    // TODO - Persist the image to S3 and get the URL back

    // Submit the new book club to the API
    try {
      const newBookClub = await createBookClub({
        name,
        imageURL: image,
        description,
        publicity
      }).unwrap();

      // TODO - Toast/snackbar message for success

      // Clear the form
      setName('');
      setImage('');
      setDescription('');

      // Redirect to the new book club's home page
      navigate(`/book-club/${newBookClub.name}`);
    } catch (err) {
      // TODO - Toast/snackbar message for error
      console.log(err);
    }
  };

  // On required input change, check if the form can be submitted
  useEffect(() => {
    if (name && description) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [name, description]);

  return (
    <Grid
      container
      sx={styles.rootGrid}
    >
      <Grid
        item
        container
        xs={6}
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <Typography variant="h4">Create Book Club</Typography>
        </Grid>
        <Grid
          item
          xs={12}
        >
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
        <Grid
          item
          xs={12}
        >
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
        <Grid
          item
          xs={12}
        >
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
        <Grid
          item
          xs={12}
        >
          <PublicityInput
            publicity={publicity}
            handlePublicityChange={handlePublicityChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
          >
            Create Book Club
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateBookClubRoute;
