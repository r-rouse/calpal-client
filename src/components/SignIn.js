
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const username = data.get('email');
        const password = data.get("password")
        try {
            const response = await axios.post(`${apiUrl}/api/users/login`, {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                navigate('/');
            } else {
                console.error('Login failed, please try again.');
            }
        } catch (err) {
            setError(true)
            console.error('Login error:', err);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: { xs: 4, sm: 8 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: { xs: 2, sm: 0 },
                        width: '100%',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={error ? "incorrect password or email": ""}
                            autoFocus
                            sx={{ minHeight: '56px' }}
                        />
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            helperText={error ? "incorrect password or email": ""}
                            autoComplete="current-password"
                            sx={{ minHeight: '56px' }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                minHeight: '44px',
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container spacing={1} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <Link href="#" variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Link href="/signup" variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/" variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                    {"Just want to use the app as guest?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Login