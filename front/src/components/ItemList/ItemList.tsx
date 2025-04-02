import { Box } from '@mui/material'
import ItemCard from '../ItemCard/ItemCard'
import { Item } from '../../types/item'

interface ItemListProps {
    items: Item[]
}

const ItemList = ({ items }: ItemListProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            {items.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }
                    }}
                >
                    <ItemCard item={item} />
                </Box>
            ))}
        </Box>
    )
}

export default ItemList
