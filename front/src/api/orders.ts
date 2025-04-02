import axios from 'axios'
import { Order, OrderItem } from '../types/order'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const createOrder = async (orderData: {
    items: OrderItem[]
    total: number
    paymentMethod?: string
}) => {
    return await axios.post<Order>(`${API_URL}/orders`, orderData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const getUserOrders = async (userId: string) => {
    return await axios.get<Order[]>(`${API_URL}/users/${userId}/orders`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const getOrderById = async (orderId: string) => {
    return await axios.get<Order>(`${API_URL}/orders/${orderId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}