
import { createSlice } from "@reduxjs/toolkit";

export const triggerSlice = createSlice({
  name: "trigger",
  initialState: {
    trigg: false,
  },

  reducers: {
    settrigg: (state, { payload }) => {
      state.trigg = payload;
    },
  },
});

export const { settrigg } = triggerSlice.actions;
export default triggerSlice.reducer;
