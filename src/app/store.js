import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { boothsApi } from "./reducers/apiSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import allBoothsSlice from "./reducers/allBooths";

const reducers = combineReducers({
  allBooths: allBoothsSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    persistedReducer,
    [boothsApi.reducerPath]: boothsApi.reducer,
  },
  // middleware: getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //   },
  // }).concat(boothsApi.middleware),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(boothsApi.middleware);
  },
});

setupListeners(store.dispatch);

export default store;
