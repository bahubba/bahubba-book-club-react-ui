import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthPayload } from '../../intefaces';
import type { RootState } from '../../store';

// Slice state interface
interface AuthState {
  user: any; // FIXME
  token: string | null;
}

// Initial slice state
const initialState: AuthState = {
  user: '',
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
      state = { user: null, token: null };
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
