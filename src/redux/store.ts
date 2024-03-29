import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import authReducer from './slices/auth/auth.slice';
import authAPISlice from './slices/auth/auth.api.slice';
import _ from 'lodash';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [authAPISlice.reducerPath]: authAPISlice.reducer
});

// Redux persistence config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

// Set up the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store config
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authAPISlice.middleware),
  devTools: _.isEqual('dev', process.env.REACT_APP_ENV)
});

// Export the persistor
export const persistor = persistStore(store);

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
