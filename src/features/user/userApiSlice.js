import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCurrency: build.mutation({}),
    getUser: build.query({
      query: () => {
        return {
          url: `/api/user/user-info/review`,
        };
      },
    }),
    getAllUser: build.query({
      query: () => {
        return {
          url: `/api/admin/all-users/review`,
          method: "GET",
        };
      },
    }),
    getUserWallet: build.query({
      query: () => {
        return {
          url: `api/user/wallet/review`,
          method: "GET",
        };
      },
    }),
    patchUserInfo: build.mutation({
      query: (initialPost) => ({
        url: `api/user/user-info/update`,
        method: "PATCH",
        body: {
          fullname: initialPost.fullname,
          image: initialPost.image,
        },
      }),
    }),
    //--------------------------------------
    postSignUp: build.mutation({
      query: (initialPost) => ({
        url: `api/auth/signup`,
        method: "POST",
        body: {
          fullname: initialPost.fullname,
          email: initialPost.email,
          password: initialPost.password,
        },
      }),
    }),
    postForgotPassword: build.mutation({
      query: (initialPost) => ({
        url: `api/auth/forgot-password`,
        method: "POST",
        body: {
          email: initialPost.email,
        },
      }),
    }),
    patchNewPassword: build.mutation({
      query: (initialPost) => ({
        url: `/api/auth/reset-password/${initialPost.email}`,
        method: "PATCH",
        body: {
          newpassword: initialPost.newpassword,
        },
      }),
    }),
    //--------------------------------------
    patchUserByAdmin: build.mutation({
      query: (initialPost) => ({
        url: `/api/admin/user-management/update`,
        method: "PATCH",
        body: {
          email: initialPost.email,
          fullname: initialPost.fullname,
        },
      }),
    }),
    deleteUserByAdmin: build.mutation({
      query: (initialPost) => ({
        url: `/api/admin/user-management/delete`,
        method: "DELETE",
        body: {
          email: initialPost.email,
        },
      }),
    }),
    //--------------------------------------
    getUserFundingRequest: build.query({
      query: () => {
        return {
          url: `api/user/request/review/funding`,
          method: "GET",
        };
      },
    }),
    getUserSpotRequest: build.query({
      query: () => {
        return {
          url: `api/user/request/review/spot`,
          method: "GET",
        };
      },
    }),
    getUserOwnRequest: build.query({
      query: () => {
        return {
          url: `api/user/request-p2p/review/own`,
          method: "GET",
        };
      },
    }),
    getP2PSellRequest: build.query({
      query: () => {
        return {
          url: `api/user/request-p2p/review/sell`,
          method: "GET",
        };
      },
    }),
    getP2PBuyRequest: build.query({
      query: () => {
        return {
          url: `api/user/request-p2p/review/buy`,
          method: "GET",
        };
      },
    }),
    getPortfolio: build.query({
      query: () => {
        return {
          url: `api/user/portfolio/review`,
          method: "GET",
        };
      },
    }),
    getApprovedSpotRequest: build.query({
      query: () => {
        return {
          url: `api/user/approved-request/review/spot`,
          method: "GET",
        };
      },
    }),
    getApprovedP2PRequest: build.query({
      query: () => {
        return {
          url: `api/user/approved-request/review/p2pReq`,
          method: "GET",
        };
      },
    }),
    //Spot or Funding
    postClientRequest: build.mutation({
      query: (initialPost) => ({
        url: `api/user/request/create/${initialPost.reqType}`,
        method: "POST",
        body: { ...initialPost },
      }),
    }),
    //
    post2P2Request: build.mutation({
      query: (initialPost) => ({
        url: "api/user/request-p2p/create",
        method: "POST",
        body: { ...initialPost },
      }),
    }),
    post2P2ClientRequest: build.mutation({
      query: (initialPost) => ({
        url: "api/user/request-p2p/create/client-request",
        method: "POST",
        body: { ...initialPost },
      }),
    }),
    patch2P2Response: build.mutation({
      query: (initialPost) => ({
        url: "api/user/request-p2p/update",
        method: "PATCH",
        body: { ...initialPost },
      }),
    }),
    patchAdminResponse: build.mutation({
      query: (initialPost) => ({
        url: `api/admin/response/update/${initialPost.type}`,
        method: "PATCH",
        body: {
          requestID: initialPost.requestID,
          status: initialPost.status,
        },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  usePatchUserInfoMutation,
  //
  usePostSignUpMutation,
  usePostForgotPasswordMutation,
  usePatchNewPasswordMutation,
  //
  // Admin
  usePatchUserByAdminMutation,
  useDeleteUserByAdminMutation,
  //
  useGetUserWalletQuery,
  useGetUserFundingRequestQuery,
  useGetUserSpotRequestQuery,
  useGetUserOwnRequestQuery,
  useGetP2PSellRequestQuery,
  useGetP2PBuyRequestQuery,
  useGetPortfolioQuery,
  useGetApprovedSpotRequestQuery,
  useGetApprovedP2PRequestQuery,
  //User
  usePostClientRequestMutation,
  usePatchAdminResponseMutation,
  usePost2P2RequestMutation,
  usePost2P2ClientRequestMutation,
  usePatch2P2ResponseMutation,
  //
} = userApiSlice;
