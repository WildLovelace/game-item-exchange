import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchUserItems } from '../../store/slices/itemsSlice'
import { Box, Typography, Avatar, Button, Tabs, Tab} from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
import EditIcon from '@mui/icons-material/Edit'
import ItemList from '../../components/ItemList/ItemList'
import { Link } from 'react-router-dom'

const Profile = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)
    const { userItems } = useAppSelector((state) => state.items)
    const [tabValue, setTabValue] = useState('1')

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchUserItems(user.id))
        }
    }, [dispatch, user?.id])

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar sx={{ width: 80, height: 80, mr: 3 }} />
                <Box>
                    <Typography variant="h4">{user?.username}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user?.email}
                    </Typography>
                    <Button startIcon={<EditIcon />} sx={{ mt: 1 }}>
                        Редактировать профиль
                    </Button>
                </Box>
            </Box>

            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Мои товары" value="1" />
                        <Tab label="Мои заказы" value="2" />
                        <Tab label="Настройки" value="3" />
                    </Tabs>
                </Box>
                <TabPanel value="1">
                    {userItems.length > 0 ? (
                        <ItemList items={userItems} />
                    ) : (
                        <Typography>У вас пока нет товаров</Typography>
                    )}
                    <Button variant="contained" sx={{ mt: 2 }} component={Link} to="/create-item">
                        Добавить товар
                    </Button>
                </TabPanel>
                <TabPanel value="2">
                    <Typography>Здесь будут ваши заказы</Typography>
                </TabPanel>
                <TabPanel value="3">
                    <Typography>Настройки профиля</Typography>
                </TabPanel>
            </TabContext>
        </Box>
    )
}

export default Profile