import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, getUserOrders, getOrderById } from '../../api/orders'
import { Order, OrderItem } from '../../types/order'

interface OrdersState {
    orders: Order[]
    currentOrder: Order | null
    loading: boolean
    error: string | null
}

const initialState: OrdersState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
}

export const createNewOrder = createAsyncThunk(
    'orders/create',
    async (orderData: { items: OrderItem[]; total: number }, { rejectWithValue }) => {
        try {
            const response = await createOrder(orderData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при создании заказа')
        }
    }
)

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getUserOrders(userId)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке заказов')
        }
    }
)

export const fetchOrderById = createAsyncThunk(
    'orders/fetchById',
    async (orderId: string, { rejectWithValue }) => {
        try {
            const response = await getOrderById(orderId)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при загрузке заказа')
        }
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Создание заказа
            .addCase(createNewOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.orders.unshift(action.payload)
                state.currentOrder = action.payload
                state.loading = false
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // Загрузка заказов пользователя
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.orders = action.payload
                state.loading = false
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // Загрузка конкретного заказа
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.currentOrder = action.payload
                state.loading = false
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { clearCurrentOrder } = ordersSlice.actions
export default ordersSlice.reducer