import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const CustomToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

export const stringAvatar = (name, bgcolor, fontSize) => {
    return {
        sx: {
            bgcolor: bgcolor,
            fontSize: fontSize,
            lineHeight: '0'
        },
        children: `${name?.split(' ')[0][0].toUpperCase()}${name?.split(' ')[1][0].toUpperCase()}`,
    };
}