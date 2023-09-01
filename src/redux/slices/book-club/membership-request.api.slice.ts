import api from '../../api/base';
import { MembershipRequest } from '../../../interfaces';
import props from '../../../properties';

// Redux API Slice for Membership Request endpoints
const membershipRequestAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    requestMembership: builder.mutation<void, MembershipRequest>({
      query: membershipRequest => ({
        url: `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.REQUEST_MEMBERSHIP}`,
        method: 'POST',
        body: membershipRequest
      })
    }),
    hasPendingRequest: builder.query<boolean, string>({
      query: bookClubName =>
        `${props.API_PATHS.MEMBERSHIP_REQUESTS}${props.API_PATHS.HAS_PENDING_REQUEST}${bookClubName}`
    })
  })
});

export const {
  useRequestMembershipMutation,
  useHasPendingRequestQuery,
  useLazyHasPendingRequestQuery
} = membershipRequestAPISlice;

export default membershipRequestAPISlice;
