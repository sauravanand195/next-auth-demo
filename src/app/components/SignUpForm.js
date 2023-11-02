"use client"
import React, { useState } from 'react'
import { signUp } from '../actions/users/signUp'
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AlertComp from './AlertComp';
import { useRouter } from 'next/navigation';
import ProfileComp from './ProfileComp';

const SignUpForm = () => {
    const router = useRouter()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [snack, setSnack] = useState(false)

    const handleSubmit = async () => {
        setMessage('Signing up ...')
        await signUp(firstName, lastName, email, password)
        setSnack(true)
        setTimeout(() => {
            router.push('/auth/signin')
        }, 1000);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth autoFocus
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="given-name"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="text"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => handleSubmit()}>
                        {message ? message : 'Sign Up'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/auth/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                {snack && <AlertComp severity="success" text="Successfully created new user" />}
            </Box>
        </Container>
    )
}

export default SignUpForm