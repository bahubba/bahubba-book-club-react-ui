import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import props from '../../properties';

// Base API query
const baseQuery = fetchBaseQuery({
  baseUrl: props.API_PATHS.ROOT_URL,
  credentials: 'include'
});

export default createApi({
  baseQuery,
  endpoints: builder => ({})
});
