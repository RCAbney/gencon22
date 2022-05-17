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
    setIsBoothSelected: (state, action) => {
      if (state.booths[action.payload].isSelected) {
        state.booths[action.payload].isSelected = false;
      } else {
        state.booths[action.payload].isSelected = true;
      }
    },
  },
});

export const { setAllBooths, setIsBoothSelected } = allBoothsSlice.actions;

export default allBoothsSlice.reducer;
