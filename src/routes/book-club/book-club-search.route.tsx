import { useState } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import _ from 'lodash';

import { useLazySearchQuery } from '../../redux/api/book-club/book-club.api.slice';
import BookClubCard from '../../components/cards/book-club.card';
import props from '../../properties';

// MUI emotion styles
const styles = {
  rootGrid: {
    py: 1,
    maxHeight: '100%',
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

const BookClubSearchRoute = () => {
  // Redux API query for searching for book clubs
  const [trigger, { data }] = useLazySearchQuery();

  // Pull the book clubs from the API response's content
  const bookClubs = _.get(data, 'content');

  // Component state
  const [searchTerm, setSearchTerm] = useState('');

  // Handle updating the search term
  const handleSearchTermInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  // Handle submitting the form on enter keypress
  const handleKeydownSubmit = (event: React.KeyboardEvent) => {
    if (_.isEqual('Enter', event.key) && !_.isEmpty(searchTerm)) handleSubmit();
  };

  // Handle submitting the search form
  // TODO - Make pagination dynamic
  const handleSubmit = async () => {
    if (!_.isEmpty(searchTerm)) {
      trigger({ searchTerm, pageNum: 0, pageSize: props.PAGE_SIZE });
    }
  };

  return (
    <>
      <Typography
        component="div"
        variant="h4"
      >
        Book Club Search
      </Typography>
      <Grid
        container
        justifyContent="center"
        sx={styles.rootGrid}
      >
        <Grid
          item
          container
          spacing={1}
          sm={10}
          lg={8}
          xl={6}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            item
            xs={11}
            alignItems="center"
          >
            <TextField
              id="search-term"
              variant="outlined"
              size="small"
              label="Search"
              value={searchTerm}
              onChange={handleSearchTermInput}
              onKeyDown={handleKeydownSubmit}
              required
              sx={styles.fullWidthInput}
            />
          </Grid>
          <Grid
            item
            xs={1}
            alignItems="center"
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              disabled={_.isEmpty(searchTerm)}
            >
              Search
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Divider />
          </Grid>
          <Grid
            item
            container
            spacing={2}
            justifyContent="center"
            xs={12}
          >
            {bookClubs &&
              !_.isEmpty(bookClubs) &&
              _.map(bookClubs, bookClub => (
                <Grid
                  item
                  sm={6}
                  lg={4}
                  xl={3}
                  key={bookClub.id}
                >
                  <BookClubCard bookClub={bookClub} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BookClubSearchRoute;
