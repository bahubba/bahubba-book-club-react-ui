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

// Redux API Slice for Membership Request endpoints
const membershipRequestAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    requestMembership: builder.mutation<void, MembershipRequestPayload>({
      query: membershipRequest => ({
        url: `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.REQUEST_MEMBERSHIP}`,
        method: 'POST',
        body: membershipRequest
      })
    }),
    hasPendingRequest: builder.query<boolean, string>({
      query: bookClubName =>
        `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.HAS_PENDING_REQUEST}/${bookClubName}`
    }),
    getRequestsForBookClub: builder.query<
      PaginatedResponse<MembershipRequest>,
      PaginatedBookClubPayload
    >({
      query: paginatedBookClubPayload =>
        `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.REQUESTS_FOR_BOOK_CLUB}/${paginatedBookClubPayload.bookClubName}` +
        `?pageNum=${paginatedBookClubPayload.pageNum}&pageSize=${props.PAGE_SIZE}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      transformResponse: (rsp: PaginatedResponse<MembershipRequest>) => ({
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
      transformErrorResponse: (
        rsp: ErrorResponse<PaginatedResponse<MembershipRequest>>
      ) => {
        console.warn(rsp.data.message);
        if (rsp.data.data) rsp.data.data.fetchedPages = [rsp.data.data?.number];
        return rsp;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
    }),
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
