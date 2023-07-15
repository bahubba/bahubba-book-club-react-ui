import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthPayload } from '../../interfaces';
import type { RootState } from '../../store';

// Slice state interface
interface AuthState {
  username: string | null;
}

// Initial slice state
const initialState: AuthState = {
  username: ''
};

// Slice definition
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      console.log('payload: ', action.payload); // DELETEME
      state = action.payload;
    },
    logout: state => {
      state = { username: null };
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUsername = (state: RootState) => state.auth.username;

export default authSlice.reducer;
