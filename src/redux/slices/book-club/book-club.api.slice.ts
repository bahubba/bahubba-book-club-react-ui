import api from '../../api/base';
import { BookClub, BookClubMembership } from '../../../interfaces';
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
    getMembership: builder.query<BookClubMembership, string>({
      query: bookClubName =>
        `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.MEMBERSHIP}/${bookClubName}`
    }),
    search: builder.query<BookClub[], string>({
      query: searchTerm => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.SEARCH}`,
        method: 'POST',
        body: { searchTerm, page: 0, size: 10 }
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
  useGetMembershipQuery,
  useLazyGetMembershipQuery,
  useSearchQuery,
  useLazySearchQuery
} = bookClubAPISlice;

export default bookClubAPISlice;
