import { IconButton, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = async () => {
    return (
        <>
            <Paper elevation={3} style={{ padding: '20px', position: "relative", left: 0, bottom: -50, width: "100%" }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton color="primary" href="#" target="_blank">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton color="primary" href="#" target="_blank">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton color="primary" href="#" target="_blank">
                        <FacebookIcon />
                    </IconButton>
                </div>
                <Typography variant="body2" color="text.secondary" align="center">
                    &copy; {`${new Date().getFullYear()} `}
                    <Link style={{ textDecoration: "none" }} color="inherit" href="https://saurav-anand.tech/portfolio">
                        Saurav Anand
                    </Link>
                    {' | All rights reserved'}
                </Typography>
            </Paper>
        </>
    )
}

export default Footer
