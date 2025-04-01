import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import ItemList from '../../components/ItemList/ItemList'
import ItemFilters from '../../components/ItemFilters/ItemFilters'

const Items = () => {
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState({})

    const staticItems = [
        { id: 1, name: 'Предмет 1', description: 'Описание предмета 1' },
        { id: 2, name: 'Предмет 2', description: 'Описание предмета 2' },
        { id: 3, name: 'Предмет 3', description: 'Описание предмета 3' },
        { id: 4, name: 'Предмет 4', description: 'Описание предмета 4' },
    ]

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            // Эмуляция загрузки
            setItems(staticItems)
            setLoading(false)
        }, 1000)
    }, [])

    const handleFilter = (values: any) => {
        setFilters(values)
    }

    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Игровые предметы
            </Typography>
            <ItemFilters onFilter={handleFilter} />
            <ItemList items={items}  />
        </Box>
    )
}

export default Items
