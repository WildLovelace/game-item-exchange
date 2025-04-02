import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import itemsReducer from './slices/itemsSlice'
import cartReducer from './slices/cartSlice'
import ordersReducer from './slices/ordersSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsReducer,
        cart: cartReducer,
        orders: ordersReducer,
    },
})

// Типы для работы с хранилищем
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Хуки для типизированного использования
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector