import Stack from '@mui/system/Stack';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, useContext } from 'react';
//import axios from 'axios';
import TimeOffMenu from './TimeOffMenu';
import TimeOffRequest from '../PopupComponents/TimeOffRequest';
import TimeOffRequestSent from '../PopupComponents/TimeOffRequestSent';
import Page from '../StaticComponents/Page';
import NoConnectionComponent from '../StaticComponents/NoConnectionComponent';
import HRMButton from '../Button/HRMButton';
//import { currentUserID } from '../../testConfig';
//import { fetchOne } from '../../assets/FetchServices/EmployeeAnnualTimeOff';
import StateContext from '../../context/StateContext';


/**
 * Time off page of the HRM application. Contains the time off menu as well as controls for 
 * request time off.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 * 
 * - innerStyle<Object>: Optional prop for adding further inline styling in the inner component.
 *      Default: {}
 */
export default function TimeOffPage({style, innerStyle}) {
    //States determining whether the time off request menu and request successful notifications
    //should be displayed
    const [openRequest, setOpenRequest] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState(false);
    //Flag determining if the database servers can be reached
    const [serverStatus, setServerStatus] = useState("Pending");

    useEffect(() => {
        testConnection();
    }, []);

    //ID of the currently logged in employee
    const stateContext = useContext(StateContext);
    const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

    //URL endpoints to be used for API calls
    const timeOffPolicyPOSTURL = `http://localhost:5000/api/employeeannualtimeoffs/${currentUser}`;

    //Function for testing connection to database
    function testConnection() {
        setServerStatus("Pending");
        axios.post(timeOffPolicyPOSTURL, {withCredentials: true})
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

    //Function for sending a time off request
    function sendRequest() {
        setOpenRequest(false);
        setRequestSuccess(true);
        setTimeout(() => setRequestSuccess(false), 5000);
    }

    return (
        <Page style={style} innerStyle={innerStyle}>
            {serverStatus === "Pending" &&
                //Show loading logo while connecting to database
                <CircularProgress sx={{marginX: "50%", marginY: "40%"}} />
            }
            {serverStatus === "Success" &&
            //Show page content if connection is successful
            <>
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
            </>
            }
            {serverStatus === "Failure" && 
                //Error message to be displayed if servers are unresponsive
                <NoConnectionComponent>
                    <h3 style={{color: "#D92D20"}}>Servers are unavailable</h3>
                    <p style={{color: "#D92D20"}}>Cannot retrieve time off policies or periods.</p>
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

//Control panel settings for storybook
TimeOffPage.propTypes = {};

//Default values for this component
TimeOffPage.defaultProps = {
    style: {},
    innerStyle: {}
};