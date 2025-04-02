import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Items from '../pages/Items/Items'
import ItemDetail from '../pages/ItemDetail/ItemDetail'
import Profile from '../pages/Profile/Profile'
import Cart from '../pages/Cart/Cart'
import Layout from '../components/common/Layout/Layout'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="items" element={<Items />} />
                <Route path="items/:id" element={<ItemDetail />} />
                <Route path="profile" element={<Profile />} />
                <Route path="cart" element={<Cart />} />
            </Route>
        </Routes>
    )
}

export default AppRouter