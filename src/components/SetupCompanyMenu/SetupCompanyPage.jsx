import Box from '@mui/system/Box';
import SetupCompanyMenu from './SetupCompanyMenu';
import SetupDepartmentsMenu from './SetupDepartmentsMenu';
import SetupRolesMenu from './SetupRolesMenu';
import SuccessMenu from './SuccessMenu';
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

    return (
        <Box sx={{...{
            width: "100%",
            height: "100%",
            paddingX: "220px",
            backgroundColor: "#FCFCFD",
        }, ...style}}>
            {(page === "Company") && <SetupCompanyMenu advancePage={() => setPage("Departments")} />}
            {(page === "Departments") && <SetupDepartmentsMenu advancePage={() => setPage("Roles")} />}
            {(page === "Roles") && <SetupRolesMenu advancePage={() => setPage("Success")} />}
            {(page === "Success") && <SuccessMenu />}
        </Box>
    );
};

//Control panel settings for storybook
SetupCompanyPage.propTypes = {};

//Default values for this component
SetupCompanyPage.defaultProps = {
    style: {}
};