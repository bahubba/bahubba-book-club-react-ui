import { Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

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

const CreateBookClubRoute = () => {
  // State vars
  const [name, setName] = useState('');
  const [image, setImage] = useState(''); // TODO: Change to File type
  const [description, setDescription] = useState('');
  const [publicity, setPublicity] = useState<Publicity>(Publicity.PRIVATE);

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

  // Submit handler
  const handleSubmit = async () => {
    // TODO - Send the create book club request to the API

    // Clear the form
    setName('');
    setImage('');
    setDescription('');
  };

  return (
    <Grid
      container
      sx={styles.rootGrid}
    >
      <Grid
        item
        xs={8}
      >
        <Grid
          container
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateBookClubRoute;
