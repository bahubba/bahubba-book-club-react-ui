import api from '../base';
import { BookClubMembership, MembershipUpdate } from '../../../interfaces';
import props from '../../../properties';

// Redux API Slice for Book Club Membership endpoints
const bookClubMembershipAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    getMembers: builder.query<BookClubMembership[], string>({
      query: bookClubName =>
        `${props.API_PATHS.MEMBERSHIPS}${props.API_PATHS.ALL_MEMBERSHIPS}/${bookClubName}`
    }),
    getMembership: builder.query<BookClubMembership, string>({
      query: bookClubName => `${props.API_PATHS.MEMBERSHIPS}/${bookClubName}`
    }),
    updateMemberRole: builder.mutation<BookClubMembership, MembershipUpdate>({
      query: membershipUpdate => ({
        url: `${props.API_PATHS.MEMBERSHIPS}`,
        method: 'PATCH',
        body: membershipUpdate
      })
    }),
    removeMember: builder.mutation<void, BookClubMembership>({
      query: membership => ({
        url: `${props.API_PATHS.MEMBERSHIPS}/${membership.bookClub.name}/${membership.reader.id}`,
        method: 'DELETE'
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
  useRemoveMemberMutation
} = bookClubMembershipAPISlice;

export default bookClubMembershipAPISlice;
