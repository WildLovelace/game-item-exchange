export interface OrderItem {
    itemId: string
    title: string
    price: number
    quantity: number
    image?: string
}

export interface Order {
    id: string
    userId: string
    items: OrderItem[]
    total: number
    status: 'pending' | 'completed' | 'cancelled'
    createdAt: string
    updatedAt: string
    paymentMethod?: 'card' | 'crypto' | 'balance'
}