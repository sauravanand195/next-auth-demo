"use client"
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AlertComp from './AlertComp'

const SignInForm = () => {
    const { status } = useSession()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [snack, setSnack] = useState(false)

    const defaultTheme = createTheme();

    const handleSubmit = async () => {
        setMessage('Signing in ...')
        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            console.log('signInResponse >>>> ', signInResponse);
            if (!signInResponse || signInResponse.ok !== true) {
                setSnack(true)
            } else {
                router.refresh()
            }
        } catch (err) {
            console.log('Error', err);
        }
        setMessage(message)
    }

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            router.push('/')
        }
    }, [status])


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth autoFocus
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField margin="normal" required fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                            onClick={() => handleSubmit()}>{message ? message : 'Sign In'}</Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='/auth/signup' variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {snack && <AlertComp severity='error' text='Invalid Credentials' />}
            </Container>
        </ThemeProvider>
        // <div>
        //     <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        //     <button onClick={() => handleSubmit()}>Sign In</button>
        //     <p>{message}</p>
        // </div>
    )
}

export default SignInForm