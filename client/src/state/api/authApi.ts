import { LogInBody, LogInResponse, SignUpBody } from "../types";
import { baseApi } from "./baseApi";

type GetAuthUsers = {
  _id: string;
  username: string;
  email: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAuthUsers: build.query<GetAuthUsers, void>({
      query: () => ({
        url: "/api/users",
        credentials: "include",
      }),
      providesTags: ["Auth"],
    }),
    SignUp: build.mutation<LogInResponse, SignUpBody>({
      query: (SignUpBody) => ({
        credentials: "include",
        method: "POST",
        url: "/api/users/signup",
        body: SignUpBody,
      }),
      invalidatesTags: ["Auth", "Categories"],
    }),
    LogIn: build.mutation<LogInResponse, LogInBody>({
      query: (LogInBody) => ({
        credentials: "include",
        method: "POST",
        url: "/api/users/login",
        body: LogInBody,
      }),
      invalidatesTags: ["Auth", "Categories"],
    }),
    LogOut: build.mutation<void, void>({
      query: () => ({
        credentials: "include",
        method: "POST",
        url: "/api/users/logout",
      }),
      invalidatesTags: ["Auth", "Categories"],
    }),
  }),
});

export const {
  useLogInMutation,
  useLogOutMutation,
  useGetAuthUsersQuery,
  useSignUpMutation,
} = authApi;
