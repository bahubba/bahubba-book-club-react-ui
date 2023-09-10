import api from '../base';
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
    }),
    search: builder.query<BookClub[], string>({
      query: searchTerm => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.SEARCH}`,
        method: 'POST',
        body: { searchTerm, page: 0, size: 10 }
      })
    }),
    disbandBookClub: builder.mutation<void, string>({
      query: bookClubID => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.DISBAND}/${bookClubID}`,
        method: 'DELETE'
      })
    }),
    disbandBookClubByName: builder.mutation<void, string>({
      query: bookClubName => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.DISBAND_BY_NAME}/${bookClubName}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useCreateBookClubMutation,
  useUpdateBookClubMutation,
  useGetBookClubByNameQuery,
  useLazyGetBookClubByNameQuery,
  useGetBookClubsForReaderQuery,
  useLazyGetBookClubsForReaderQuery,
  useSearchQuery,
  useLazySearchQuery,
  useDisbandBookClubMutation,
  useDisbandBookClubByNameMutation
} = bookClubAPISlice;

export default bookClubAPISlice;
