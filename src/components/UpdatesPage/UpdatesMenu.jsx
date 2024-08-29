import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import UpdatesFilter from './UpdatesFilter';
import UpdatesList from './UpdatesList';
import PagesNavBar from './PagesNavBar';
import NoContentComponent from './NoContentComponent';
import { useState, useEffect } from 'react';
import { colors, fonts } from '../../assets/Styles';
import axios from 'axios';

/**
 * Menu component for the home menu page. Displays up to 10 updates at a time along with controls
 * for filtering between read and unread updates as well as navigating between pages of components.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesMenu({style}) {
    //Current page number
    const [currentPage, setCurrentPage] = useState(1);  
    //Flag determining whether to display all or unread notifications
    const [filter, setFilter] = useState("All");
    //List of notifications to be displayed
    const [allUpdates, setAllUpdates] = useState([]);
    //Hook for refreshing the list of notifications
    const [refresh, setRefresh] = useState(false);

    //ID of the currently logged in employee
    const currentUserId = 1;

    //Refresh the list of notifications whenever the refresh hook is changed
    useEffect(() => {
        getUpdates();
    }, [refresh]);

    //URL endpoints to be used for API calls
    const notificationsURL = `http://localhost:5000/api/notifications/employee/${currentUserId}`;

    //Retrieve the status of a notification for a given employee
    function checkNotificationStatus(update, id) {
        return update.recipients.filter((emp) => emp.empId === id)[0].notificationStatus;
    };

    //Retrieve all the updates
    function getUpdates() {
        //Retrieve notification records from database
        axios.get(notificationsURL)
        .then((response) => {
            const updates = [];
            const data = response.data;
            data.forEach((up) => {
                updates.push(up);
            });
            setAllUpdates(updates);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    //Either show all updates or only the unread ones
    const filteredUpdates = (filter === "All") ? 
        allUpdates : 
        allUpdates.filter((update) => checkNotificationStatus(update, currentUserId) !== "seen");

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
            borderRadius: "10px",
            backgroundColor: "#FFFFFF"
        }, ...style}}>
            {/*If there are updates, display the updates list and navbar */}
            {(allUpdates.length > 0) ?
                <>
                    <Stack 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        sx={{
                            fontFamily: fonts.fontFamily,
                            marginBottom: "10px"
                        }}
                    >
                        <h3 style={{color: colors.darkGrey}}>Latest updates</h3>
                        <UpdatesFilter handleFilter={handleFilter} />
                    </Stack>
                    {/*Updates list*/}
                    <UpdatesList 
                        updates={updatesToDisplay} 
                        refresh={() => {setRefresh(!refresh)}} 
                        style={{marginBottom: "20px"}} 
                    />
                    {/*Updates nav bar*/}
                    {filteredUpdates.length > 10 &&
                        <PagesNavBar 
                            numOfEntries={filteredUpdates.length} 
                            currentPage={currentPage} 
                            handlePage={handlePage}
                        /> 
                    }       
                </> :
                <>
                    {/*Otherwise, display a message that there are no updates*/}
                    <NoContentComponent>
                        <h3 style={{color:colors.darkGrey}}>You don't have any updates yet</h3>
                        <p style={{color:colors.darkGrey}}>Any updates about your company will be shown here.</p>
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