import api from '../../api/base';
import { BookClub } from '../../../interfaces';
import props from '../../../properties';

// Redux API Slice for Book Club endpoints
const bookClubAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    createBookClub: builder.mutation<BookClub, BookClub>({
      query: bookClub => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.CREATE}`,
        method: 'POST',
        body: bookClub
      })
    })
  })
});

export const { useCreateBookClubMutation } = bookClubAPISlice;

export default bookClubAPISlice;
