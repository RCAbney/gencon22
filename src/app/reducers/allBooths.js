import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      if (state.booths[action.payload.index].isSelected) {
        state.booths[action.payload.index].isSelected = false;
        toast.success(`${action.payload.title} was removed from your booths.`);
      } else {
        state.booths[action.payload.index].isSelected = true;
        toast.success(`${action.payload.title} was added to your booths.`);
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
