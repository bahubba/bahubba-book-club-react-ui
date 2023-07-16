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

// Slice definition
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state = {...action.payload, isLoggedIn: true};
    },
    logout: state => {
      state = { username: null, isLoggedIn: false };
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUsername = (state: RootState) => state.auth.username;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
