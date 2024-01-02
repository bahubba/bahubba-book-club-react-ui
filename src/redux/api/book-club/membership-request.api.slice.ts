import api from '../../api/base';
import {
  MembershipRequest,
  MembershipRequestAction,
  MembershipRequestPayload
} from '../../../interfaces';
import props from '../../../properties';
import {
  ErrorResponse,
  PaginatedBookClubPayload,
  PaginatedResponse
} from '../../interfaces';
import _ from 'lodash';

/**
 * Redux API Slice for Membership Request endpoints
 */
const membershipRequestAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    // Mutation for requesting membership in a book club
    requestMembership: builder.mutation<void, MembershipRequestPayload>({
      query: membershipRequest => ({
        url: `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.REQUEST_MEMBERSHIP}`,
        method: 'POST',
        body: membershipRequest
      })
    }),

    // Query for checking if a reader has a pending membership request for a book club
    hasPendingRequest: builder.query<boolean, string>({
      query: bookClubName =>
        `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.HAS_PENDING_REQUEST}/${bookClubName}`
    }),

    // Paginated query for all membership requests for a book club
    getRequestsForBookClub: builder.query<
      PaginatedResponse<MembershipRequest>,
      PaginatedBookClubPayload
    >({
      query: paginatedBookClubPayload =>
        `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.REQUESTS_FOR_BOOK_CLUB}/${paginatedBookClubPayload.bookClubName}` +
        `?pageNum=${paginatedBookClubPayload.pageNum}&pageSize=${props.PAGE_SIZE}`,

      // Cache key for this query; unique per book club
      serializeQueryArgs: ({ endpointName }) => endpointName,

      // Add the page number to a prop used to track which pages have been fetched
      transformResponse: (rsp: PaginatedResponse<MembershipRequest>) => ({
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
        rsp: ErrorResponse<PaginatedResponse<MembershipRequest>>
      ) => {
        console.warn(rsp.data.message);
        if (rsp.data.data) rsp.data.data.fetchedPages = [rsp.data.data?.number];
        return rsp;
      },

      // If the page number or page size has changed, refetch
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
    }),

    // Mutation for approving or rejecting a membership request
    reviewMembershipRequest: builder.mutation<
      MembershipRequest,
      MembershipRequestAction
    >({
      query: membershipRequestAction => ({
        url: `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.REVIEW_MEMBERSHIP_REQUEST}`,
        method: 'PATCH',
        body: membershipRequestAction
      })
    })
  })
});

export const {
  useRequestMembershipMutation,
  useHasPendingRequestQuery,
  useLazyHasPendingRequestQuery,
  useGetRequestsForBookClubQuery,
  useLazyGetRequestsForBookClubQuery,
  useReviewMembershipRequestMutation
} = membershipRequestAPISlice;

export default membershipRequestAPISlice;
