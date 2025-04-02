import { Box, TextField, MenuItem, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
    game: yup.string(),
    category: yup.string(),
    minPrice: yup.number().min(0),
    maxPrice: yup.number().min(0),
})

const games = ['World of Warcraft', 'Dota 2', 'CS:GO', 'Apex Legends', 'Valorant']
const categories = ['Аккаунты', 'Предметы', 'Услуги', 'Валюта']

const ItemFilters = ({ onFilter }: { onFilter: (values: any) => void }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Formik
                initialValues={{
                    game: '',
                    category: '',
                    minPrice: '',
                    maxPrice: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    onFilter(values)
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'space-between'
                            }}
                        >
                            <TextField
                                select
                                fullWidth
                                name="game"
                                label="Игра"
                                value={values.game}
                                onChange={handleChange}
                                sx={{ flex: 1, minWidth: 150 }}
                            >
                                <MenuItem value="">Все игры</MenuItem>
                                {games.map((game) => (
                                    <MenuItem key={game} value={game}>
                                        {game}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                fullWidth
                                name="category"
                                label="Категория"
                                value={values.category}
                                onChange={handleChange}
                                sx={{ flex: 1, minWidth: 150 }}
                            >
                                <MenuItem value="">Все категории</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                name="minPrice"
                                label="Мин. цена"
                                type="number"
                                value={values.minPrice}
                                onChange={handleChange}
                                sx={{ flex: 1, minWidth: 120 }}
                            />

                            <TextField
                                fullWidth
                                name="maxPrice"
                                label="Макс. цена"
                                type="number"
                                value={values.maxPrice}
                                onChange={handleChange}
                                sx={{ flex: 1, minWidth: 120 }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ flex: 1, minWidth: 120, height: '56px' }}
                            >
                                Применить
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default ItemFilters
