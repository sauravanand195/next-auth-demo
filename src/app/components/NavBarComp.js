"use client"
import React, { useState } from 'react'
import { AppBar, Box, Button, Container, Link, Toolbar, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Card, CardHeader, CardMedia, CardContent, Grid, Drawer, Divider, List } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ProfilePopup from './ProfilePopup';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useRouter } from 'next/navigation';
import { stringAvatar } from '../../../public/js/commonFun';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

const NavBarComp = ({ session }) => {
    const router = useRouter();
    const [openProfile, setOpenProfile] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false)

    const getAbbr = (name) => {
        return `${name?.split(' ')[0][0].toUpperCase()}${name?.split(' ')[1][0].toUpperCase()}`
    }

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "white" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontSize: '1rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.1rem', color: 'black', textDecoration: 'none', }}> */}
                        <Typography variant="h6" noWrap component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontSize: "20px", fontWeight: "bold", fontFamily: "Arial,Helvetica, sans-serif", letterSpacing: '.1rem', background: "linear-gradient(to right, #f32170, #ff6b08,#cf23cf, #eedd44)", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>
                            saurav.tech
                        </Typography>
                        <Typography sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontSize: "20px", fontWeight: "bold", fontFamily: "Arial,Helvetica, sans-serif", letterSpacing: '.1rem', background: "linear-gradient(to right, #f32170, #ff6b08,#cf23cf, #eedd44)", WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>
                            saurav.tech
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link sx={{ color: 'inherit', textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'black', display: 'block' }}>Testimonials</Button>
                            </Link>
                            <Link sx={{ color: 'inherit', textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'black', display: 'block' }}>About</Button>
                            </Link>
                            <Link sx={{ color: 'inherit', textDecoration: "none" }}>
                                <Button sx={{ my: 2, color: 'black', display: 'block' }}>Contact us</Button>
                            </Link>
                        </Box>
                        {session && session.user?.email
                            ? '' : <Button onClick={() => { router.push('/auth/signin') }} sx={{ color: 'black', display: 'block' }}>Sign in</Button>
                            // <Button sx={{ color: 'white', display: 'block' }}><b>{session.user?.username}</b></Button>
                        }
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={() => setOpenDrawer(true)} sx={{ p: 0 }}>
                                    {session ? <Avatar {...stringAvatar(session.user?.username, '#9c409c', '17px')} /> : <Avatar />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                    <Drawer
                        variant='temperory'
                        anchor='right'
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                    >
                        <Box
                            sx={{ width: { xs: '100vw', md: '400px' } }}
                            onClick={() => setOpenDrawer(false)}
                            onKeyDown={() => setOpenDrawer(false)}
                        >
                            <List sx={{ padding: "20px" }}>
                                <div style={{ display: 'flex', padding: "10px", justifyContent: "space-between" }}>
                                    <div style={{ textAlign: "left" }}>
                                        <Typography component="div" sx={{ fontSize: '20px', fontWeight: 'bolder' }}>
                                            {session ? session.user?.username : 'N/A'}
                                        </Typography>
                                        <Typography component="div" sx={{ fontSize: '20px' }}>
                                            {session ? session.user?.email : 'N/A'}
                                        </Typography>
                                    </div>
                                    <Avatar sx={{ width: "60px", height: "60px", backgroundColor: "#9c409c", fontSize: "22px" }}>{getAbbr(session.user?.username)}</Avatar>
                                </div>
                                <Divider sx={{ mt: 2, mb: 2 }} />
                                {session && <>
                                    <div onClick={() => setOpenProfile(true)} style={{ display: 'flex', padding: "10px 10px" }}>
                                        <div style={{ border: "2px solid #1976d2", borderRadius: "50%", padding: "10px 0", width: '50px', height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}><SettingsOutlinedIcon color='primary' /></div>
                                        <div style={{ display: "flex", paddingLeft: "20px", alignItems: "center" }}>
                                            <Typography component="div" sx={{ fontSize: '20px', cursor: 'pointer' }}>
                                                Manage Account
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', padding: "10px 10px" }}>
                                        <div style={{ border: "2px solid #1976d2", borderRadius: "50%", padding: "10px 0", width: '50px', height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}><GTranslateOutlinedIcon color='primary' /></div>
                                        <div style={{ display: "flex", paddingLeft: "20px", alignItems: "center" }}>
                                            <Typography component="div" sx={{ fontSize: '20px', cursor: 'pointer' }}>
                                                Language
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', padding: "10px 10px" }}>
                                        <div style={{ border: "2px solid #1976d2", borderRadius: "50%", padding: "10px 0", width: '50px', height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}><NotificationsActiveOutlinedIcon color='primary' /></div>
                                        <div style={{ display: "flex", paddingLeft: "20px", alignItems: "center" }}>
                                            <Typography component="div" sx={{ fontSize: '20px', cursor: 'pointer' }}>
                                                Notifications
                                            </Typography>
                                        </div>
                                    </div>
                                    <Divider sx={{ mt: 2, mb: 2 }} />
                                    <div style={{ display: 'flex', padding: "10px 10px" }}>
                                        <div style={{ border: "2px solid #1976d2", borderRadius: "50%", padding: "10px 0", width: '50px', height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}><PolicyOutlinedIcon color='primary' /></div>
                                        <div style={{ display: "flex", paddingLeft: "20px", alignItems: "center" }}>
                                            <Typography component="div" sx={{ fontSize: '20px', cursor: 'pointer' }}>
                                                Policy
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', padding: "10px 10px" }}>
                                        <div style={{ border: "2px solid #1976d2", borderRadius: "50%", padding: "10px 0", width: '50px', height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}><FeedbackOutlinedIcon color='primary' /></div>
                                        <div style={{ display: "flex", paddingLeft: "20px", alignItems: "center" }}>
                                            <Typography component="div" sx={{ fontSize: '20px', cursor: 'pointer' }}>
                                                Feedback
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', padding: "10px 10px" }}>
                                        <div style={{ border: "2px solid #1976d2", borderRadius: "50%", padding: "10px 0", width: '50px', height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}><LogoutOutlinedIcon color='primary' /></div>
                                        <div style={{ display: "flex", paddingLeft: "20px", alignItems: "center" }}>
                                            <Link href="/auth/signout" sx={{ color: 'inherit', textDecoration: "none" }}>
                                                <Typography textAlign="center" sx={{ fontSize: '20px' }} >Sign out</Typography>
                                            </Link>
                                        </div>
                                    </div>
                                </>}
                            </List>
                        </Box>
                    </Drawer>
                    {openProfile && <ProfilePopup open={openProfile} handleClose={() => setOpenProfile(false)} session={session} />}
                </Container>
            </AppBar >
        </>
    )
}

export default NavBarComp