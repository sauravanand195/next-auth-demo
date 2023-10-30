import React from 'react'
import { AppBar, Box, Button, Container, Link, Toolbar } from '@mui/material'

const NavBarComp = ({ session }) => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={{ color: 'white', display: 'block' }}>LOGO</Button>
                        <Link underline='none' href='/'><Button sx={{ color: 'white', display: 'block' }}>Home</Button></Link>
                        <Link underline='none' href='/protected/dashboard'><Button sx={{ color: 'white', display: 'block' }}>Dashboard</Button></Link>
                        <Link underline='none' href='/protected/products'><Button sx={{ color: 'white', display: 'block' }}>Products</Button></Link>
                    </Box>
                    <Box>
                        {session && session.user?.email
                            ? (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Link href='/auth/signout'><Button sx={{ color: 'white', display: 'block' }}>Sign out</Button></Link>
                                <Button sx={{ color: 'white', display: 'block', fontWeight: 'bolder' }}>Signed in as {session.user?.email}</Button>
                            </Box>)
                            : (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Link href='/auth/signin'><Button sx={{ color: 'white', display: 'block' }}>Sign in</Button></Link>
                                <Link href='/auth/signup'><Button sx={{ color: 'white', display: 'block' }}>Sign up</Button></Link>
                            </Box>)}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBarComp