import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface Products {
    id: number;
}

interface CartItems {
    products: Products,
    qty: number;
}

interface CartState {
    cart: CartItems[]
}

const initialState: CartState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToCart: (state, payload: PayloadAction<CartItems>) => {
            state.cart = []
        },
    },
})


export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;