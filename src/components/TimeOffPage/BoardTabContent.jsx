import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import AvailableTimeOffTable from './AvailableTimeOffTable';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import Label from '../Label/Label';
import { colors, fonts } from '../../Styles';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the content for the Board tab in the time off menu which includes the available
 * time off per policy and any upcoming periods of time off scheduled
 * 
 * Props:
 * - policies<Array<Object>>: List of objects containing policy information to be displayed.
 * 
 * - timeOffPeriods<Array<Object>>: List of objects containing information of upcoming periods
 *      of time off.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function BoardTabContent({policies, timeOffPeriods, style}) {
    const [currentPage, setCurrentPage] = useState(1);

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
            <AvailableTimeOffTable policies={policies} />
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
                        editFlag={true} 
                        teamFlag={false} 
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