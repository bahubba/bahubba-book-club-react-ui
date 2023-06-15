import api from '../../../api/base';
import props from '../../../properties';

const authAPISlice = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: `${props.API_PATHS.ROOT_URL}${props.API_PATHS.AUTH}`,
        method: 'POST',
        body: { ...credentials }
      })
    })
  })
});

export default authAPISlice;
