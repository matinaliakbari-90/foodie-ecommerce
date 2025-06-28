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
    quantity: number;
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
        },

        increment: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.map(p => p.product.id === action.payload ? { ...p, qty: p.qty + 1 } : p)
        },

        decrement: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.map(p => p.product.id === action.payload ? { ...p, qty: p.qty - 1 } : p)
        },

        clearCart: (state) => {
            state.cart = [];
        }
    },
})


export const { addToCart, removeFromCart, increment, decrement, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;