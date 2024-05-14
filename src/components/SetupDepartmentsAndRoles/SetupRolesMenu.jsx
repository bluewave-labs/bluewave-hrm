import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import SelectItem from './SelectItem';
import HRMButton from '../Button/HRMButton';

export default function SetupRolesMenu() {
    return (
        <Box sx={{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: 10,
            paddingBottom: 20,
            fontFamily: "Inter, sans-serif",
        }}>
            <Grid container columns={11} spacing={2}>
                <Grid xs={11} textAlign="center">
                    <h3>Select the roles to add</h3>
                    <p>You can modify the name or add more roles later</p>
                </Grid>
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
            <HRMButton mode="primary" label="Add Roles" style={{
                float: "right",
                marginTop: "80px"
            }}/>
        </Box>
    );
};

SetupRolesMenu.propTypes = {};

SetupRolesMenu.defaultProps = {};