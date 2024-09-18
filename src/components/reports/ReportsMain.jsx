import Stack from '@mui/system/Stack';
import React  from 'react';
import ReportsMainCard from './ReportsMainCard';
import { Box } from '@mui/material';

export default function ReportsMain(style) {
    return (

        <Box >
            {/*Main page content*/}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "40px"
                }}
            >
                <h2 style={{fontSize:'24px', fontFamily:'Inter', fontWeight:'600', color:'#101828'}}>Reports</h2>
                
            </Stack>
            <ReportsMainCard />
        </Box>
    );
};

ReportsMain.propTypes = {};

