import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, TextField, Button, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { registerStart, registerSuccess, registerFailure } from '../../store/slices/authSlice'

const validationSchema = yup.object({
    username: yup.string().required('Обязательное поле').min(3, 'Минимум 3 символа'),
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле').min(6, 'Минимум 6 символов'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
        .required('Подтвердите пароль')
})

const Register = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(registerStart())
            try {
                //const response = await apiRegister(userData) // API вызов
                //dispatch(registerSuccess(response.data))
            } catch (error) {
                //dispatch(registerFailure(error.message))
            }
        }
    })

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>Регистрация</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Имя пользователя"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Пароль"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Подтвердите пароль"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    sx={{ mb: 2 }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    disabled={formik.isSubmitting}
                >
                    Зарегистрироваться
                </Button>
                <Typography>
                    Уже есть аккаунт?{' '}
                    <Link component={RouterLink} to="/login">
                        Войти
                    </Link>
                </Typography>
            </form>
        </Box>
    )
}

export default Register