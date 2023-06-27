import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import _ from 'lodash';

import { logout, setCredentials } from '../redux/slices/auth/auth.slice';
import props from '../properties';
import { RootState } from '../redux/store';

// Base API query
const baseQuery = fetchBaseQuery({
  baseUrl: props.API_PATHS.ROOT_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

// Base API query wrapper with refresh auth logic
const baseQueryWithRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  // TODO - See what API returns for bad token and/or for expired token
  //        ... Possibly customize it
  // NOTE - Tutorial used originalStatus, not status, but TS doesn't like it
  if (result?.error?.status === 403) {
    console.log('forbidden; sending refresh token...');

    // Send refresh token to get new access token
    const refreshResult = await baseQuery(
      `${props.API_PATHS.AUTH}${props.API_PATHS.REFRESH}`,
      api,
      extraOptions
    );

    // If we got a valid token in the response, store the new token and retry query
    if (refreshResult?.data) {
      const username = (api.getState() as RootState).auth.username;
      api.dispatch(
        // Store the new token
        setCredentials({
          token: _.get(refreshResult, 'data.token', null),
          username
        })
      );

      // Retry the original query with new credentials
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export default createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: builder => ({})
});
