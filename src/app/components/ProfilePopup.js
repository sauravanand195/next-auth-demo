import React from 'react'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Checkbox, CssBaseline, Dialog, FormControlLabel, Grid, IconButton, TextField, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

const ProfilePopup = ({ open, handleClose, stringAvatar, session }) => {
    return (
        <Dialog onClose={handleClose} open={open}>
            <Card sx={{ minWidth: 600, padding: '20px' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>
                    Account
                </Typography>
                <Typography sx={{ color: 'grey', fontSize: '14px' }} >
                    Manage your account information
                </Typography>
                <Typography sx={{ fontWeight: 'bold', borderBottom: '1px solid lightgrey', paddingTop: '10px' }} >
                    Profile
                </Typography>
                <div style={{ display: 'flex', padding: '20px 0 20px 0' }}>
                    <Avatar sx={{ width: 45, height: 45 }} {...stringAvatar(session?.user?.username)} />
                    <Typography sx={{ color: 'grey', fontWeight: 'bold', padding: "0px 0px 0px 20px", alignItems: 'middle' }}>{session?.user?.username}<EditIcon color='primary' sx={{ paddingLeft: '8px', paddingTop: '8px' }} /></Typography>
                </div>
                <Typography sx={{ fontWeight: 'bold', borderBottom: '1px solid lightgrey' }} >
                    Email Address
                </Typography>
                <Typography sx={{ color: 'grey', fontWeight: 'bold', alignItems: 'middle' }}>{'saurav@anand.test'}<EditIcon color='primary' sx={{ paddingLeft: '8px', paddingTop: '8px' }} /></Typography>
                <Typography sx={{ fontWeight: 'bold', borderBottom: '1px solid lightgrey', paddingTop: '20px' }} >
                    Phone Numbers
                </Typography>
                <Typography variant="h5" sx={{ paddingTop: '20px', fontWeight: 'bolder' }}>
                    Security
                </Typography>
                <Typography sx={{ color: 'grey', fontSize: '14px' }}>
                    Manage your security preferences
                </Typography>
                <Typography sx={{ fontWeight: 'bold', borderBottom: '1px solid lightgrey', paddingTop: '20px' }} >
                    Password
                </Typography>
            </Card>
        </Dialog>
    )
}

export default ProfilePopup