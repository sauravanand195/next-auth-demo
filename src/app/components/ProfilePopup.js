import React from 'react'
import { Avatar, Card, Dialog, FormControl, FormHelperText, InputAdornment, TextField, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { stringAvatar } from '../../../public/js/commonFun';

const ProfilePopup = ({ open, handleClose, session }) => {
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
                    <Avatar sx={{ width: 45, height: 45 }} {...stringAvatar(session?.user?.username, '#9c409c', '17px')} />
                    <Typography sx={{ color: 'grey', fontWeight: 'bold', padding: "0px 0px 0px 20px", alignItems: 'middle' }}>{session?.user?.username}<EditIcon color='primary' sx={{ paddingLeft: '8px', paddingTop: '8px', cursor: 'pointer' }} /></Typography>
                </div>
                <Typography sx={{ fontWeight: 'bold', borderBottom: '1px solid lightgrey' }} >
                    Email Address
                </Typography>
                <Typography sx={{ color: 'grey', fontWeight: 'bold', alignItems: 'middle' }}>{'saurav@anand.test'}<EditIcon color='primary' sx={{ paddingLeft: '8px', paddingTop: '8px', cursor: 'pointer' }} /></Typography>
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
                <Typography sx={{ color: 'black', fontWeight: 'bolder', alignItems: 'middle', lineHeight: 1 }}>
                    <FormControl sx={{ m: 1, width: '17ch' }} variant="standard">
                        <TextField type='password' value={'saurav@1995'} variant="standard" margin="normal"
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        {true ? <VisibilityOff color='primary' sx={{ cursor: 'pointer' }} /> : <Visibility color='primary' sx={{ cursor: 'pointer' }} />}
                                    </InputAdornment>,
                                disableUnderline: true,
                            }}
                        />
                        <FormHelperText sx={{ color: '#1976d2', marginTop: "-3px", cursor: 'pointer' }}>
                            Change your password
                        </FormHelperText>
                    </FormControl>
                </Typography>
            </Card>
        </Dialog>
    )
}

export default ProfilePopup