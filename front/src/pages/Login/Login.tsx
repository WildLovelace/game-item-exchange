import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box, TextField, Button, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice'

const validationSchema = yup.object({
    email: yup.string().email('Введите корректный email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
})

const Login = () => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                dispatch(loginStart())
                //const response = await apiLogin(values) // функция API для входа
                //dispatch(loginSuccess(response.data.user))
            } catch (error) {
               // dispatch(loginFailure(error.message))
            }
        },
    })

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Вход
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
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
                <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
                    Войти
                </Button>
                <Typography>
                    Нет аккаунта?{' '}
                    <Link component={RouterLink} to="/register">
                        Зарегистрируйтесь
                    </Link>
                </Typography>
            </form>
        </Box>
    )
}

export default Login