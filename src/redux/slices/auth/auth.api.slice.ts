import api from '../../../api/base';
import props from '../../../properties';

import { Credentials } from '../../../interfaces';

const authAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials: Credentials) => ({
        url: `${props.API_PATHS.ROOT_URL}${props.API_PATHS.AUTH}`,
        method: 'POST',
        body: { ...credentials }
      })
    })
  })
});

export const { useLoginMutation } = authAPISlice;

export default authAPISlice;
