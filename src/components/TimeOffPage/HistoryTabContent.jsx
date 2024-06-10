import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import TuneIcon from '@mui/icons-material/Tune';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '../BasicMenus/MenuItem';
import UpcomingTimeOffTable from './UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import MenuToggleButton from '../BasicMenus/MenuToggleButton';
import NoContentComponent from '../UpdatesPage/NoContentComponent';
import Label from '../Label/Label';
import { useState } from 'react';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

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
export default function HistoryTabContent({timeOffPeriods, style}) {
    const [currentPage, setCurrentPage] = useState(1);

    //Only shows 10 periods at a time
    const periodsToDisplay = timeOffPeriods.slice((currentPage - 1) * 10, currentPage * 10);

    //Function for changing the page number
    function handlePage(n) {
        if (n > 0 && n <= Math.ceil(timeOffPeriods.length / 10)) {
            setCurrentPage(n);
        }
    };

    const selectableContent = (
        <Box sx={{ 
            width: '100%', 
            maxWidth: 360, 
            border: "1px solid #EAECF0", 
            borderRadius: 2,
            backgroundColor: "#FFFFFF"
        }}>
            <List>
                <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                    <MenuItem>Name</MenuItem>
                </ListItem>
                <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                    <MenuItem>Status</MenuItem>
                </ListItem>
                <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                    <MenuItem>Role</MenuItem>
                </ListItem>
                <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                    <MenuItem>Team</MenuItem>
                </ListItem>
                <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                    <MenuItem>Hire date</MenuItem>
                </ListItem>
                <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                    <MenuItem>Employee No</MenuItem>
                </ListItem>
                <ListItem sx={{width: 300, paddingX: 1, paddingY: "3px"}}>
                    <MenuItem>Employment status</MenuItem>
                </ListItem>
            </List>
        </Box>
    );

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
                        menuComponent={selectableContent} 
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