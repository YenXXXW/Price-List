import {
  AddProductBodyType,
  ProductsResponse,
  UpdateProductType,
} from "../types";
import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Array<ProductsResponse>, string>({
      query: (categotyId) => ({
        url: `/api/products/${categotyId}`,
        credentials: "include",
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Array<ProductsResponse>, AddProductBodyType>({
      query: (createProductBody) => ({
        url: "/api/products",
        method: "POST",
        body: createProductBody,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<ProductsResponse, UpdateProductType>({
      query: (updatedPoduct) => ({
        url: "/api/products/" + `${updatedPoduct.productId}`,
        method: "PATCH",
        body: {
          categoryId: updatedPoduct.categoryId,
          productName: updatedPoduct.productName,
          price: updatedPoduct.price,
        },
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation<void, string>({
      query: (productId) => ({
        url: "/api/products/" + `${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
