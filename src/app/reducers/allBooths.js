import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  booths: [],
  sortedBy: "Publisher",
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
    setSortedBy: (state) => {
      if (state.sortedBy === "Location") {
        let newSort = [...state.booths];
        newSort.sort((a, b) => {
          const pubA = a.Publisher?.toUpperCase() || "";
          const pubB = b.Publisher?.toUpperCase() || "";
          if (pubA < pubB) {
            return -1;
          }
          if (pubA > pubB) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          booths: newSort,
          sortedBy: "Publisher",
        };
      } else if (state.sortedBy === "Publisher") {
        let newSort = [...state.booths];
        newSort.sort((a, b) => {
          const locA = a.rowLocationNum;
          const locB = b.rowLocationNum;
          if (locA < locB) {
            return -1;
          }
          if (locA > locB) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          booths: newSort,
          sortedBy: "Location",
        };
      }
    },
  },
});

export const {
  setAllBooths,
  setIsBoothSelected,
  setIsBoothVisited,
  setSortedBy,
} = allBoothsSlice.actions;

export default allBoothsSlice.reducer;
