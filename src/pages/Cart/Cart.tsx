import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../store/store'
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const Cart = () => {
    const { items } = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }))
        }
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Корзина
            </Typography>

            {items.length === 0 ? (
                <Typography>Ваша корзина пуста</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Товар</TableCell>
                                    <TableCell align="right">Цена</TableCell>
                                    <TableCell align="center">Количество</TableCell>
                                    <TableCell align="right">Сумма</TableCell>
                                    <TableCell align="right">Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell align="right">{item.price} ₽</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            {item.quantity}
                                            <IconButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">{item.price * item.quantity} ₽</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => dispatch(removeFromCart(item.id))}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="outlined" color="error" onClick={() => dispatch(clearCart())}>
                            Очистить корзину
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6">Итого: {totalPrice} ₽</Typography>
                            <Button variant="contained" color="primary">
                                Оформить заказ
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default Cart