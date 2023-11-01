"use client"
import React, { useState } from 'react'
import { AppBar, Box, Button, Container, Link, Toolbar, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
    { name: 'Home', redirect: '/' },
    { name: 'Dashboard', redirect: '/protected/dashboard' },
    { name: 'Products', redirect: '/protected/products' }
];
const settings = [
    { name: 'Profile', redirect: '#' },
    { name: 'Account', redirect: '#' },
    { name: 'Dashboard', redirect: '#' },
    { name: 'Logout', redirect: '/auth/signout' }
];

const NavBarComp = ({ session }) => {
    const [anchorElNav, setAnchorElNav] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(false);

    const menuitems = settings.filter((item) => {
        if (!session) return item.name != 'Logout'
        else return item
    })

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
                        SAURAV
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={() => setAnchorElNav(true)} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" keepMounted
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            open={anchorElNav}
                            onClose={() => setAnchorElNav(false)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={() => setAnchorElNav(false)}>
                                    <Link href={page.redirect} sx={{ color: 'inherit', textDecoration: "none" }}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography variant="h5" noWrap component="a" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
                        SAURAV
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Link key={index} href={page.redirect} sx={{ color: 'inherit', textDecoration: "none" }}>
                                <Button key={index} sx={{ my: 2, color: 'white', display: 'block' }}>{page.name}</Button>
                            </Link>
                        ))}
                    </Box>

                    {session && session.user?.email
                        ? <Button sx={{ color: 'white', display: 'block' }}><b>{session.user?.username}</b></Button>
                        : <Link href='/auth/signin'><Button sx={{ color: 'white', display: 'block' }}>Sign in</Button></Link>
                    }
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={() => setAnchorElUser(true)} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu id="menu-appbar" keepMounted
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                            open={anchorElUser}
                            onClose={() => setAnchorElUser(false)}
                        >
                            {menuitems.map((item, index) => (
                                <MenuItem key={index}>
                                    <Link href={item.redirect} sx={{ color: 'inherit', textDecoration: "none" }}>
                                        <Typography textAlign="center">{item.name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default NavBarComp