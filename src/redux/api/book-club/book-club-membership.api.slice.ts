import api from '../base';
import { BookClubMembership, MembershipUpdate } from '../../../interfaces';
import props from '../../../properties';
import { PaginatedBookClubPayload, PaginatedResponse } from '../../interfaces';

// Redux API Slice for Book Club Membership endpoints
const bookClubMembershipAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    getMembers: builder.query<
      PaginatedResponse<BookClubMembership>,
      PaginatedBookClubPayload
    >({
      query: paginatedBookClubPayload =>
        `${props.API_PATHS.MEMBERSHIPS}${props.API_PATHS.ALL_MEMBERSHIPS}/${paginatedBookClubPayload.bookClubName}` +
        `?pageNum=${paginatedBookClubPayload.pageNum}&pageSize=${props.PAGE_SIZE}}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}_${queryArgs.bookClubName}`,
      merge: (existing, incoming) => ({
        ...incoming,
        content: [...(existing?.content || []), ...incoming.content]
      }),
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg
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
    removeMember: builder.mutation<BookClubMembership, BookClubMembership>({
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
