import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface FilterParams {
    game?: string
    category?: string
    minPrice?: number
    maxPrice?: number
}

export const getItems = async (filters?: FilterParams) => {
    const params = new URLSearchParams()

    if (filters?.game) params.append('game', filters.game)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())

    return await axios.get(`${API_URL}/items?${params.toString()}`)
}

export const getItemById = async (id: string) => {
    return await axios.get(`${API_URL}/items/${id}`)
}

export const getUserItems = async (userId: string) => {
    return await axios.get(`${API_URL}/users/${userId}/items`)
}

export const createItem = async (itemData: FormData) => {
    return await axios.post(`${API_URL}/items`, itemData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}