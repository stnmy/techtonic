import { configureStore } from "@reduxjs/toolkit";
import { productBrowserApi } from "../../features/productBrowser/productBrowserApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../error/errorApi";
import { cartApi } from "../../features/cart/cartApi";
import { productBrowserSlice } from "../../features/productBrowser/productBrowserSlice";

export const store = configureStore({
    reducer: {
        [productBrowserApi.reducerPath]: productBrowserApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        ui: uiSlice.reducer,
        productBrowser: productBrowserSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productBrowserApi.middleware,
            errorApi.middleware,
            cartApi.middleware
        )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
