import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import AvailableTimeOffTable from './AvailableTimeOffTable';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import axios from 'axios';

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
    const [timeOffPeriods, setTimeOffPeriods] = useState([]);
    const [timeOffPolicies, setTimeOffPolicies] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const currentUser = 1;

    useEffect(() => {
        getTimeOffPolicies();
        getUpcomingTimeOffPeriods();
    }, [refresh]);

    function getTimeOffPolicies() {
        console.log("Running getTimeOffPolicies()");
        const url = `http://localhost:5000/api//employeeannualtimeoffs/1`;
        axios.post(url)
        .then((response) => {
            const policies = [];
            const data = response.data;
            let vacationTimeOffAvailable = 0;
            let vacationTimeOffUsed = 0;
            let sickTimeOffAvailable = 0;
            let sickTimeOffUsed = 0;
            let bereavementTimeOffAvailable = 0;
            let bereavementTimeOffUsed = 0;
            for (const e of data) {
                switch (e.timeOffId) {
                    case 1:
                        vacationTimeOffAvailable += e.hoursAllowed - e.cumulativeHoursTaken;
                        vacationTimeOffUsed += e.cumulativeHoursTaken;
                        break;
                    case 2:
                        sickTimeOffAvailable += e.hoursAllowed - e.cumulativeHoursTaken;
                        sickTimeOffUsed += e.cumulativeHoursTaken;
                        break;
                    case 3:
                        bereavementTimeOffAvailable += e.hoursAllowed - e.cumulativeHoursTaken;
                        bereavementTimeOffUsed += e.cumulativeHoursTaken;
                        break;
                }
            }
            policies.push({
                type: "Vacation",
                availableHours: vacationTimeOffAvailable,
                hoursUsed: vacationTimeOffUsed 
            });
            policies.push({
                type: "Sick",
                availableHours: sickTimeOffAvailable,
                hoursUsed: sickTimeOffUsed
            });
            policies.push({
                type: "Bereavement",
                availableHours: bereavementTimeOffAvailable,
                hoursUsed: bereavementTimeOffUsed
            });
            setTimeOffPolicies(policies);
        })
        .catch((error) => console.log(error));
    }

    function getUpcomingTimeOffPeriods() {
        console.log("Running getUpcomingTimeOffPeriods()");
        const url = `http://localhost:5000/api/timeoffhistories/employee/1`;
        axios.post(url)
        .then((response) => {
            const periods = [];
            const data = response.data;
            for (const p of data) {
                if (dayjs(p.startDate).isAfter(dayjs()) && (p.status === "Approved" || p.status === "Pending")) {
                    periods.push({
                        id: p.id,
                        from: formatDate(dayjs(p.startDate).toDate()),
                        to: formatDate(dayjs(p.endDate).toDate()),
                        type: (p.timeOffId === 1) ? "Vacation" : (p.timeOffId === 2) ? "Sick Leave" : "Bereavement",
                        hours: p.hours,
                        note: p.note
                    });
                }
            }
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
            {(timeOffPeriods.length > 0) ?
                <>
                    {/*Upcoming time off table*/}
                    <UpcomingTimeOffTable 
                        timeOffPeriods={periodsToDisplay} 
                        tableColumns={['Type', 'Amount', 'Note']}
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