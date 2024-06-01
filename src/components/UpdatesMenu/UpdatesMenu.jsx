import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import UpdatesFilter from './UpdatesFilter';
import UpdatesList from './UpdatesList';
import UpdatesNavBar from './UpdatesNavBar';
import NoContentComponent from './NoContentComponent';
import { useState } from 'react';
import { colors, fonts } from '../../Styles';

/**
 * Menu component for the home menu page. Displays up to 10 updates at a time along with controls
 * for filtering between read and unread updates as well as navigating between pages of components.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesMenu({style}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("All");

    //Retrieve all the updates
    const allUpdates = [
        
        {
            status: 'new',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'waiting',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'Your time off request has been sent',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'waiting',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'waiting',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'new',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'Your time off request has been sent',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'waiting',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'waiting',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'seen',
            name: 'New team member added',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        {
            status: 'new',
            name: 'New time off request',
            desc: 'Olivia Kylle from Marketing has requested 4 day (32 hours) time off between 1 July and 4 day'
        },
        
    ];

    //Either show all updates or only the unread ones
    const filteredUpdates = (filter === "All") ? 
        allUpdates : 
        allUpdates.filter((update) => update.status !== "seen");

    //Only show 10 updates at a time
    const updatesToDisplay = filteredUpdates.slice((currentPage - 1) * 10, currentPage * 10);
        
    //Function for changing the filter settings
    function handleFilter(e, newFilter) {
        if (filter !== newFilter) {
            setFilter(newFilter);
            setCurrentPage(1);
        }
    };

    //Function for changing the page number
    function handlePage(n) {
        if (n > 0 && n <= Math.ceil(filteredUpdates.length / 10)) {
            setCurrentPage(n);
        }
    };

    return (
        <Box sx={{...{
            boxSizing: "border-box",
            minWidth: "1042px",
            paddingX: "59px",
            paddingY: "31px",
            border: "1px solid #EBEBEB",
            borderRadius: "10px"
        }, ...style}}>
            {/*If there are updates, display the updates list and navbar */}
            {(allUpdates.length > 0) ?
                <>
                    <Stack direction="row" sx={{
                        justifyContent: "space-between",
                        fontFamily: fonts.fontFamily,
                        marginBottom: "10px"
                    }}>
                        <h3 style={{color: colors.darkGrey}}>Latest updates</h3>
                        <UpdatesFilter handleFilter={handleFilter} />
                    </Stack>
                    {/*Updates list*/}
                    <UpdatesList updates={updatesToDisplay} style={{marginBottom: "20px"}} />
                    {/*Updates nav bar*/}
                    <UpdatesNavBar 
                        numOfUpdates={filteredUpdates.length} 
                        currentPage={currentPage} 
                        handlePage={handlePage}
                    /> 
                </> :
                <>
                    {/*Otherwise, display a message that there are no updates*/}
                    <NoContentComponent>
                        <h3 style={{color:colors.darkGrey}}>You don't have any updates yet</h3>
                        <p style={{color:colors.darkGrey}}>Any update about your company will be shown here.</p>
                    </NoContentComponent>
                </>
            }
        </Box>
    );
};

//Control panel settings for storybook
UpdatesMenu.propTypes = {};

//Default values for this component
UpdatesMenu.defaultProps = {
    style: {}
};