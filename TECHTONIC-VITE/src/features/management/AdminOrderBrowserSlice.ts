// src/features/management/AdminOrderBrowserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminOrderBrowserParams } from "../../app/models/adminOrderBrowserParams";

interface AdminOrderBrowserState extends AdminOrderBrowserParams {
    status?: string; // allow undefined, not null
    period?: string;
}

const initialState: AdminOrderBrowserState = {
    status: undefined,
    period: undefined,
    search: "",
    pageNumber: 1,
    pageSize: 10,
};

export const adminOrderBrowserSlice = createSlice({
    name: "adminOrderBrowserSlice",
    initialState,
    reducers: {
        setAdminOrderStatus(state, action: PayloadAction<string | undefined>) {
            state.status = action.payload;
            state.pageNumber = 1;
        },
        setAdminOrderPeriod(state, action: PayloadAction<string | undefined>) {
            state.period = action.payload;
            state.pageNumber = 1;
        },
        setAdminOrderSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.pageNumber = 1;
        },
        setAdminOrderPageNumber(state, action: PayloadAction<number>) {
            state.pageNumber = action.payload;
        },
        setAdminOrderPageSize(
            state,
            action: PayloadAction<{ pageNumber: number; pageSize: number }>
        ) {
            state.pageNumber = action.payload.pageNumber;
            state.pageSize = action.payload.pageSize;
        },
        resetAdminOrderParams() {
            return initialState;
        },
    },
});

export const {
    setAdminOrderStatus,
    setAdminOrderPeriod,
    setAdminOrderSearch,
    setAdminOrderPageNumber,
    setAdminOrderPageSize,
    resetAdminOrderParams,
} = adminOrderBrowserSlice.actions;

export default adminOrderBrowserSlice.reducer;
