import api from '../base';
import {
  BookClub,
  BookClubMembership,
  MembershipUpdate
} from '../../../interfaces';
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
    }),
    getMembers: builder.query<BookClubMembership[], string>({
      query: bookClubName =>
        `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.MEMBERS}/${bookClubName}`
    }),
    updateMemberRole: builder.mutation<BookClubMembership, MembershipUpdate>({
      query: membershipUpdate => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.UPDATE_MEMBER_ROLE}`,
        method: 'PATCH',
        body: membershipUpdate
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
  useGetMembershipQuery,
  useLazyGetMembershipQuery,
  useSearchQuery,
  useLazySearchQuery,
  useGetMembersQuery,
  useLazyGetMembersQuery,
  useUpdateMemberRoleMutation,
  useDisbandBookClubMutation,
  useDisbandBookClubByNameMutation
} = bookClubAPISlice;

export default bookClubAPISlice;
