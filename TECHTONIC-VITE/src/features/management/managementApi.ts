import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Brand, UnansweredQuestionDto } from "../../app/models/productManagement";
import {
    AdminFilter,
    AdminProductCardPageResult,
    AdminProductReviewResponse,
    Filter,
    Value,
} from "../../app/models/product";
import {
    UpdateProductViewSchema,
} from "../../lib/schemas/CreateProductSchema";
import { DashboardResponse } from "../../app/models/dashboardManagement";
import { ProductBrowserParams } from "../../app/models/productBrowerParams";
import { OrderPageResultDto } from "../../app/models/order";
import { AdminOrderBrowserParams } from "../../app/models/adminOrderBrowserParams";
import { AdminProductReviewBrowserParams } from "../../app/models/adminProductReviewBrowserParams";
import { AdminProductReview } from "../../app/models/product";

export const managementApi = createApi({
    reducerPath: "managementApi",
    baseQuery: baseQueryWithErrorHandling,

    keepUnusedDataFor: 0,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    tagTypes: ["AdminOrders", "ProductReviews", "Brands", "Filters"],
    endpoints: (builder) => ({
        fetchBrands: builder.query<Brand[], void>({
            query: () => ({
                url: "/productmanagement/brands",
                method: "GET",
            }),
        }),

        fetchFilters: builder.query<AdminFilter[], void>({
            query: () => ({
                url: "/productmanagement/filters",
                method: "GET",
            }),
            providesTags: ["Filters"],
        }),

        createProduct: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: "/productmanagement/create",
                method: "POST",
                body: formData,
            }),
        }),

        getProductById: builder.query<UpdateProductViewSchema, number>({
            query: (id) => ({
                url: `/productmanagement/update/${id}`,
                method: "GET",
            }),
        }),

        updateProduct: builder.mutation<void, FormData>({
            query: (formData) => {
                const id = formData.get("Id");
                return {
                    url: `/productmanagement/update/${id}`,
                    method: "PUT",
                    body: formData,
                };
            },
        }),

        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/productmanagement/${id}`,
                method: "DELETE",
            }),
        }),

        getDashboardSummary: builder.query<DashboardResponse, void>({
            query: () => ({
                url: "/productmanagement/dashboard-summary",
                method: "GET",
            }),
        }),

        fetchAdminProducts: builder.query<AdminProductCardPageResult, ProductBrowserParams>({
            query: (params) => {
                const baseParams: Record<string, any> = {
                    sortBy: params.orderBy,
                    pageNumber: params.pageNumber,
                    pageSize: params.pageSize,
                };

                if (params.filters?.length) {
                    baseParams.filters = params.filters.join(",");
                }
                if (params.search?.trim()) {
                    baseParams.search = params.search;
                }
                if (params.priceRange?.trim()) {
                    baseParams.priceRange = params.priceRange;
                }

                return {
                    url: "productmanagement",
                    params: baseParams,
                };
            },
        }),

        fetchAdminOrders: builder.query<OrderPageResultDto, AdminOrderBrowserParams>({
            query: (params) => {
                const cleanedParams = Object.fromEntries(
                    Object.entries(params).filter(([_, value]) => value !== undefined)
                );
                return {
                    url: "/orderManagement",
                    params: cleanedParams,
                };
            },
            providesTags: ["AdminOrders"],
        }),

        updateOrderStatus: builder.mutation<void, { orderNumber: number; status: string }>({
            query: ({ orderNumber, status }) => ({
                url: `/orderManagement/${orderNumber}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["AdminOrders"],
        }),

        fetchUnansweredQuestions: builder.query<UnansweredQuestionDto[], void>({
            query: () => ({
                url: "productmanagement/questions",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
            }),
        }),

        answerProductQuestion: builder.mutation<void, { questionId: number; answer: string }>({
            query: ({ questionId, answer }) => ({
                url: `productmanagement/questions/${questionId}`,
                method: "PUT",
                body: JSON.stringify(answer),
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },
            }),
        }),

        fetchProductReviews: builder.query<AdminProductReviewResponse, AdminProductReviewBrowserParams>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.searchReviewerName) {
                    queryParams.append("ReviewerName", params.searchReviewerName);
                }
                if (params.productId) {
                    queryParams.append("productId", params.productId.toString());
                }
                if (params.orderBy) {
                    queryParams.append("orderBy", params.orderBy);
                }
                return `/productmanagement/reviews?${queryParams.toString()}`;
            },
            providesTags: ["ProductReviews"],
        }),

        deleteReview: builder.mutation<void, number>({
            query: (reviewId) => ({
                url: `/productmanagement/reviews/${reviewId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ProductReviews"],
        }),

        createBrand: builder.mutation<Brand, { name: string }>({
            query: (data) => ({
                url: "/productmanagement/brands",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Brands"],
        }),

        createFilter: builder.mutation<AdminFilter, { filterName: string }>({
            query: (data) => ({
                url: "/productmanagement/filters",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Filters"],
        }),

        addFilterValue: builder.mutation<Value, { filterId: number; value: string }>({
            query: ({ filterId, value }) => ({
                url: `/productmanagement/filters/${filterId}/values`,
                method: "POST",
                body: { value },
            }),
            invalidatesTags: ["Filters"],
        }),

        deleteFilterValue: builder.mutation<void, number>({
            query: (valueId) => ({
                url: `/productmanagement/filtervalues/${valueId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Filters"],
        }),

        deleteFilter: builder.mutation<void, number>({
            query: (filterId) => ({
                url: `/productmanagement/filters/${filterId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Filters"],
        }),

        getUsersByRole: builder.query<any[], { role: string; search?: string }>({
            query: ({ role, search }) => ({
                url: `/account/admin/users`,
                params: { role, search },
                method: "GET",
            }),
        }),

        updateUserRole: builder.mutation<void, { userId: string; newRole: string }>({
            query: (body) => ({
                url: `/account/admin/update-role`,
                method: "POST",
                body,
            }),
        }),

        createAdminUser: builder.mutation<void, { email: string; password: string; role: string }>({
            query: (body) => ({
                url: `/account/admin-create`,
                method: "POST",
                body,
            }),
        }),

        deleteCustomerOnlyUser: builder.mutation<void, string>({
            query: (userId) => ({
                url: `/account/admin/delete-user/${userId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useFetchBrandsQuery,
    useFetchFiltersQuery,
    useCreateProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetDashboardSummaryQuery,
    useFetchAdminProductsQuery,
    useFetchAdminOrdersQuery,
    useUpdateOrderStatusMutation,
    useAnswerProductQuestionMutation,
    useFetchUnansweredQuestionsQuery,
    useFetchProductReviewsQuery,
    useDeleteReviewMutation,
    useCreateBrandMutation,
    useCreateFilterMutation,
    useAddFilterValueMutation,
    useDeleteFilterValueMutation,
    useDeleteFilterMutation,
    useGetUsersByRoleQuery,
    useUpdateUserRoleMutation,
    useCreateAdminUserMutation,
    useDeleteCustomerOnlyUserMutation,
} = managementApi;
