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
  },
});

export const { addUserBooth } = userBoothsSlice.actions;

export default userBoothsSlice.reducer;
