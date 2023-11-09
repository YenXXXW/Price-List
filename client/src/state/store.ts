import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/state/services/categoriesSlice";
import { baseApi } from "./api/baseApi";
import authReducer from "@/state/services/authSlice";
import productsReducer from "@/state/services/productsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    category: categoryReducer,
    authentication: authReducer,
    products: productsReducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
