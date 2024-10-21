import Box from '@mui/system/Box';

import Stack from '@mui/system/Stack';
import { useContext } from 'react';
import dayjs from 'dayjs';
import UpdatesMenu from './UpdatesMenu';
import StateContext from '../../context/StateContext';

/**
 * Home page of the HRM application. Contains the updates menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesPage({style}) {
    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);

    return (
        
        <Box>
            <Stack 
                direction="row" 
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    marginBottom: "16px",
                    minWidth: "1042px"
                }}
            >
                <h3>Hello, {stateContext.state.employee.firstName}</h3>
                <p>Today is {dayjs().format("dddd, MMMM D, YYYY")}</p>
            </Stack>
            <UpdatesMenu />
        </Box>
    );
};

//Control panel settings for storybooks
UpdatesPage.propTypes = {};

//Default values for this component
UpdatesPage.defaultProps = {
    style: {}
};