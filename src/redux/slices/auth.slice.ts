import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthPayload } from "../intefaces";
import type { RootState } from "../store";

// Slice state interface
interface AuthState {
    username: string;
    authToken: string|null;
    isLoggedIn: boolean;
}

// Initial slice state
const initialState: AuthState = {
    username: '',
    authToken: null,
    isLoggedIn: false
}

// Slice definition
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<AuthPayload>) => {
            state = { ...action.payload, isLoggedIn: true };
        }
    }
});

export const { logIn } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
