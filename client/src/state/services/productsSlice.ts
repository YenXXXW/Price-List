import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductSliceInitialState = {
  categoryId: string;
  productId: string;
};

const initialState: ProductSliceInitialState = {
  categoryId: "",
  productId: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    categoryIdforProductSelected: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    updateOrDeleteProduct: (state, action: PayloadAction<string>) => {
      state.productId = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const { categoryIdforProductSelected, updateOrDeleteProduct } =
  productsSlice.actions;
