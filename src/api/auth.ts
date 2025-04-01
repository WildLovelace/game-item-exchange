import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface LoginData {
    email: string
    password: string
}

export const login = async (data: LoginData) => {
    const response = await axios.post(`${API_URL}/auth/login`, data)
    return response.data
}

export const register = async (userData: {
    username: string
    email: string
    password: string
}) => {
    return await axios.post(`${API_URL}/auth/register`, userData)
}

export const logout = async () => {
    // Здесь может быть вызов API для logout, если он нужен на сервере
}

export const checkAuth = async () => {
    const response = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
    })
    return response.data
}