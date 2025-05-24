export type Cart = {
    cartCookieId: string
    cartItems: CartItem[]
}

export type CartItem = {
    productId: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    category: string
    quantity: number
}
