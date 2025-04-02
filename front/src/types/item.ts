export interface Item {
    id: string
    title: string
    description: string
    price: number
    game: string
    category: string
    sellerId: string
    sellerName?: string
    images: string[]
    createdAt: string
    updatedAt: string
    rating?: number
    reviewsCount?: number
}