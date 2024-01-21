import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import oAuth2Reducer from './slices/auth/oauth2.slice';
import authAPISlice from './api/auth/auth.api.slice';
import _ from 'lodash';

// Combine reducers
const rootReducer = combineReducers({
  oAuth2: oAuth2Reducer,
  [authAPISlice.reducerPath]: authAPISlice.reducer
});

// Redux persistence config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['oAuth2']
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
