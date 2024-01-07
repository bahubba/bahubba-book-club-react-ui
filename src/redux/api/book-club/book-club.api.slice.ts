import api from '../base';
import { BookClub } from '../../../interfaces';
import props from '../../../properties';
import {
  ErrorResponse,
  PaginatedBookClubSearchPayload,
  PaginatedResponse
} from '../../interfaces';
import _ from 'lodash';

/**
 * Redux API Slice for Book Club endpoints
 */
const bookClubAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    // Mutation for creating a new book club
    createBookClub: builder.mutation<BookClub, BookClub>({
      query: bookClub => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.CREATE}`,
        method: 'POST',
        body: bookClub
      })
    }),

    // Mutation for updating a book club's info
    updateBookClub: builder.mutation<BookClub, BookClub>({
      query: bookClub => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.UPDATE}`,
        method: 'PATCH',
        body: bookClub
      })
    }),

    // Query for getting a book club by name
    getBookClubByName: builder.query<BookClub, string>({
      query: bookClub => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.BOOK_CLUB_BY_NAME}/${bookClub}`
      })
    }),

    // Paginated query for all book clubs a user is a member of
    getBookClubsForUser: builder.query<PaginatedResponse<BookClub>, number>({
      query: pageNum =>
        `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.BOOK_CLUBS_FOR_USER}?pageNum=${pageNum}&pageSize=${props.PAGE_SIZE}`,

      // Cache key for this query; unique per user
      serializeQueryArgs: ({ endpointName }) => endpointName,

      // Add the page number to a prop used to track which pages have been fetched
      transformResponse: (rsp: PaginatedResponse<BookClub>) => ({
        ...rsp,
        fetchedPages: [rsp.number]
      }),

      // Use the new incoming response, but prepend the existing content (previous pages)
      merge: (existing, incoming) =>
        _.includes(
          _.get(existing, 'fetchedPages', []),
          _.get(incoming, 'number')
        )
          ? existing
          : {
              ...incoming,
              content: [...(existing?.content || []), ...incoming.content],
              fetchedPages: [...(existing?.fetchedPages || []), incoming.number]
            },

      // If the response is a page size error, we still got data
      transformErrorResponse: (
        rsp: ErrorResponse<PaginatedResponse<BookClub>>
      ) => {
        console.warn(rsp.data.message);
        if (rsp.data.data) rsp.data.data.fetchedPages = [rsp.data.data?.number];
        return rsp;
      },

      // If the page number or page size has changed, refetch
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
    }),

    // Paginated query for searching for book clubs by name
    search: builder.query<
      PaginatedResponse<BookClub>,
      PaginatedBookClubSearchPayload
    >({
      query: searchPayload => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.SEARCH}`,
        method: 'POST',
        body: searchPayload
      }),

      // Cache key for this query; unique per search string
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}_${queryArgs.searchTerm}`,

      // Add the page number to a prop used to track which pages have been fetched
      transformResponse: (rsp: PaginatedResponse<BookClub>) => ({
        ...rsp,
        fetchedPages: [rsp.number]
      }),

      // Use the new incoming response, but prepend the existing content (previous pages)
      merge: (existing, incoming) =>
        _.includes(
          _.get(existing, 'fetchedPages', []),
          _.get(incoming, 'number')
        )
          ? existing
          : {
              ...incoming,
              content: [...(existing?.content || []), ...incoming.content],
              fetchedPages: [...(existing?.fetchedPages || []), incoming.number]
            },

      // If the response is a page size error, we still got data
      transformErrorResponse: (
        rsp: ErrorResponse<PaginatedResponse<BookClub>>
      ) => {
        console.warn(rsp.data.message);
        if (rsp.data.data) rsp.data.data.fetchedPages = [rsp.data.data?.number];
        return rsp;
      },

      // If the page number or page size has changed, refetch
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
    }),

    // Mutation for disbanding a book club by ID
    disbandBookClub: builder.mutation<void, string>({
      query: bookClubID => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.DISBAND}/${bookClubID}`,
        method: 'DELETE'
      })
    }),

    // Mutation for disbanding a book club by name
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
  useGetBookClubsForUserQuery,
  useLazyGetBookClubsForUserQuery,
  useSearchQuery,
  useLazySearchQuery,
  useDisbandBookClubMutation,
  useDisbandBookClubByNameMutation
} = bookClubAPISlice;

export default bookClubAPISlice;
