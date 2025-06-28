import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
    reducer: {
        shoppingCart: persistedReducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch