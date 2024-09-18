import Box from '@mui/system/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/system';
import { useState } from 'react';
import BoardTabContent from './BoardTabContent';
import HistoryTabContent from './HistoryTabContent';
import TeamTabContent from './TeamTabContent';
import { colors, fonts } from '../../Styles';

/**
 * Menu component for the time off page. Contains the Board, History and Team tabs for controlling
 * the display of content. The Board tab shows the remaining available time off for the user and 
 * any upcoming periods of time off. The History tab shows the complete history of the user's time
 * off. The Team tab shows the periods of time off for each member of the user's team.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffMenu({style}) {
    const [tab, setTab] = useState('Board');    //State determining which flag is selected

    //Function for selecting a new tab
    function handleChange(e, newValue) {
        setTab(newValue);
    };

    //Custom style elements
    const StyledTab = styled(Tab)({
        textTransform: "none",
    });

    const StyledTabPanel = styled(TabPanel)({
        padding: 0
    });

    //List of time off policies
    const policies = [
        {
            type: 'Vacation',
            availableDays: '15 days (180 hours)',
            hoursUsed: '23 hours used'
        },
        {
            type: 'Sick',
            availableDays: '180 hours left',
            hoursUsed: '23 hours used'
        },
        {
            type: 'Bereavement',
            availableDays: '-',
            hoursUsed: '23 hours used'
        }
    ];

    return (
        <Box sx={{...{
            boxSizing: "border-box",
            minWidth: "980px",
            paddingX: "45px",
            paddingY: "42px",
            border: "1px solid #EBEBEB",
            borderRadius: "5px",
            backgroundColor: "#FFFFFF",
            color: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: "#EAECF0" }}>
                    <TabList 
                        textColor="secondary" 
                        indicatorColor="secondary" 
                        onChange={handleChange}
                    >
                        <StyledTab label="Board" value="Board" />
                        <StyledTab label="History" value="History" />
                        <StyledTab label="My team" value="My team" />
                    </TabList>
                </Box>
                {/*Board tab*/}
                <StyledTabPanel value="Board">
                    <BoardTabContent policies={policies}/>
                </StyledTabPanel>
                {/*History tab*/}
                <StyledTabPanel value="History">
                    <HistoryTabContent />
                </StyledTabPanel>
                {/*Team tab*/}
                <StyledTabPanel value="My team">
                    <TeamTabContent />
                </StyledTabPanel>
            </TabContext>
        </Box>
    );
};

//Control panel settings for storybook
TimeOffMenu.propTypes = {};

//Default values for this component
TimeOffMenu.defaultProps = {
    style: {}
};