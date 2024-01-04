import api from '../base';
import {
  BookClubMembership,
  MembershipUpdate,
  OwnershipChange
} from '../../../interfaces';
import props from '../../../properties';
import {
  ErrorResponse,
  PaginatedBookClubPayload,
  PaginatedResponse
} from '../../interfaces';
import _ from 'lodash';

/**
 * Redux API Slice for Book Club Membership endpoints
 */
const bookClubMembershipAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    // Paginated query for all members of a book club
    getMembers: builder.query<
      PaginatedResponse<BookClubMembership>,
      PaginatedBookClubPayload
    >({
      query: paginatedBookClubPayload =>
        `${props.API_PATHS.MEMBERSHIPS}${props.API_PATHS.ALL_MEMBERSHIPS}/${paginatedBookClubPayload.bookClubName}` +
        `?pageNum=${paginatedBookClubPayload.pageNum}&pageSize=${props.PAGE_SIZE}`,

      // Cache key for this query; unique per book club
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}_${queryArgs.bookClubName}`,

      // Add the page number to a prop used to track which pages have been fetched
      transformResponse: (rsp: PaginatedResponse<BookClubMembership>) => ({
        ...rsp,
        fetchedPages: [rsp.number]
      }),

      // Use the new incoming response, but prepend the existing content (previous pages)
      merge: (existing, incoming) =>
        !_.has(existing, 'fetchedPages') ||
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
        rsp: ErrorResponse<PaginatedResponse<BookClubMembership>>
      ) => {
        console.warn(rsp.data.message);
        if (rsp.data.data) rsp.data.data.fetchedPages = [rsp.data.data?.number];
        return rsp;
      },

      // If the page number or page size has changed, refetch
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
    }),

    // Query for getting the reader's membership in a book club
    getMembership: builder.query<BookClubMembership, string>({
      query: bookClubName => `${props.API_PATHS.MEMBERSHIPS}/${bookClubName}`
    }),

    // Mutation for updating a member's role in a book club
    updateMemberRole: builder.mutation<BookClubMembership, MembershipUpdate>({
      query: membershipUpdate => ({
        url: `${props.API_PATHS.MEMBERSHIPS}`,
        method: 'PATCH',
        body: membershipUpdate
      })
    }),

    // Mutation for removing a member from a book club
    removeMember: builder.mutation<BookClubMembership, BookClubMembership>({
      query: membership => ({
        url: `${props.API_PATHS.MEMBERSHIPS}/${membership.bookClub.name}/${membership.reader.id}`,
        method: 'DELETE'
      })
    }),

    // Mutation for making a user an owner of a book club
    addOwner: builder.mutation<BookClubMembership, OwnershipChange>({
      query: newBookClubOwner => ({
        url: `${props.API_PATHS.MEMBERSHIPS}/add-owner`,
        method: 'PATCH',
        body: newBookClubOwner
      })
    })
  })
});

export const {
  useGetMembersQuery,
  useLazyGetMembersQuery,
  useGetMembershipQuery,
  useLazyGetMembershipQuery,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
  useAddOwnerMutation
} = bookClubMembershipAPISlice;

export default bookClubMembershipAPISlice;
