import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthPayload } from '../../interfaces';
import type { RootState } from '../../store';

// Slice state interface
interface AuthState {
  username: string | null;
  isLoggedIn: boolean;
}

// Initial slice state
const initialState: AuthState = {
  username: null,
  isLoggedIn: false
};

/**
 * Redux Slice for Auth state
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    clearCredentials: state => {
      state.username = null;
      state.isLoggedIn = false;
    }
  }
});

// Actions
export const { setCredentials, clearCredentials } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUsername = (state: RootState) => state.auth.username;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
