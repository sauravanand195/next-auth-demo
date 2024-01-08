"use client"
import React, { useState } from 'react'
import { signUp } from '../actions/users/signUp'
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AlertComp from './AlertComp';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const router = useRouter()
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [snack, setSnack] = useState({ msg: "", type: "error" })

    const validateInput = (inputData) => {
        console.log('inputData', inputData);
        let error = {}
        const regName = /^[a-zA-Z.]+([\s][a-zA-Z.]+)*$/;
        const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!regName.test(inputData.firstName)) error.firstName = true
        if (!regName.test(inputData.lastName)) error.lastName = true
        if (!regEmail.test(inputData.email)) error.email = true
        if (!regPass.test(inputData.password)) error.password = true

        setErrors(error)
        console.log('error', error);
        return Object.keys(error).length //== 0
    }

    const handleFieldChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        setMessage('Signing up ...')
        if (inputData.firstName == '' && inputData.lastName == '' && inputData.email == '' && inputData.password == '') {
            setSnack({ msg: "Please fill in all the details", type: "error" })
            setMessage('')
        } else {
            if (!validateInput(inputData)) {
                const res = await signUp(inputData?.firstName, inputData?.lastName, inputData?.email, inputData?.password)
                console.log('sign-up response >> ', res);
                if (res.error) {
                    setSnack({ msg: res.msg, type: "error" });
                    setMessage('')
                } else {
                    setSnack({ msg: res.msg, type: "success" })
                    setTimeout(() => {
                        router.push('/auth/signin')
                    }, 2000);
                }
            } else {
                setSnack({ msg: "Please fill in correct details", type: "error" })
                setMessage('')
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs" >
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
                                onChange={(e) => handleFieldChange(e)}
                                error={errors.firstName}
                                helperText={errors.firstName ? `Please enter valid first name` : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={(e) => handleFieldChange(e)}
                                error={errors.lastName}
                                helperText={errors.lastName ? `Please enter valid last name` : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="text"
                                autoComplete="email"
                                onChange={(e) => handleFieldChange(e)}
                                error={errors.email}
                                helperText={errors.email ? `Please enter valid email` : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                onChange={(e) => handleFieldChange(e)}
                                error={errors.password}
                                helperText={errors.password ? `Please enter valid password` : ''}
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
                {snack.msg && <AlertComp severity={snack?.type} text={snack.msg} />}
            </Box>
        </Container >
    )
}

export default SignUpForm