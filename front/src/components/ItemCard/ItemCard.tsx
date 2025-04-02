import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material'
import { Item } from '../../types/item'
import { useAppDispatch } from '../../store/store'
import { addToCart } from '../../store/slices/cartSlice'
import { Link } from 'react-router-dom'

interface ItemCardProps {
    item: Item
}

const ItemCard = ({ item }: ItemCardProps) => {
    const dispatch = useAppDispatch()

    // Обработка случаев, когда данные могут быть пустыми
    const imageUrl = item.images && item.images.length > 0 ? item.images[0] : '/placeholder-item.jpg'
    const description = item.description || 'Нет описания'

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={item.title || 'Изображение предмета'}
            />
            <CardContent sx={{ flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title || 'Без названия'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                </Typography>
                <Typography variant="h6" mt={2}>
                    {item.price} ₽
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.game || 'Не указана игра'} • {item.category || 'Не указана категория'}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="primary">
                        Подробнее
                    </Button>
                </Link>
                <Button
                    size="small"
                    color="secondary"
                    onClick={() => dispatch(addToCart(item))}
                >
                    В корзину
                </Button>
            </CardActions>
        </Card>
    )
}

export default ItemCard
