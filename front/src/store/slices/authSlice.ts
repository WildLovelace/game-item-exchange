import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface User {
    id: string
    username: string
    email: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = 0
            return response
        } catch (error) {
            return rejectWithValue(0)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true
            state.error = null
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload
            state.isAuthenticated = true
            state.loading = false
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.loading = false
        },
        logout(state) {
            state.user = null
            state.isAuthenticated = false
        },
        registerStart(state) {
            state.loading = true
            state.error = null
        },
        registerSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload
            state.isAuthenticated = true
            state.loading = false
            state.error = null
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.error = action.payload
            state.loading = false
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure,
} = authSlice.actions

export default authSlice.reducer