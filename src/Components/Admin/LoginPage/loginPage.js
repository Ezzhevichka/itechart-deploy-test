import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        login(loginEmail, loginPassword).then(res => {
            if (!res.user) {
                console.log('error')
            } else {
                navigate('/itechart-deploy-test/admin')
            }
        })
    }

    const changeEmail = function (event) {
        setLoginEmail(event.target.value);
    }

    const changePassword = function (event) {
        setLoginPassword(event.target.value);
    }

    return (
        <ThemeProvider theme={theme} id="loginPage">
            <Container component="main" id="loginPage">
                <CssBaseline />
                <Box id="loginBox"
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: '564px',
                        height: '304px'
                    }}
                >
                    <Typography component="h1" variant="h5" marginTop="16px">
                        Войти
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} id="loginForm">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(ev) => changeEmail(ev)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            onChange={(ev) => changePassword(ev)}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(event) => handleSubmit(event)}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}