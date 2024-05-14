import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import UploadFile from './UploadFile';
import HRMButton from '../Button/HRMButton';
//import PropTypes from 'prop-types';

/**
 * Setup menu component for onboarding purposes. Contains a text field for a company's name 
 * and website and other components for uploading a company logo.
 */
export default function SetupCompanyMenu() {
    return(
        <Box sx={{
            border: "1px solid #EBEBEB",
            borderRadius: 2,
            paddingTop: 6,
            paddingX: 10,
            paddingBottom: 20,
            fontFamily: "Inter, sans-serif",
        }}>
            <Grid container columns={10} rowSpacing={2} columnSpacing={1}>
                <Grid xs={10} textAlign="center">
                    <h3>Add fundamental company details</h3>
                    <p>You can modify these later in settings</p>
                </Grid>
                {/*Textfield for company name*/}
                <Grid xs={3}>
                    <h4>Company name</h4>
                </Grid>
                <Grid xs={7} alignContent="center">
                    <TextField fullWidth size="small" />
                </Grid>
                {/*Textfield for company website*/}
                <Grid xs={3}>
                    <h4>Company website</h4>
                </Grid>
                <Grid xs={7} alignContent="center">
                    <TextField 
                        fullWidth
                        InputProps={{startAdornment: <InputAdornment position="end">https://</InputAdornment>}}
                        size="small"
                    />
                </Grid>
                {/*Section for uploading company logo*/}
                <Grid xs={3}>
                    <h4>Company Logo</h4>
                </Grid>
                <Grid xs={7} sx={{display: "flex", justifyContent: "center"}}>
                    <AddPhotoAlternateOutlinedIcon 
                        sx={{
                            backgroundColor: "#F2F4F7",
                            width: 35,
                            height: 35,
                            padding: 2,
                            marginRight: 2,
                            borderRadius: "50%"
                        }} 
                    />
                    <UploadFile />
                </Grid>
            </Grid>
            {/*Add company button*/}
            <HRMButton mode="primary" label="Add Company" style={{
                float: "right",
                marginTop: "80px"
            }}/>
        </Box>
    );
};

SetupCompanyMenu.propTypes = {};

SetupCompanyMenu.defaultProps = {};