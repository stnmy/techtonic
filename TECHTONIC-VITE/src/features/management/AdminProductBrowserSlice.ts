import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductBrowserParams } from "../../app/models/productBrowerParams";

const initialState: ProductBrowserParams = {
    filters: [],
    orderBy: 'createdAt', // or 'name' or default admin sort
    pageNumber: 1,
    pageSize: 10,
    search: "",
    priceRange: ""
}

export const adminProductBrowserSlice = createSlice({
    name: 'adminProductBrowserSlice',
    initialState,
    reducers: {
        setAdminFilters(state, action: PayloadAction<number[]>) {
            state.filters = action.payload;
        },
        setAdminOrderBy(state, action: PayloadAction<string>) {
            state.orderBy = action.payload;
        },
        setAdminPageNumber(state, action: PayloadAction<number>) {
            state.pageNumber = action.payload;
        },
        setAdminPageSize(state, action: PayloadAction<{ pageNumber: number; pageSize: number }>) {
            state.pageNumber = action.payload.pageNumber;
            state.pageSize = action.payload.pageSize;
        },
        resetAdminParams() {
            return initialState;
        },
        resetAdminFilters(state) {
            state.filters = [];
        },
        setAdminPriceRange(state, action: PayloadAction<string>) {
            state.priceRange = action.payload;
        },
        setAdminSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.pageNumber = 1;
        }
    }
});

export const {
    setAdminFilters,
    setAdminOrderBy,
    setAdminPageNumber,
    setAdminPageSize,
    resetAdminFilters,
    resetAdminParams,
    setAdminPriceRange,
    setAdminSearch
} = adminProductBrowserSlice.actions;
