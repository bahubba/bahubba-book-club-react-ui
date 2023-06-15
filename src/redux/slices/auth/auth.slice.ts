import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthPayload } from '../../intefaces';
import type { RootState } from '../../store';

// Slice state interface
interface AuthState {
  username: string | null;
  token: string | null;
}

// Initial slice state
const initialState: AuthState = {
  username: '',
  token: null
};

// Slice definition
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state = action.payload;
    },
    logout: state => {
      state = { username: null, token: null };
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUsername = (state: RootState) => state.auth.username;
export const selectCurrentAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
