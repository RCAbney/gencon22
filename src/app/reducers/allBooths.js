import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booths: [],
};

export const allBoothsSlice = createSlice({
  name: "allBooths",
  initialState,
  reducers: {
    setAllBooths: (state, action) => {
      state.booths = action.payload;
    },
  },
});

export const { setAllBooths } = allBoothsSlice.actions;

export default allBoothsSlice.reducer;
