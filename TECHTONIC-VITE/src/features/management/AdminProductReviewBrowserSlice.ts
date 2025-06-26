// src/features/management/AdminProductReviewBrowserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminProductReviewBrowserParams } from "../../app/models/adminProductReviewBrowserParams";

interface AdminProductReviewBrowserState extends AdminProductReviewBrowserParams { }

const initialState: AdminProductReviewBrowserState = {
    searchReviewerName: undefined,
    productId: undefined,
    orderBy: "latest", // Default to 'latest'
};

// Renamed slice export for consistency
export const adminProductReviewBrowserSlice = createSlice({
    name: "adminProductReviewBrowserSlice", // Updated name property to match
    initialState,
    reducers: {
        setSearchReviewerName(state, action: PayloadAction<string | undefined>) {
            state.searchReviewerName = action.payload;
        },
        setProductId(state, action: PayloadAction<string | undefined>) {
            state.productId = action.payload;
        },
        setOrderBy(state, action: PayloadAction<string | undefined>) {
            state.orderBy = action.payload;
        },
        resetProductReviewParams(state) {
            return { ...initialState };
        },
    },
});

export const {
    setSearchReviewerName,
    setProductId,
    setOrderBy,
    resetProductReviewParams,
} = adminProductReviewBrowserSlice.actions; // Corrected action destructuring

export default adminProductReviewBrowserSlice.reducer; // Corrected default export