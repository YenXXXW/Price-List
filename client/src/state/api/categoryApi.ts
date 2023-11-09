import { CategoryResponse, UpdateCategory, UserUnautheticated } from "../types";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<Array<CategoryResponse>, void>({
      query: () => ({
        url: "api/categories/",
        credentials: "include",
      }),
      providesTags: ["Categories"],
    }),
    addCategory: build.mutation<CategoryResponse, string>({
      query: (category) => ({
        url: "api/categories/",
        credentials: "include",
        method: "POST",
        body: {
          name: category,
        },
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: build.mutation<void, UpdateCategory>({
      query: (category) => ({
        url: `api/categories/${category.categoryId}`,
        credentials: "include",
        method: "PATCH",
        body: {
          name: category.name,
        },
      }),
      invalidatesTags: ["Categories"],
    }),
    deletecategory: build.mutation<void, string>({
      query: (categoryId) => ({
        url: `api/categories/${categoryId}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeletecategoryMutation,
} = categoryApi;
