import { configureStore } from "@reduxjs/toolkit";
import { productBrowserApi } from "../../features/productBrowser/productBrowserApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../error/errorApi";
import { cartApi } from "../../features/cart/cartApi";
import { productBrowserSlice } from "../../features/productBrowser/productBrowserSlice";
import { accountApi } from "../../features/account/accountApi";
import { orderApi } from "../../features/order/orderApi";
import { managementApi } from "../../features/management/managementApi";
import { adminProductBrowserSlice } from "../../features/management/AdminProductBrowserSlice";
import { adminOrderBrowserSlice } from "../../features/management/AdminOrderBrowserSlice";
// Corrected import for the admin product review browser slice
import { adminProductReviewBrowserSlice } from "../../features/management/AdminProductReviewBrowserSlice";

export const store = configureStore({
    reducer: {
        [productBrowserApi.reducerPath]: productBrowserApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [managementApi.reducerPath]: managementApi.reducer,
        ui: uiSlice.reducer,
        productBrowser: productBrowserSlice.reducer,
        adminProductBrowserSlice: adminProductBrowserSlice.reducer,
        adminOrderBrowserSlice: adminOrderBrowserSlice.reducer,
        // Corrected reducer entry
        adminProductReviewBrowserSlice: adminProductReviewBrowserSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productBrowserApi.middleware,
            errorApi.middleware,
            cartApi.middleware,
            accountApi.middleware,
            orderApi.middleware,
            managementApi.middleware,
        )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;