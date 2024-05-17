import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import SelectItem from './SelectItem';
import HRMButton from '../Button/HRMButton';

/**
 * Setup menu component for onboarding purposes. Contains toggle buttons for displaying items to
 * be added.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function SetupDepartmentsMenu({style}) {
    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: 10,
            paddingBottom: 20,
            fontFamily: "Inter, sans-serif"
        }, ...style}}>
            <Grid container columns={11} spacing={2}>
                {/*Text*/}
                <Grid xs={11} textAlign="center">
                    <h3>Select the departments to add</h3>
                    <p>You can modify the name or add more departments later</p>
                </Grid>
                {/*Buttons*/}
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Customer Success" /></Grid>
                <Grid xs={3}><SelectItem label="Design" /></Grid>
                <Grid xs={3}><SelectItem label="Finance" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Human Resources" /></Grid>
                <Grid xs={3}><SelectItem label="Information Technology" /></Grid>
                <Grid xs={3}><SelectItem label="Management" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Marketing" /></Grid>
                <Grid xs={3}><SelectItem label="Operations" /></Grid>
                <Grid xs={3}><SelectItem label="Sales" /></Grid>
                <Grid xs={1}></Grid>
            </Grid>
            {/*Add departments button*/}
            <HRMButton mode="primary" style={{
                float: "right",
                marginTop: "80px"
            }}>
                Add Departments
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook 
SetupDepartmentsMenu.propTypes = {};

//Default values for this component in storybook
SetupDepartmentsMenu.defaultProps = {
    style: {}
};