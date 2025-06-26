import { createApi } from "@reduxjs/toolkit/query/react";
import { ProductCardPageResult, ProductCardType, ProductDetailsApiResponse, ProductReviewDto, TotalFilterDto } from "../../app/models/product";
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
        }),
        askQuestion: builder.mutation<void, { productId: number; question: string }>({
            query: ({ productId, question }) => ({
                url: `products/question/${productId}`,
                method: "POST",
                body: { question },
            }),
        }),
        submitProductReview: builder.mutation<void, { productId: number; review: ProductReviewDto }>({
            query: ({ productId, review }) => ({
                url: `products/review/${productId}`,
                method: "POST",
                body: review,
            }),
        }),
        fetchTopDiscountedProducts: builder.query<ProductCardType[], number | void>({
            query: (count = 4) => `products/TopDiscounted?count=${count}`,
        }),
        fetchAllDiscountedProducts: builder.query<ProductCardType[], void>({
            query: () => `products/Discounted`,
        }),
        fetchMostVisitedProducts: builder.query<ProductCardType[], void>({
            query: () => {
                const params: Record<string, any> = {
                    period: 'Week',
                    count: 4
                };
                return {
                    url: 'products/MostVisited',
                    params: params,
                };
            },
        }),

    })
})

export const {
    useFetchProductsQuery,
    useFetchProductDetailsQuery,
    useFetchFiltersQuery,
    useAskQuestionMutation,
    useSubmitProductReviewMutation,
    useFetchTopDiscountedProductsQuery,
    useFetchAllDiscountedProductsQuery,
    useFetchMostVisitedProductsQuery } = productBrowserApi