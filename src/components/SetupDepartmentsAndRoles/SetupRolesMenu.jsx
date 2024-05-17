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
export default function SetupRolesMenu({style}) {
    return (
        <Box sx={{...{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: 10,
            paddingBottom: 20,
            fontFamily: "Inter, sans-serif",
        }, ...style}}>
            <Grid container columns={11} spacing={2}>
                {/*Text*/}
                <Grid xs={11} textAlign="center">
                    <h3>Select the roles to add</h3>
                    <p>You can modify the name or add more roles later</p>
                </Grid>
                {/*Buttons*/}
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Account Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Business Developer" /></Grid>
                <Grid xs={3}><SelectItem label="Chief Executive Officer" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Customer Success Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Customer Success Specialist" /></Grid>
                <Grid xs={3}><SelectItem label="Finance Manager" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Human Resources Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Marketing Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Marketing Specialist" /></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={1}></Grid>
                <Grid xs={3}><SelectItem label="Product Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Sales Manager" /></Grid>
                <Grid xs={3}><SelectItem label="Sales Representative" /></Grid>
                <Grid xs={1}></Grid>
            </Grid>
            {/*Add roles button*/}
            <HRMButton mode="primary" style={{
                float: "right",
                marginTop: "80px"
            }}>
                Add Roles
            </HRMButton>
        </Box>
    );
};

//Control panel settings for storybook 
SetupRolesMenu.propTypes = {};

//Default values for this component in storybook
SetupRolesMenu.defaultProps = {
    style: {}
};