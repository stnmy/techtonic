import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithErrorHandling } from "../../app/api/baseApi"
import { Brand } from "../../app/models/productManagement"
import { Filter } from "../../app/models/product";
import { CreateProductSchema, UpdateProductSchema, UpdateProductViewSchema } from "../../lib/schemas/CreateProductSchema";

export const managementApi = createApi({
    reducerPath: 'managementApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchBrands: builder.query<Brand[], void>({
            query: () => ({
                url: "/productmanagement/brands", // Adjust this path if needed
                method: "GET",
            }),
        }),
        fetchFilters: builder.query<Filter[], void>({
            query: () => ({
                url: "/productmanagement/filters",
                method: "GET",
            }),
        }),
        createProduct: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: "/productmanagement/create",
                method: "POST",
                body: formData,
            }),
        }),
        getProductById: builder.query<UpdateProductViewSchema, number>({
            query: (id) => `/productmanagement/update/${id}`,
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
    })
})

export const { useFetchBrandsQuery,
    useFetchFiltersQuery,
    useCreateProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation } = managementApi;