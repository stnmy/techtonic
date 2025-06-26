import { PaginationData } from "./product";

export type PaymentMethod =
    | "Card"
    | "CashOnDelivery"
    | "Bkash"
    | "Nagad"
    | "Rocket";

export interface CreateOrderDto {
    shippingAddress: ShippingAddress
    isCustomShippingAddress: boolean
    paymentMethod: PaymentMethod
}

export interface ShippingAddress {
    line1: string
    city: string
    postalCode: string
}

export interface OrderCardDto {
    orderNumber: number
    orderDate: string
    subtotal: number
    paymentStatus: string
    status: string
    userEmail: string
}

export interface OrderPageResultDto {
    orders: OrderCardDto[];
    paginationData: PaginationData;
}

export interface OrderDetailsDto {
    orderNumber: number
    userEmail: string
    orderDate: string
    shippingAddress: string
    subtotal: number
    paymentMethod: string
    paymentStatus: string
    orderItems: OrderItemDto[]
}

export interface OrderItemDto {
    productId: number
    productName: string
    productImageUrl: string
    quantity: number
    unitPrice: number
    totalPrice: number
}