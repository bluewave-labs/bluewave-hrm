import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState, useEffect } from 'react';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import NoContentComponent from '../UpdatesPage/NoContentComponent';
import MenuToggleButton from '../BasicMenus/MenuToggleButton';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Displays the content for the Team tag in the time off menu which includes the time off periods
 * of every member of the user's team. Displays up to 10 periods of time off at a time along with 
 * controls for navigating between pages of components.
 * 
 * Props:
 * - timeOffPeriods<Array<Object>>: List of objects containing information of upcoming periods
 *      of time off.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TeamTabContent({timeOffPeriods, style}) {
    const [currentPage, setCurrentPage] = useState(1);  //The current page number
    //Flags for determining which buttons in the "filter by status" dropdown are selected
    const [approvedFilter, setApprovedFilter] = useState(true);
    const [waitingFilter, setWaitingFilter] = useState(true);
    const [rejectedFilter, setRejectedFilter] = useState(true);

    //Set the current page back to 1 each time the filters are changed
    useEffect(() => {
        setCurrentPage(1);
    }, [approvedFilter, waitingFilter, rejectedFilter]);

    //Filter out time off periods depending on which filters are active
    //At least one filter will always be active
    const activeFilters = [];
    if (approvedFilter) { activeFilters.push("Approved"); }
    if (waitingFilter) { activeFilters.push("Waiting"); }
    if (rejectedFilter) { activeFilters.push("Rejected"); }

    const filteredPeriods = timeOffPeriods.filter((period) => activeFilters.includes(period.status));

    //Only shows 10 periods at a time
    const periodsToDisplay = filteredPeriods.slice((currentPage - 1) * 10, currentPage * 10);

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
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={3} 
                >
                    <h3>My team's history</h3>
                    <Label 
                        mode="brand" 
                        label={timeOffPeriods.length} 
                        style={{borderRadius: "50%"}} 
                    />
                </Stack>
                {/*Filter by status button*/}
                {timeOffPeriods.length > 0 &&
                    <MenuToggleButton 
                        label="Filter by status" 
                        menuItems={{
                            "Approved": [approvedFilter, (value) => {
                                if (activeFilters.length >= 2 || !approvedFilter) {setApprovedFilter(value)}
                            }],
                            "Waiting": [waitingFilter, (value) => {
                                if (activeFilters.length >= 2 || !waitingFilter) {setWaitingFilter(value)}
                            }],
                            "Rejected": [rejectedFilter, (value) => {
                                if (activeFilters.length >= 2 || !rejectedFilter) {setRejectedFilter(value)}
                            }]
                        }} 
                        icon={<FilterListIcon />} 
                    />
                }
            </Stack>
            {/*If there are periods of time off, display the time off period list and navbar */}
            {timeOffPeriods.length > 0 ?
                <>
                    <UpcomingTimeOffTable 
                        timeOffPeriods={periodsToDisplay}
                        tableColumns={['Person', 'Type', 'Amount', 'Note', 'Status']}
                        editFlag={false}  
                        style={{marginBottom: "30px"}}
                    />
                    {filteredPeriods.length > 10 && 
                        <PagesNavBar 
                            numOfEntries={filteredPeriods.length} 
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
TeamTabContent.propTypes = {
    //Periods of time off to be displayed
    timeOffPeriods: PropTypes.arrayOf(PropTypes.object)
};

//Default values for this component
TeamTabContent.defaultProps = {
    style: {}
};