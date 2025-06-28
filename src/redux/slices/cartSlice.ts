import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface Product {
    id: number;
    name: string;
    primary_image: string;
    description: string;
    is_sale: boolean;
    sale_price: number;
    price: number;
    slug?: string;
}

interface CartItems {
    product: Product,
    qty: number;
}

interface CartState {
    cart: CartItems[]
}

const initialState: CartState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItems>) => {
            const { product, qty } = action.payload;
            state.cart = [...state.cart, { product, qty }]
            // console.log(state.cart)
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(p => p.product.id !== action.payload)
        }
    },
})


export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;