import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import TuneIcon from '@mui/icons-material/Tune';
import UpcomingTimeOffTable from '../TimeOffPage/UpcomingTimeOffTable';
import PagesNavBar from '../UpdatesPage/PagesNavBar';
import MenuToggleButton from '../BasicMenus/MenuToggleButton';
import NoContentComponent from '../UpdatesPage/NoContentComponent';
import Label from '../Label/Label';
import { useState } from 'react';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';
import DepartmentsTable from './DepartmentsTable';

/**
 * Displays the content for the History tab in the time off menu which includes the complete time
 * off history for the current user. Displays up to 10 periods of time off at a time along with 
 * a customization menu and controls for navigating between pages of components.
 * 
 * Props:
 * - departments<Array<Object>>: List of objects containing information of upcoming periods
 *      of time off.
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function DepartmentsTabContent({departments, style}) {
    const [currentPage, setCurrentPage] = useState(1);  //The current page number
    //Flags for determining which buttons in the "customize" dropdown are selected
    const [nameSelected, setNameSelected] = useState(false);
    const [peopleSelected, setPeopleSelected] = useState(false);


    console.log("departments");
    console.log(departments);

    //Function for changing the page number
    function handlePage(n) {
        if (n > 0 && n <= Math.ceil(departments.length / 10)) {
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
                    <h3>Departments</h3>
                    <Label 
                        mode="brand" 
                        label={departments.length} 
                        style={{borderRadius: "50%"}} 
                    />
                </Stack>
                {/*Customize button*/}
                {departments.length > 0 &&
                    <DepartmentsTable departments={departments}/>
                }
            </Stack>
            {/*If there are periods of time off, display the time off period list and navbar */}
            {(departments.length > 0) ?
                <>
                    {/*Upcoming time off table*/}
                    {/* <UpcomingTimeOffTable 
                        departments={departments} 
                        editFlag={true} 
                        teamFlag={false} 
                        style={{marginBottom: "30px"}}
                    /> */}
                    {/*Upcoming time off navbar*/}
                    {departments.length > 10 &&
                        <PagesNavBar 
                            numOfEntries={departments.length} 
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
DepartmentsTabContent.propTypes = {
    //Periods of time off to be displayed
    departments: PropTypes.arrayOf(PropTypes.object)
};

//Default values for this component
DepartmentsTabContent.defaultProps = {
    style: {}
};