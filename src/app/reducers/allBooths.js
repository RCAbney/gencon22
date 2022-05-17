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
    setIsBoothVisited: (state, action) => {
      if (state.booths[action.payload].isVisited) {
        state.booths[action.payload].isVisited = false;
      } else {
        state.booths[action.payload].isVisited = true;
      }
    },
  },
});

export const { setAllBooths, setIsBoothSelected, setIsBoothVisited } =
  allBoothsSlice.actions;

export default allBoothsSlice.reducer;
