import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogInResponse } from "../types";

type InitialState = {
  authUser: null | LogInResponse;
};

const initialState: InitialState = {
  authUser: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userAuthed: (state, action: PayloadAction<LogInResponse>) => {
      state.authUser = action.payload;
    },
    userLogOut: (state) => {
      state.authUser = null;
    },
  },
});

export default authSlice.reducer;
export const { userAuthed, userLogOut } = authSlice.actions;
