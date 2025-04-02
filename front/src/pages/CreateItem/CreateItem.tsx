import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, TextField, Button, Typography, Paper, Avatar, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '../../store/store'
import { createItem } from '../../store/slices/itemsSlice'

const validationSchema = yup.object({
    title: yup.string().required('Обязательное поле'),
    description: yup.string().required('Обязательное поле'),
    price: yup.number().positive('Цена должна быть положительной').required('Обязательное поле'),
    game: yup.string().required('Обязательное поле'),
    category: yup.string().required('Обязательное поле'),
})

const CreateItem = () => {
    const dispatch = useAppDispatch()
    const [previewImages, setPreviewImages] = useState<string[]>([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        onDrop: (acceptedFiles) => {
            setPreviewImages(acceptedFiles.map(file => URL.createObjectURL(file)))
        }
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            game: '',
            category: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value)
            })
            previewImages.forEach((file) => {
                formData.append('images', file)
            })
            dispatch(createItem(formData))
        },
    })

    const removeImage = (index: number) => {
        const newImages = [...previewImages]
        newImages.splice(index, 1)
        setPreviewImages(newImages)
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Создать новый товар
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Название товара"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Описание"
                            multiline
                            rows={4}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Цена"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            id="game"
                            name="game"
                            label="Игра"
                            value={formik.values.game}
                            onChange={formik.handleChange}
                            error={formik.touched.game && Boolean(formik.errors.game)}
                            helperText={formik.touched.game && formik.errors.game}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            id="category"
                            name="category"
                            label="Категория"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            helperText={formik.touched.category && formik.errors.category}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Paper
                            {...getRootProps()}
                            sx={{
                                p: 3,
                                border: '2px dashed #ccc',
                                textAlign: 'center',
                                cursor: 'pointer',
                                mb: 2
                            }}
                        >
                            <input {...getInputProps()} />
                            <Typography>Перетащите сюда изображения или кликните для выбора</Typography>
                        </Paper>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {previewImages.map((img, index) => (
                                <Box key={index} sx={{ position: 'relative', width: '100px', height: '100px' }}>
                                    <Avatar
                                        src={img}
                                        variant="rounded"
                                        sx={{ width: '100%', height: '100%' }}
                                    />
                                    <IconButton
                                        onClick={() => removeImage(index)}
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3 }}
                >
                    Создать товар
                </Button>
            </form>
        </Box>
    )
}

export default CreateItem
