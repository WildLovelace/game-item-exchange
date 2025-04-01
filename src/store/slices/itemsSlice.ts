import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getItems, getItemById, getUserItems } from '../../api/items'
import { Item } from '../../types/item'

interface ItemsState {
    items: Item[]
    currentItem: Item | null
    userItems: Item[]
    loading: boolean
    error: string | null
}

const initialState: ItemsState = {
    items: [],
    currentItem: null,
    userItems: [],
    loading: false,
    error: null,
}

interface FilterParams {
    game?: string
    category?: string
    minPrice?: number
    maxPrice?: number
}

export const createItem = createAsyncThunk(
    'items/create',
    async (itemData: FormData) => {
        return 0;
    }
)

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (filters?: FilterParams) => {
        const response = await getItems(filters)
        return response.data
    }
)

export const fetchItemById = createAsyncThunk(
    'items/fetchItemById',
    async (id: string) => {
        const response = await getItemById(id)
        return response.data
    }
)

export const fetchUserItems = createAsyncThunk(
    'items/fetchUserItems',
    async (userId: string) => {
        const response = await getUserItems(userId)
        return response.data
    }
)

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Загрузка всех товаров
            .addCase(fetchItems.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch items'
            })

            // Загрузка конкретного товара
            .addCase(fetchItemById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.currentItem = action.payload
                state.loading = false
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch item'
            })

            // Загрузка товаров пользователя
            .addCase(fetchUserItems.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserItems.fulfilled, (state, action) => {
                state.userItems = action.payload
                state.loading = false
            })
            .addCase(fetchUserItems.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch user items'
            })
    },
})

export default itemsSlice.reducer