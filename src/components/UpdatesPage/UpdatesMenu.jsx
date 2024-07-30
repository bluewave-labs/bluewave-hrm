import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import UpdatesFilter from './UpdatesFilter';
import UpdatesList from './UpdatesList';
import PagesNavBar from './PagesNavBar';
import NoContentComponent from './NoContentComponent';
import { useState, useEffect } from 'react';
import { colors, fonts } from '../../Styles';
const axios = require('axios').default;

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
    const [allUpdates, setAllUpdates] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getUpdates();
    }, [refresh]);

    const url = `${process.env.URL}/notifications/employee/1`;

    //Retrieve all the updates
    function getUpdates() {
        axios.get(url)
        .then((response) => {
            const updates = [];
            const data = response.data;
            for (const up of data) {
                //console.log(up);
                updates.push(up)
            }
            setAllUpdates(updates);
        })
        .catch((error) => {
            console.log(error);
        });
    };

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