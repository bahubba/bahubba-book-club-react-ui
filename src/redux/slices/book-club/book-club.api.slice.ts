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
    }),
    updateBookClub: builder.mutation<BookClub, BookClub>({
      query: bookClub => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.UPDATE}`,
        method: 'PATCH',
        body: bookClub
      })
    }),
    getBookClubByName: builder.query<BookClub, string>({
      query: bookClub => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.BOOK_CLUB_BY_NAME}/${bookClub}`
      })
    }),
    getBookClubsForReader: builder.query<BookClub[], void>({
      query: () =>
        `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.BOOK_CLUBS_FOR_READER}`
    })
  })
});

export const {
  useCreateBookClubMutation,
  useUpdateBookClubMutation,
  useGetBookClubByNameQuery,
  useLazyGetBookClubByNameQuery,
  useGetBookClubsForReaderQuery,
  useLazyGetBookClubsForReaderQuery
} = bookClubAPISlice;

export default bookClubAPISlice;
