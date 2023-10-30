import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
});
// error, warning, info, success

export default function AlertComp({ severity, text }) {
    const [state, setState] = React.useState({
        open: true,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={5000} onClose={() => setState({ ...state, open: false })} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={() => setState({ ...state, open: false })} severity={severity} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
