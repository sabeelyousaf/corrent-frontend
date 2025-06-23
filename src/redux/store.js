import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import propertyReducer from "./property/propertySlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";

// Persist config for 'auth'
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  property: propertyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

export const server = "http://localhost:4000/api/v1";
// export const server = "https://corrent-backend.onrender.com/api/v1";
