import Box from '@mui/system/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HRMButton from '../Button/HRMButton';
import { useState } from 'react';

export default function UpdateNavBar({updatesNum, style}) {
    const numOfPages = Math.ceil(updatesNum / 10);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Box sx={{...{
            width: "925px",
            display: "flex",
            justifyContent: "space-between"
        }, ...style}}>
            <HRMButton mode="secondaryB" startIcon={<ArrowBackIcon />}>Previous</HRMButton>
            <HRMButton mode="secondaryB" endIcon={<ArrowForwardIcon />}>Next</HRMButton>
        </Box>
    );
};

