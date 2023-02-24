import { createSlice } from "@reduxjs/toolkit";

export const actionsSlice = createSlice({
  name: "marketsActions",
  initialState: {
    vsCurrency: "usd",
    category: "all",
    totalPages: 0,
    perPage: 100,
    page: 1,
    order: "market_cap_desc",
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.vsCurrency = action.payload;
      localStorage.removeItem("markets");
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
      localStorage.removeItem("markets");
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { changeCurrency, changeCategory, changePage } =
  actionsSlice.actions;

export const selectCurrency = (state) => state.marketsActions.vsCurrency;
export const selectCategory = (state) => state.marketsActions.category;
export const selectPage = (state) => state.marketsActions.page;
export const selectPerPage = (state) => state.marketsActions.perPage;
export const selectTotalPages = (state) => state.marketsActions.totalPages;
export const selectOrder = (state) => state.marketsActions.order;

export default actionsSlice.reducer;
