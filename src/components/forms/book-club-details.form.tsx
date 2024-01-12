import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import _ from 'lodash';

import BookClubCard from '../cards/book-club.card';
import ImageSelectorDialog from '../dialogs/image-selector.dialog';
import PublicityInput from '../../components/inputs/publicity.input';
import {
  useCreateBookClubMutation,
  useGetStockImagesQuery,
  useLazyGetBookClubByNameQuery,
  useUpdateBookClubMutation
} from '../../redux/api/book-club/book-club.api.slice';
import { AdminOutletContext, Image, Publicity } from '../../interfaces';
import { BookClubPayload } from '../../redux/interfaces';

// MUI emotion styles
const styles = {
  rootGrid: {
    py: 1,
    height: '100%',
    overflow: 'auto'
  },
  loadingSpinnerRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
  showTitle?: boolean;
}

/**
 * Form for creating a new book club or updating an existing one
 * @prop {boolean} updateExisting - Whether or not this form is for updating an existing book club
 * @prop {xsRange} gridXS - Pass-through MUI Grid item XS size prop
 * @prop {boolean} showTitle - Whether or not to show the form title
 */
const BookClubDetailsForm = ({
  updateExisting = false,
  gridXS = 6,
  showTitle = false
}: BookClubDetailsFormProps) => {
  /* HOOKS */

  // Pull the book club name from the outlet context
  const bookClubName = _.get(
    useOutletContext<AdminOutletContext>(),
    'bookClubName'
  );

  // Navigation from react-router-dom
  const navigate = useNavigate();

  // Redux API query for getting stock book club images
  const { data: stockBookClubImages } = useGetStockImagesQuery();

  // Redux API query for an existing book club
  const [getBookClub, { data: bookClub }] = useLazyGetBookClubByNameQuery();

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
  const [image, setImage] = useState<Image>({ fileName: '', url: '' });
  const [description, setDescription] = useState('');
  const [publicity, setPublicity] = useState<Publicity>(Publicity.PRIVATE);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [nameErrMessage, setNameErrMessage] = useState('');

  /* HANDLERS */

  // Input change handlers
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleDemoCardClick = () => setImagePickerOpen(true);

  const handleCloseImagePicker = () => setImagePickerOpen(false);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setDescription(event.target.value);

  const handlePublicityChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPublicity(event.target.value as Publicity);

  // Handle submitting the form on enter keypress
  const handleKeydownSubmit = (event: React.KeyboardEvent) => {
    if (canSubmit && _.isEqual('Enter', event.key)) {
      updateExisting ? handleUpdateBookClub() : handleCreateBookClub();
    }
  };

  // Create book club handler
  const handleCreateBookClub = async () => {
    // TODO - Persist the image to S3 and get the URL back

    // Submit the new book club to the API
    try {
      const newBookClub = await createBookClub({
        name: _.trim(name),
        imageFileName: image?.fileName,
        description: _.trim(description),
        publicity
      } as BookClubPayload).unwrap();

      // Clear the form
      setName('');
      setImage({ fileName: '', url: '' });
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
        imageFileName: image?.fileName,
        description: _.trim(description),
        publicity
      } as BookClubPayload).unwrap();

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
      getBookClub(_.trim(bookClubName));
    }
  }, [getBookClub, bookClubName]);

  // When the book club query result changes, update the form
  useEffect(() => {
    if (bookClub) {
      setName(bookClub.name);
      setDescription(bookClub.description);
      setPublicity(bookClub.publicity);
    }
  }, [bookClub]);

  // When we get stock images, set the initial image
  useEffect(() => {
    if (_.size(stockBookClubImages) > 0) {
      setImage(_.first(stockBookClubImages) ?? { fileName: '', url: '' });
    }
  }, [stockBookClubImages]);

  // On required input change, check if the form can be submitted
  useEffect(() => {
    if (
      !_.isEmpty(_.trim(name)) &&
      !_.isEmpty(_.trim(description)) &&
      !_.includes(['create', 'default'], _.trim(_.toLower(name)))
    ) {
      if (bookClub) {
        setCanSubmit(
          !_.isEqual(_.trim(name), bookClub.name) ||
            !_.isEqual(_.trim(description), bookClub.description) ||
            !_.isEqual(_.trim(image?.fileName), bookClub.image.fileName) ||
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
    <>
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
          {showTitle && (
            <>
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
            </>
          )}
          <Grid item>
            <TextField
              id="name"
              variant="outlined"
              label="Name"
              helperText="Must be unique"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeydownSubmit}
              required
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid item>
            <BookClubCard
              bookClub={{
                name: _.trim(name) || 'Book Club',
                image: image ?? { fileName: '', url: '' },
                description: 'Change your book club image',
                publicity: publicity
              }}
              demoCard
              handleDemoCardClick={handleDemoCardClick}
            />
          </Grid>
          <Grid item>
            <TextField
              id="description"
              variant="outlined"
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              onKeyDown={handleKeydownSubmit}
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
              disabled={
                !canSubmit || createBookClubLoading || updateBookClubLoading
              }
            >
              {`${updateExisting ? 'Update' : 'Create'} Book Club`}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ImageSelectorDialog
        images={stockBookClubImages ?? []}
        selectedImage={image ?? { fileName: '', url: '' }}
        setSelectedImage={setImage}
        handleClose={handleCloseImagePicker}
        open={imagePickerOpen}
      />
    </>
  );
};

export default BookClubDetailsForm;
