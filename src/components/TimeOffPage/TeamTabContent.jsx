import Box from '@mui/system/Box';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import NoContentComponent from '../UpdatesPage/NoContentComponent';
import { useState } from 'react';
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
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <h3 style={{marginTop: "40px", marginBottom: "40px"}}>My team's time offs</h3>
            {timeOffPeriods.length > 0 ?
                <>
                    <UpcomingTimeOffTable 
                        timeOffPeriods={periodsToDisplay} 
                        editFlag={false} 
                        teamFlag={true} 
                        style={{marginBottom: "30px"}}
                    />
                    {timeOffPeriods.length > 10 && 
                        <PagesNavBar 
                            numOfEntries={timeOffPeriods.length} 
                            currentPage={currentPage}
                            handlePage={handlePage}
                        />
                    }
                </> :
                <>
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