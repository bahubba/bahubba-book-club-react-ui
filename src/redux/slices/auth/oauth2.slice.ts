import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OAuth2Credentials } from '../../interfaces';
import type { RootState } from '../../store';

// Slice state interface
interface OAuth2State extends OAuth2Credentials {
  isLoggedIn: boolean;
}

// Initial slice state
const initialState: OAuth2State = {
  email: null,
  givenName: null,
  surname: null,
  imageUrl: null,
  provider: null,
  isLoggedIn: false
};

/**
 * Redux Slice for Auth state
 */
export const oAuth2Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<OAuth2Credentials>) => {
      state.email = action.payload.email;
      state.givenName = action.payload.givenName;
      state.surname = action.payload.surname;
      state.imageUrl = action.payload.imageUrl;
      state.provider = action.payload.provider;
      state.isLoggedIn = true;
    },
    clearCredentials: state => {
      state.email = null;
      state.givenName = null;
      state.surname = null;
      state.imageUrl = null;
      state.provider = null;
      state.isLoggedIn = false;
    }
  }
});

// Actions
export const { setCredentials, clearCredentials } = oAuth2Slice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.oAuth2;
export const selectIsLoggedIn = (state: RootState) => state.oAuth2.isLoggedIn;

export default oAuth2Slice.reducer;
