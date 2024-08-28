import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import axios from 'axios';
import AvailableTimeOffTable from './AvailableTimeOffTable';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';
import { currentUserID } from '../../testConfig';

//Function for parsing a JavaScript date into a string format.
function formatDate(date) {
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
};

/**
 * Displays the content for the Board tab in the time off menu which includes the available
 * time off per policy and any upcoming periods of time off scheduled.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function BoardTabContent({style}) {
    //The current page number 
    const [currentPage, setCurrentPage] = useState(1);  
    //Time off policies to be displayed
    const [timeOffPolicies, setTimeOffPolicies] = useState({});
    //Time off periods to be displayed
    const [timeOffPeriods, setTimeOffPeriods] = useState([]);
    //Hook for refreshing the list of time off periods
    const [refresh, setRefresh] = useState(false);

    //ID of the currently logged in employee
    const currentUser = currentUserID;

    //URL endpoints to be used for API calls
    const timeOffPeriodURL = `http://localhost:5000/api/timeoffhistories/employee/${currentUser}`;
    const timeOffPolicyURL = `http://localhost:5000/api/employeeannualtimeoffs/${currentUser}`;
    
    dayjs.extend(isSameOrAfter);

    //Refresh the list of time off periods
    useEffect(() => {
        getTimeOffPolicies();
        getUpcomingTimeOffPeriods();
    }, [refresh]);

    //Function for retrieving the time off policies and their respective hours used and available
    function getTimeOffPolicies() {
        //Send Request to database for time off policies
        axios.post(timeOffPolicyURL)
        .then((response) => {
            const policies = {};
            //Only display the information for the current year
            const data = response.data.filter((p) => p.year === dayjs().year());
            data.forEach((p) => {
                policies[p.category] = {
                    id: p.timeOffId,
                    type: p.category,
                    availableHours: p.hoursLeft,
                    hoursUsed: p.hoursUsed
                }
            });
            setTimeOffPolicies(policies);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //Function for retrieving any upcoming time off periods
    function getUpcomingTimeOffPeriods() {
        //Send request to database for time off periods
        axios.post(timeOffPeriodURL)
        .then((response) => {
            const periods = [];
            const data = response.data;
            data.forEach((p) => {
                //Only retrieve and display periods that are upcoming
                if (dayjs(p.startDate).isSameOrAfter(dayjs().subtract(1, "day")) && (p.status === "Approved" || p.status === "Pending")) {
                    periods.push({
                        id: p.id,
                        timeOffId: p.timeOffId,
                        from: formatDate(dayjs(p.startDate).toDate()),
                        to: formatDate(dayjs(p.endDate).toDate()),
                        type: p.timeOff.category,
                        hours: p.hours,
                        note: p.note,
                        status: p.status
                    });
                }
            });
            setTimeOffPeriods(periods);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    //Only shows 10 periods at a time
    const periodsToDisplay = timeOffPeriods.slice((currentPage - 1) * 10, currentPage * 10);

    //Function for changing the page number
    function handlePage(n) {
        if (n > 0 && n <= Math.ceil(timeOffPeriods.length / 10)) {
            setCurrentPage(n);
        }
    };

    return (
        <Box sx={{...{
            marginTop: "40px", 
            color: colors.darkGrey, 
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Available time off header and table*/}
            <h3 style={{marginBottom: "40px"}}>Available time offs</h3>
            <AvailableTimeOffTable policies={timeOffPolicies} />
            {/*Upcoming time off header*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                spacing={2} 
                sx={{marginTop: "50px", marginBottom: "25px"}}
            >
                <h3>Upcoming time offs</h3>
                <Label 
                    mode="brand" 
                    label={timeOffPeriods.length} 
                    style={{borderRadius: "50%"}} 
                />
            </Stack>
            {timeOffPeriods.length > 0 ?
                <>
                    {/*Upcoming time off table*/}
                    <UpcomingTimeOffTable 
                        timeOffPeriods={periodsToDisplay} 
                        tableColumns={['Type', 'Amount', 'Note', 'Status']}
                        editFlag={true} 
                        refresh={() => setRefresh(!refresh)}
                        style={{marginBottom: "30px"}}
                    />
                    {/*Upcoming time off navbar*/}
                    {timeOffPeriods.length > 10 &&
                        <PagesNavBar 
                            numOfEntries={timeOffPeriods.length} 
                            currentPage={currentPage} 
                            handlePage={handlePage}
                        /> 
                    }  
                </> :
                <p>There is no upcoming time off right now.</p>
            }
        </Box>
    );
};

//Control panel settings for storybook
BoardTabContent.propTypes = {
    //Time off policies to be displayed
    policies: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),

    //Periods of time off to be displayed
    timeOffPeriods: PropTypes.arrayOf(PropTypes.object)
};

//Default values for this component
BoardTabContent.defaultProps = {
    style: {}
};