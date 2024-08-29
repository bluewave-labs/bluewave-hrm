import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import TuneIcon from '@mui/icons-material/Tune';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import MenuToggleButton from '../BasicMenus/MenuToggleButton';
import NoContentComponent from '../UpdatesPage/NoContentComponent';
import Label from '../Label/Label';
import { useState, useEffect } from 'react';
import { colors, fonts } from '../../Styles';
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
 * Displays the content for the History tab in the time off menu which includes the complete time
 * off history for the current user. Displays up to 10 periods of time off at a time along with 
 * a customization menu and controls for navigating between pages of components.
 * 
 * Props:
 * - timeOffPeriods<Array<Object>>: List of objects containing information of upcoming periods
 *      of time off.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function HistoryTabContent({style}) {
    const [currentPage, setCurrentPage] = useState(1);  //The current page number
    //Flags for determining which buttons in the "customize" dropdown are selected
    const [typeFilter, setTypeFilter] = useState(true);
    const [amountFilter, setAmountFilter] = useState(true);
    const [noteFilter, setNoteFilter] = useState(true);
    //Time off periods to be displayed
    const [timeOffPeriods, setTimeOffPeriods] = useState([]);
    //Hook for refreshing the list of time off periods
    const [refresh, setRefresh] = useState(false);

    //Filter table columns depending on which filters are active
    //"From", "To" and at least one other column will always be active
    const activeFilters = [];
    if (typeFilter) { activeFilters.push("Type"); }
    if (amountFilter) { activeFilters.push("Amount"); }
    if (noteFilter) { activeFilters.push("Note"); }

    //ID of the currently logged in employee
    const currentUser = 1;

    //URL endpoints to be used for API calls
    const timeOffPeriodURL = `http://localhost:5000/api/timeoffhistories/employee/${currentUser}`;

    //Refresh the list of time off periods
    useEffect(() => {
        getTimeOffPeriods();
    }, [refresh]);

    //Function for retrieving any past time off periods
    function getTimeOffPeriods() {
        //console.log("Running getTimeOffPeriods()");
        //Send request to database for time off periods
        axios.post(timeOffPeriodURL)
        .then((response) => {
            const periods = [];
            const data = response.data;
            data.forEach((p) => {
                //Only retrieve and display past periods
                if (dayjs(p.startDate).isBefore(dayjs())) {
                    periods.push({
                        id: p.id,
                        from: formatDate(dayjs(p.startDate).toDate()),
                        to: formatDate(dayjs(p.endDate).toDate()),
                        type: p.timeOff.category,
                        hours: p.hours,
                        note: p.note
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
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {/*Time off header*/}
            <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{
                    marginY: "40px"
                }}
            >
                <Stack direction="row" alignItems="center" spacing={3}>
                    <h3>Time off history</h3>
                    <Label 
                        mode="brand" 
                        label={timeOffPeriods.length} 
                        style={{borderRadius: "50%"}} 
                    />
                </Stack>
                {/*Customize button*/}
                {timeOffPeriods.length > 0 &&
                    <MenuToggleButton 
                        label="Customize" 
                        menuItems={{
                            "Type": [typeFilter, (value) => {
                                if (activeFilters.length >= 2 || !typeFilter) {setTypeFilter(value)}
                            }],
                            "Amount": [amountFilter, (value) => {
                                if (activeFilters.length >= 2 || !amountFilter) {setAmountFilter(value)}
                            }],
                            "Note": [noteFilter, (value) => {
                                if (activeFilters.length >= 2 || !noteFilter) {setNoteFilter(value)}
                            }]
                        }}
                        icon={<TuneIcon />} 
                    />
                }
            </Stack>
            {/*If there are periods of time off, display the time off period list and navbar */}
            {(timeOffPeriods.length > 0) ?
                <>
                    {/*Upcoming time off table*/}
                    <UpcomingTimeOffTable 
                        timeOffPeriods={periodsToDisplay} 
                        tableColumns={activeFilters}
                        editFlag={false} 
                        //refresh={() => setRefresh(!refresh)}
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
                <>
                    {/*Otherwise, display a message that there is no history*/}
                    <NoContentComponent>
                        <h3>There is no time off history</h3>
                        <p>Any updates about your time off history will be shown here.</p>
                    </NoContentComponent>
                </>
            }
        </Box>
    );
};

//Control panel settings for storybook
HistoryTabContent.propTypes = {
    //Periods of time off to be displayed
    timeOffPeriods: PropTypes.arrayOf(PropTypes.object)
};

//Default values for this component
HistoryTabContent.defaultProps = {
    style: {}
};