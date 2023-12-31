import api from '../../api/base';
import {
  MembershipRequest,
  MembershipRequestAction,
  MembershipRequestPayload
} from '../../../interfaces';
import props from '../../../properties';
import { PaginatedResponse } from '../../interfaces';

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
      string
    >({
      query: bookClubName =>
        `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.REQUESTS_FOR_BOOK_CLUB}/${bookClubName}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (existing, incoming) => ({
        ...incoming,
        content: [...(existing?.content || []), ...incoming.content]
      }),
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
