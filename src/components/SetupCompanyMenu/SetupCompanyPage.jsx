import Box from '@mui/system/Box';
import SetupCompanyMenu from './SetupCompanyMenu';
import SetupDepartmentsMenu from './SetupDepartmentsMenu';
import SetupRolesMenu from './SetupRolesMenu';
import SuccessMenu from './SuccessMenu';
import CustomizedSteppers from '../CustomizedSteppers';
import Logo from '../../Images/HRM_logo_large.svg'
import { useState } from 'react';

/**
 * Company registration page for the HRM application. Contains menus for adding new companies,
 * departments and roles to the database.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupCompanyPage({style}) {
    const [page, setPage] = useState("Company");    //The current menu component to be displayed

    const steps = [
        {
            label: "Add company details", 
            description: "Add company details"
        },
        {
            label: "Select departments",
            description: "Select departments"
        },
        {
            label: "Select roles",
            description: "Select roles"
        },
        {
            label: "Complete setup",
            description: "Complete setup"
        }
    ];

    return (
        <Box sx={{...{
            width: "100%",
            height: "100%",
            paddingX: "10%",
            paddingY: "50px",
            backgroundColor: "#FCFCFD"
        }, ...style}}>
            <img 
                src={Logo} 
                alt={"Company Logo"} 
                style={{display: "block", margin: "60px auto"}} 
            />
            <CustomizedSteppers 
                stepnumber={
                    (page === "Company") ? 0 :
                    (page === "Departments") ? 1 :
                    (page === "Roles") ? 2 : 3
                } 
                steps={steps}
                style={{
                    margin: "auto",
                    padding: "2% 150px", 
                    marginY: "40px"
                }}
            />
            {(page === "Company") && <SetupCompanyMenu 
                advancePage={() => setPage("Departments")} 
                style={{margin: "40px auto"}} 
            />}
            {(page === "Departments") && <SetupDepartmentsMenu 
                advancePage={() => setPage("Roles")} 
                style={{margin: "40px auto"}} 
            />}
            {(page === "Roles") && <SetupRolesMenu 
                advancePage={() => setPage("Success")} 
                style={{margin: "40px auto"}} 
            />}
            {(page === "Success") && <SuccessMenu style={{margin: "40px auto"}} />}
        </Box>
    );
};

//Control panel settings for storybook
SetupCompanyPage.propTypes = {};

//Default values for this component
SetupCompanyPage.defaultProps = {
    style: {}
};