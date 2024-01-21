import api from '../base';
import props from '../../../properties';

/**
 * Redux API Slice for Auth endpoints
 */
const authAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    // Mutation for logging out
    logout: builder.mutation({
      query: () => ({
        url: props.API_PATHS.LOGOUT,
        method: 'POST'
      })
    })
  })
});

export const { useLogoutMutation } = authAPISlice;

export default authAPISlice;
