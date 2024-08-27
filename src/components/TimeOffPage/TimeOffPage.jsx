import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import Dialog from '@mui/material/Dialog';
import Header from '../StaticComponents/Header';
import SideMenu from '../StaticComponents/SideMenu';
import TimeOffMenu from './TimeOffMenu';
import TimeOffRequest from '../PopupComponents/TimeOffRequest';
import TimeOffRequestSent from '../PopupComponents/TimeOffRequestSent';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import { useState } from 'react';

/**
 * Time off page of the HRM application. Contains the time off menu as well as controls for 
 * request time off.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffPage({style}) {
    //States determining whether the time off request menu and request successful notifications
    //should be displayed
    const [openRequest, setOpenRequest] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState(false);

    //Function for sending a time off request
    function sendRequest() {
        setOpenRequest(false);
        setRequestSuccess(true);
    }

    return (
        <Box sx={{...{
            width: "100%", 
            height: "100%", 
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Header*/}
            <Header />
            <Box sx={{
                display: "flex",
                flexDirection: "row", 
                width: "100%", 
                height: "100%", 
                backgroundColor: "#F9FAFB"
            }}>
                {/*Side menu*/}
                <Box>
                    <SideMenu />
                </Box>
                <Box sx={{
                    paddingX: "75px", 
                    paddingY: "40px", 
                    width: "100%",
                    height: "100%"
                }}>
                    {/*Main page content*/}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            marginBottom: "40px"
                        }}
                    >
                        <h3>Time off</h3>
                        <HRMButton 
                            mode="primary" 
                            onClick={() => setOpenRequest(true)}
                        >
                            Request new time off
                        </HRMButton>
                    </Stack>
                    <TimeOffMenu />
                </Box>
                {/*Time off request menu*/}
                <Dialog open={openRequest} onClose={() => setOpenRequest(false)}>
                    <TimeOffRequest 
                        close={() => setOpenRequest(false)} 
                        sendRequest={() => sendRequest()} 
                    />
                </Dialog>
                {/*Request successful notification*/}
                <TimeOffRequestSent 
                    close={() => setRequestSuccess(false)} 
                    style={{
                        display: (requestSuccess) ? "block" : "none",
                        position: "fixed",
                        right: "40px",
                        bottom: "40px",
                        zIndex: 999
                    }} 
                />
            </Box>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffPage.propTypes = {};

//Default values for this component
TimeOffPage.defaultProps = {
    style: {}
};