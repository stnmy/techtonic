import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart } from "../../app/models/cart";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        fetchCart: builder.query<Cart, void>({
            query: () => 'cart',
            providesTags: ['Cart']
        }),
        addItemToCart: builder.mutation<Cart, { productId: number, quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `cart?productId=${productId}&quantity=${quantity}`,
                method: 'POST'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(cartApi.util.invalidateTags(['Cart']));
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteItemFromCart: builder.mutation<void, { productId: number, quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `cart?productId=${productId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(cartApi.util.invalidateTags(['Cart']));
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})
41
export const { useFetchCartQuery, useAddItemToCartMutation, useDeleteItemFromCartMutation } = cartApi