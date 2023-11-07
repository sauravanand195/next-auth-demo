"use client"
import { Button, CssBaseline, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProductsPage = () => {
    const router = useRouter()
    return (
        <>
            <CssBaseline />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }} sx={{ padding: '20px' }}>
                <Grid item sm={9}>
                    <Typography component="h2" variant="h6" align="left" color="text.primary">
                        Organize your work and life, finally.
                    </Typography>
                    <Typography variant="h7" align="left" color="text.secondary" paragraph>
                        Maintain your day-to-day tasks or list everything that you have to do, with the most important tasks at the top of the list, and the least important tasks at the bottom.
                    </Typography>
                </Grid>
                <Grid item sm={3}>
                    <div style={{ position: 'relative', top: '45%', left: '50%', transform: "translate(-50%, -50%)" }}>
                        <Button variant="contained" onClick={() => { router.push('/todo') }}>
                            Open Todo App
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default ProductsPage