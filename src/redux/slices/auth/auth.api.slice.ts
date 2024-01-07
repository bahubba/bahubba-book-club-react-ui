import api from '../../api/base';
import props from '../../../properties';

import { Credentials, Registration } from '../../../interfaces';

/**
 * Redux API Slice for Auth endpoints
 */
const authAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    // Mutation for authenticating a user/logging in
    login: builder.mutation({
      query: (credentials: Credentials) => ({
        url: `${props.API_PATHS.AUTH}${props.API_PATHS.AUTHENTICATE}`,
        headers: [['Content-Type', 'application/json']],
        method: 'POST',
        body: { ...credentials }
      })
    }),

    // Mutation for registering a new user
    register: builder.mutation({
      query: (registration: Registration) => ({
        url: `${props.API_PATHS.AUTH}${props.API_PATHS.REGISTER}`,
        headers: [['Content-Type', 'application/json']],
        method: 'POST',
        body: { ...registration }
      })
    }),

    // Mutation for logging out
    logout: builder.mutation({
      query: () => ({
        url: `${props.API_PATHS.AUTH}${props.API_PATHS.LOGOUT}`,
        method: 'POST'
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authAPISlice;

export default authAPISlice;
