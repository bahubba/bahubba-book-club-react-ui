import api from '../base';
import { BookClub } from '../../../interfaces';
import props from '../../../properties';
import {
  PaginatedBookClubSearchPayload,
  PaginatedResponse
} from '../../interfaces';
import _ from 'lodash';

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
    getBookClubsForReader: builder.query<PaginatedResponse<BookClub>, number>({
      query: pageNum =>
        `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.BOOK_CLUBS_FOR_READER}?pageNum=${pageNum}&pageSize=${props.PAGE_SIZE}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      transformResponse: (rsp: PaginatedResponse<BookClub>) => ({
        ...rsp,
        fetchedPages: [rsp.number]
      }),
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
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
    }),
    search: builder.query<
      PaginatedResponse<BookClub>,
      PaginatedBookClubSearchPayload
    >({
      query: searchPayload => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.SEARCH}`,
        method: 'POST',
        body: searchPayload
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}_${queryArgs.searchTerm}`,
      transformResponse: (rsp: PaginatedResponse<BookClub>) => ({
        ...rsp,
        fetchedPages: [rsp.number]
      }),
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
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
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
