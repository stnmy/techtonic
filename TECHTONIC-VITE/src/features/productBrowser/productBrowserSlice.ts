import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductBrowserParams } from "../../app/models/productBrowerParams";

const initialState: ProductBrowserParams = {
    filters: [],
    orderBy: 'name',
    pageNumber: 1,
    pageSize: 20,
    search: "",
    priceRange: ""
}

export const productBrowserSlice = createSlice({
    name: 'productBrowserSlice',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<number[]>) {
            state.filters = action.payload;
        },
        setOrderBy(state, action: PayloadAction<string>) {
            state.orderBy = action.payload;
        },
        setPageNumber(state, action: PayloadAction<number>) {
            state.pageNumber = action.payload;
        },
        setPageSize(state, action: PayloadAction<{ pageNumber: number; pageSize: number }>) {
            state.pageNumber = action.payload.pageNumber;
            state.pageSize = action.payload.pageSize;
        },
        resetParams() {
            return initialState;
        },
        resetFilters(state) {
            state.filters = []
        },
        setPriceRange(state, action: PayloadAction<string>) {
            state.priceRange = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.pageNumber = 1;
        }
    }
});

export const {
    setFilters,
    setOrderBy,
    setPageNumber,
    setPageSize,
    resetFilters,
    setPriceRange,
    setSearch }
    = productBrowserSlice.actions;