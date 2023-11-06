import { Box, Link, Typography } from "@mui/material";

const FooterTodo = () => {
    return (
        <Box sx={{ p: 6, mt: 'auto' }} component="footer">
            <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                component="p"
            >
                <Link color="inherit" href="https://saurav-anand.tech/terms">
                    Terms of use
                </Link>&nbsp;&nbsp;
                <Link color="inherit" href="https://saurav-anand.tech/privacy">
                    Privacy policy
                </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {`© ${new Date().getFullYear()} `}
                <Link style={{ textDecoration: "none" }} color="inherit" href="https://saurav-anand.tech/portfolio">
                    Saurav Anand
                </Link>
                {' | All rights reserved'}
            </Typography>
        </Box>
    );
}

export default FooterTodo;