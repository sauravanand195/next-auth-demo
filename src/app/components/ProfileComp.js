import { Avatar, Grid } from '@mui/material'
import React from 'react'
import Badge from '@mui/material/Badge';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ProfileComp = () => {

    return (
        <div>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                <input type="file" name="file" id="file" className="inputfile" />
                <label htmlFor="file">
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={<CameraAltIcon color='primary' />}
                    >
                        <Avatar sx={{ width: 100, height: 100 }} />
                    </Badge>
                </label>
            </Grid>
            <style jsx>{`
                .inputfile {
                    width: 0.1px;
                    height: 0.1px;
                    opacity: 0;
                    overflow: hidden;
                    position: absolute;
                    z-index: -1;
                }
            `}</style>
        </div>
    )
}

export default ProfileComp