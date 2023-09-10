import api from '../base';
import { BookClubMembership } from '../../../interfaces';
import props from '../../../properties';

// Redux API Slice for Book Club Membership endpoints
const bookClubMembershipAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    removeMember: builder.mutation<void, BookClubMembership>({
      query: membership => ({
        url: `${props.API_PATHS.BOOK_CLUBS}${props.API_PATHS.REMOVE_MEMBER}/${membership.bookClub.name}/${membership.reader.id}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useRemoveMemberMutation } = bookClubMembershipAPISlice;

export default bookClubMembershipAPISlice;
