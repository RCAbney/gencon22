import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUserBooths: [],
  visitedUserBooths: [],
};

export const userBoothsSlice = createSlice({
  name: "userBooths",
  initialState,
  reducers: {
    addUserBooth: (state, action) => {
      return {
        ...state,
        allUserBooths: [...state.allUserBooths, action.payload],
      };
    },
    subtractUserBooth: (state, action) => {
      return {
        ...state,
        allUserBooths: [
          ...state.allUserBooths.filter(
            (booth) => booth.BGGId !== action.payload
          ),
        ],
      };
    },
  },
});

export const { addUserBooth, subtractUserBooth } = userBoothsSlice.actions;

export default userBoothsSlice.reducer;
