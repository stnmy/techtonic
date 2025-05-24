import { createApi } from "@reduxjs/toolkit/query/react";
import { ProductCardType, ProductDetailsApiResponse} from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const productBrowserApi = createApi({
    reducerPath: 'productBrowserApi', 
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<ProductCardType[],void>({
            query: () => ({url:'products'})
        }),
        fetchProductDetails: builder.query<ProductDetailsApiResponse,number>({
            query:(productId) => `products/${productId}`
        })
    })
})

export const {useFetchProductsQuery, useFetchProductDetailsQuery} = productBrowserApi