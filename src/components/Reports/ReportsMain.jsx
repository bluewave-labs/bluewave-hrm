import Stack from '@mui/system/Stack';
import Page from '../StaticComponents/Page';
import React  from 'react';
import ReportsMainCard from './ReportsMainCard';




export default function ReportsMain(style) {
    
    
    
    return (

        <Page style={style} >
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
            
        </Page>
    );
};

ReportsMain.propTypes = {};

