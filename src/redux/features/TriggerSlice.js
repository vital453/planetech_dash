import { createSlice } from "@reduxjs/toolkit";

export const triggerSlice = createSlice({
  name: "trigger",
  initialState: {
    trigg: false,
    user: [],
  },

  reducers: {
    settrigg: (state, { payload }) => {
      state.trigg = payload;
    },
    setCredentials: (state, { payload }) => {
      //    const { userId, accessToken, auth } = payload;
      state.user = payload;
      //    state.token = accessToken;
      //    state.auth = auth;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    recupUser: (state, { payload }) => {
      if (payload) {
        state.user = payload;
      } else {
        state.user = [];
      }
    },
  },
});

export const { settrigg, setCredentials, recupUser } = triggerSlice.actions;
export default triggerSlice.reducer;
