import { configureStore } from "@reduxjs/toolkit";
import allBoothsSlice from "./reducers/allBooths";
import userBoothsSlice from "./reducers/userBooths";

export const store = configureStore({
  reducer: {
    allBooths: allBoothsSlice,
    userBooths: userBoothsSlice,
  },
});
