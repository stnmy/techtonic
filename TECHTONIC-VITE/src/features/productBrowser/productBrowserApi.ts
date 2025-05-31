import { createApi } from "@reduxjs/toolkit/query/react";
import { ProductCardPageResult, ProductDetailsApiResponse, TotalFilterDto } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { ProductBrowserParams } from "../../app/models/productBrowerParams";

export const productBrowserApi = createApi({
    reducerPath: 'productBrowserApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<ProductCardPageResult, ProductBrowserParams>({
            query: (params) => {
                const baseParams: Record<string, any> = {
                    orderBy: params.orderBy,
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize,
                };

                if (params.filters && params.filters.length > 0) {
                    baseParams.filters = params.filters.join(",");
                }
                if (params.search?.trim()) {
                    baseParams.search = params.search;
                }
                if (params.priceRange?.trim()) {
                    baseParams.priceRange = params.priceRange;
                }

                return {
                    url: 'products',
                    params: baseParams,
                };
            }
        }),
        fetchProductDetails: builder.query<ProductDetailsApiResponse, number>({
            query: (productId) => `products/${productId}`
        }),
        fetchFilters: builder.query<TotalFilterDto, void>({
            query: () => ({ url: 'products/filters' })
        })
    })
})

export const { useFetchProductsQuery, useFetchProductDetailsQuery, useFetchFiltersQuery } = productBrowserApi