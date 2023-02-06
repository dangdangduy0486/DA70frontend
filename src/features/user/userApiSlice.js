import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
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
          url: `api/user/request/review/own`,
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
  }),
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useGetUserWalletQuery,
  useGetUserFundingRequestQuery,
  useGetUserSpotRequestQuery,
  useGetUserOwnRequestQuery,
  useGetP2PSellRequestQuery,
  useGetP2PBuyRequestQuery,
  useGetPortfolioQuery,
  useGetApprovedSpotRequestQuery,
  useGetApprovedP2PRequestQuery,
} = userApiSlice;
