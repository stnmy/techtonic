import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { CreateOrderDto, OrderCardDto, OrderDetailsDto } from "../../app/models/order";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchOrders: builder.query<OrderCardDto[], void>({
            query: () => 'orders'
        }),
        fetchOrderDetails: builder.query<OrderDetailsDto, number>({
            query: (id) => ({
                url: `orders/${id}`
            })
        }),
        createOrder: builder.mutation<OrderDetailsDto, CreateOrderDto>({
            query: (createOrder) => ({
                url: 'orders',
                method: 'POST',
                body: createOrder
            })
        })

    })
})

export const { useFetchOrdersQuery, useFetchOrderDetailsQuery, useCreateOrderMutation } = orderApi;