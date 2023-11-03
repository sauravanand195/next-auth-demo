"use client"
import React, { useState } from 'react'
import { AppBar, Box, Button, Container, Link, Toolbar, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Card, CardHeader, CardMedia, CardContent, Grid } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ProfilePopup from './ProfilePopup';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const pages = [
    { name: 'Home', redirect: '/' },
    { name: 'Dashboard', redirect: '/protected/dashboard' },
    { name: 'Products', redirect: '/protected/products' }
];

const NavBarComp = ({ session }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: 'purple',
                fontSize: '17px',
                lineHeight: '0'
            },
            children: `${name?.split(' ')[0][0].toUpperCase()}${name?.split(' ')[1][0].toUpperCase()}`,
        };
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none', }}>
                            TECHSOL
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={() => setAnchorElNav(true)} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu id="menu-appbar" keepMounted
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                                open={Boolean(anchorElNav)}
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
                        <Typography variant="h6" component="a" sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none', textAlign: 'center' }}>
                            TECHSOL
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
                                    {session ? <Avatar {...stringAvatar(session.user?.username)} /> : <Avatar />}
                                </IconButton>
                            </Tooltip>
                            <Menu id="menu-appbar" keepMounted
                                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                open={Boolean(anchorElUser)}
                                onClose={() => setAnchorElUser(false)}
                                sx={{ mt: '45px' }}
                            >
                                <Card sx={{ minWidth: 250, maxWidth: 250, marginBottom: '-8px', marginTop: '-8px' }}>
                                    <CardContent>
                                        <div onClick={() => setAnchorElUser(true)} style={{ paddingBottom: 12, display: 'flex' }}>
                                            <IconButton style={{ width: '65px', display: 'flex', justifyContent: 'center', padding: 0 }}>
                                                {session ? <Avatar sx={{ width: 45, height: 45 }} {...stringAvatar(session?.user?.username)} /> : <Avatar sx={{ width: 45, height: 45 }} />}
                                            </IconButton>
                                            <div style={{ padding: '1px 0px 0px 10px' }}>
                                                <Typography component="div" sx={{ fontSize: '14px', fontWeight: 'bolder' }}>
                                                    {session ? session.user?.username : 'N/A'}
                                                </Typography>
                                                <Typography component="div" sx={{ fontSize: '14px' }}>
                                                    {session ? session.user?.email : 'N/A'}
                                                </Typography>
                                            </div>
                                        </div>
                                        {session && <div onClick={() => setAnchorElUser(true)} style={{ paddingBottom: 10, display: 'flex' }}>
                                            <div style={{ width: '65px', textAlign: 'center' }}><SettingsOutlinedIcon color='primary' /></div>
                                            <div style={{ padding: '1px 0px 0px 10px' }}>
                                                <Typography component="div" sx={{ fontSize: '14px', fontWeight: 'bolder', cursor: 'pointer' }} onClick={() => setOpenProfile(true)}>
                                                    Manage Account
                                                </Typography>
                                            </div>
                                        </div>}
                                        {session && <div onClick={() => setAnchorElUser(true)} style={{ padding: 0, display: 'flex' }}>
                                            <div style={{ width: '65px', textAlign: 'center' }}><LogoutOutlinedIcon color='primary' /></div>
                                            <div style={{ padding: '1px 0px 0px 10px' }}>
                                                <Link href="/auth/signout" sx={{ color: 'inherit', textDecoration: "none" }}>
                                                    <Typography textAlign="center" sx={{ fontSize: '14px', fontWeight: 'bolder' }} >Sign out</Typography>
                                                </Link>
                                            </div>
                                        </div>}
                                    </CardContent>
                                </Card>
                            </Menu>
                        </Box>
                    </Toolbar>
                    {openProfile && <ProfilePopup open={openProfile} handleClose={() => setOpenProfile(false)} stringAvatar={stringAvatar} session={session} />}
                </Container>
            </AppBar >
        </>
    )
}

export default NavBarComp