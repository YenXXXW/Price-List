import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  createCategory: boolean;
  UpdateCategoryId: string;
};

const initialState: InitialState = {
  createCategory: false,
  UpdateCategoryId: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory: (state) => {
      state.createCategory = true;
    },
    cancelCreateCategory: (state) => {
      state.createCategory = false;
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.UpdateCategoryId = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { createCategory, cancelCreateCategory, updateCategory } =
  categoriesSlice.actions;
