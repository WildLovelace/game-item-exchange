import { Box, Typography, Button, Paper, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/store'

const Home = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box sx={{
            p: 3,
            mx: 'auto'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                alignItems: 'center',
                mb: 8,
                pt: isMobile ? 2 : 4
            }}>
                <Box sx={{
                    flex: 1,
                    textAlign: { xs: 'center', md: 'left' }
                }}>
                    <Typography
                        variant="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            lineHeight: 1.2,
                            color: theme.palette.primary.main
                        }}
                    >
                        Биржа игровых предметов
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        paragraph
                        sx={{
                            mb: 3,
                            fontSize: { xs: '1.1rem', md: '1.25rem' }
                        }}
                    >
                        Покупайте и продавайте внутриигровые предметы безопасно и выгодно
                    </Typography>
                    {!isAuthenticated && (
                        <Box sx={{
                            mt: 3,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            justifyContent: { xs: 'center', md: 'flex-start' }
                        }}>
                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    boxShadow: theme.shadows[4],
                                    '&:hover': {
                                        boxShadow: theme.shadows[8]
                                    }
                                }}
                            >
                                Начать
                            </Button>
                            <Button
                                component={Link}
                                to="/items"
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    borderWidth: 2,
                                    '&:hover': {
                                        borderWidth: 2
                                    }
                                }}
                            >
                                Посмотреть товары
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box sx={{
                    flex: 1,
                    textAlign: 'center',
                    mt: { xs: 4, md: 0 }
                }}>
                    <Paper
                        elevation={6}
                        sx={{
                            p: 2,
                            borderRadius: 4,
                            overflow: 'hidden',
                            display: 'inline-block',
                            maxWidth: '100%'
                        }}
                    >
                        <img
                            src="/marketplace-illustration.jpg"
                            alt="Иллюстрация биржи"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: theme.shape.borderRadius,
                                display: 'block'
                            }}
                        />
                    </Paper>
                </Box>
            </Box>

            <Box sx={{
                mt: 10,
                textAlign: 'center',
                px: { xs: 1, md: 0 }
            }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        mb: 4,
                        color: theme.palette.text.primary
                    }}
                >
                    Как это работает?
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    justifyContent: 'center'
                }}>
                    {[
                        { title: '1. Регистрация', text: 'Создайте аккаунт за 2 минуты' },
                        { title: '2. Размещение', text: 'Выставите предметы на продажу' },
                        { title: '3. Сделка', text: 'Безопасный обмен через систему' }
                    ].map((item, index) => (
                        <Paper
                            key={index}
                            elevation={4}
                            sx={{
                                p: 3,
                                flex: 1,
                                maxWidth: { xs: '100%', md: 360 },
                                borderRadius: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: theme.shadows[8]
                                }
                            }}
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    fontWeight: 600,
                                    color: theme.palette.primary.main,
                                    mb: 2
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '1.1rem'
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Home