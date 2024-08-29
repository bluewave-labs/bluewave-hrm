import Stack from '@mui/system/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Page from '../StaticComponents/Page';
import HRMButton from '../Button/HRMButton';
import NoConnectionComponent from '../StaticComponents/NoConnectionComponent';
import UpdatesMenu from './UpdatesMenu';
import { currentUserID } from '../../testConfig';


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
export default function UpdatesPage({style, innerStyle}) {
    //Flag determining if the database servers can be reached
    const [serverStatus, setServerStatus] = useState("Pending");

    useEffect(() => {
        testConnection();
    }, []);

    //ID of the currently logged in employee
    const currentUser = currentUserID;

    //URL endpoints to be used for API calls
    const timeOffPolicyPOSTURL = `http://localhost:5000/api/employeeannualtimeoffs/${currentUser}`;

    //Function for testing connection to database
    function testConnection() {
        setServerStatus("Pending");
        axios.post(timeOffPolicyPOSTURL)
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
        <Page style={style} innerStyle={innerStyle}>
            {serverStatus === "Pending" &&
                //Show loading logo while connecting to database
                <CircularProgress sx={{marginX: "50%", marginY: "40%"}} />
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
        </Page>
    );
};

//Control panel settings for storybooks
UpdatesPage.propTypes = {};

//Default values for this component
UpdatesPage.defaultProps = {
    style: {},
    innerStyle: {}
};