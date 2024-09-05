import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import Page from '../StaticComponents/Page';
import HRMButton from '../Button/HRMButton';
import NoConnectionComponent from '../StaticComponents/NoConnectionComponent';
import UpdatesMenu from './UpdatesMenu';
//import { currentUserID } from '../../testConfig';
import StateContext from '../../context/StateContext';
const BASE_URL = require("../../assets/FetchServices/BaseUrl.json").value; 

/**
 * Home page of the HRM application. Contains the updates menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 * 
 * - innerStyle<Object>: Optional prop for adding further inline styling in the inner component.
 *      Default: {}
 */
export default function UpdatesPage({style}) {
    //Flag determining if the database servers can be reached
    const [serverStatus, setServerStatus] = useState("Pending");

    useEffect(() => {
        testConnection();
    }, []);

    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //URL endpoints to be used for API calls
    const notificationsURL = `${BASE_URL}/api/notifications/employee/${currentUser}`;

    //Function for testing connection to database
    function testConnection() {
        setServerStatus("Pending");
        axios.get(notificationsURL, {withCredentials: true})
        .then((response) => {
            console.log(response);
            setServerStatus("Success");
        })
        .catch((error) => {
            console.log(error);
            if (!error.response) {
                setServerStatus("Failure");
            }
        })
    };

    return (
        <Box sx={style}>
            {serverStatus === "Pending" &&
                //Show loading logo while connecting to database
                <CircularProgress sx={{marginLeft: "auto", marginRight: "auto", display: "block"}} />
            }
            {serverStatus === "Success" && 
            //Show page content if connection is successful
            <>
                <Stack 
                    direction="row" 
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        marginBottom: "40px",
                        minWidth: "1042px"
                    }}
                >
                    <h3>Hello, Gabriel</h3>
                    <p>Today is Monday, June 6, 2024</p>
                </Stack>
                <UpdatesMenu />
            </>
            }
            {serverStatus === "Failure" && 
                //Error message to be displayed if servers are unresponsive
                <NoConnectionComponent>
                    <h3 style={{color: "#D92D20"}}>Servers are unavailable</h3>
                    <p style={{color: "#D92D20"}}>Cannot retrieve notifications.</p>
                    <HRMButton 
                        mode="error" 
                        onClick={testConnection} 
                        style={{marginLeft: "auto", marginRight: "auto"}}
                    >
                        Retry Connection
                    </HRMButton>
                </NoConnectionComponent>
            }
        </Box>
    );
};

//Control panel settings for storybooks
UpdatesPage.propTypes = {};

//Default values for this component
UpdatesPage.defaultProps = {
    style: {},
    innerStyle: {}
};