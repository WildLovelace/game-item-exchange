import { Outlet } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Button, Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/store'

const Layout = () => {
    const { items } = useAppSelector((state) => state.cart)
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            GameItem Exchange
                        </Link>
                    </Typography>

                    <Button color="inherit" component={Link} to="/items">
                        Товары
                    </Button>

                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" component={Link} to="/profile">
                                Профиль
                            </Button>
                            <Button color="inherit" component={Link} to="/cart">
                                <Badge badgeContent={items.length} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Войти
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Регистрация
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} GameItem Exchange - Биржа игровых предметов
                </Typography>
            </Box>
        </Box>
    )
}

export default Layout