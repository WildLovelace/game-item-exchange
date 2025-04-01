import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchItemById } from '../../store/slices/itemsSlice'
import { addToCart } from '../../store/slices/cartSlice'
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    Divider,
    Chip,
    Rating,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'


const ItemDetail = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { currentItem, loading, error } = useAppSelector((state) => state.items)

    useEffect(() => {
        if (id) {
            dispatch(fetchItemById(id))
        }
    }, [id, dispatch])

    if (loading) return <Typography>Загрузка...</Typography>
    if (error) return <Typography color="error">{error}</Typography>
    if (!currentItem) return <Typography>Товар не найден</Typography>

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="500"
                        image={currentItem.images[0] || '/placeholder-item.jpg'}
                        alt={currentItem.title}
                    />
                </Card>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h3" gutterBottom>
                    {currentItem.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={4.5} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        (24 отзыва)
                    </Typography>
                </Box>
                <Typography variant="h4" color="primary" gutterBottom>
                    {currentItem.price} ₽
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                    {currentItem.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Chip label={currentItem.game} color="primary" sx={{ mr: 1 }} />
                    <Chip label={currentItem.category} color="secondary" />
                </Box>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => dispatch(addToCart(currentItem))}
                    sx={{ mt: 2 }}
                >
                    Добавить в корзину
                </Button>
            </Box>
        </Box>

    )
}

export default ItemDetail